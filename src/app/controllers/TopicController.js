const PublishDate = require('../models/PublishDate');
const Student = require('../models/Student');
const Topic = require('../models/Topic');
const Lecturer = require('../models/Lecturer');
const ReportTopic = require('../models/ReportTopic');
const constant = require('../../constants')

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { name: '', pi: '', type: '', semester: '', publishDate: '', status: '' };

    //check publish date of topic -> handle error
    if (err.message.includes('Topic is not publish yet')) {
        errors.publishDate = "Topic List is not publish";
    }

    //invalid topic
    if (err.message.includes('Topic validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }

    //Not Allow to register cuz publish Date change
    if (err.message.includes('Topic is not publish yet')) {
        errors.publishDate = "Topic is not publish yet"
    }
    return errors;
}

class TopicController {

    // [GET] /topic --> get all topic
    get(req, res, next) {
        Topic.find({ isDisplay: true }).populate('pi').populate('semester').populate({
            path: 'student',
            populate: { path: 'studentInfo' }
        })
            .then((topics) => {
                res.json(topics);
            })
            .catch(next);
    }

    // [GET] /topic/page/:id --> get topic per page
    async getPerPage(req, res, next) {
        const { page, limit } = req.query;
        try {
            // execute query with page and limit values
            const topics = await Topic.find().populate('pi')
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            // get total documents in the Posts collection 
            const count = await Topic.count();

            // return response with posts, total pages, and current page
            res.json({
                topics,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1)
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    // [GET] /topic/:slug --> get topic by slug
    getTopicBySlug(req, res, next) {
        Topic.find({ slug: req.params.slug }).populate('pi').populate('semester').populate({
            path: 'student',
            populate: { path: 'studentInfo' }
        })
            .then((topic) => {
                res.status(201).json(topic);
            })
            .catch(next);
    }

    // [GET] /topic/lecturer/:id
    async getTopicByLecturerId(req, res, next) {
        const { status } = req.query;
        try {
            const lecturer = await Lecturer.findOne({ _id: req.params.id })
            if (status) {
                const topics = await Topic.find({ pi: lecturer._id, status: 'SUGGESTED' }).populate('pi').populate('semester').populate({
                    path: 'student',
                    populate: { path: 'studentInfo' }
                })
                res.status(200).json({ topics });
            } else {
                const topics = await Topic.find({
                    pi: lecturer._id
                }).populate('pi').populate('semester').populate({
                    path: 'student',
                    populate: { path: 'studentInfo' }
                })
                res.status(200).json({ topics });
            }
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /topic/lecturerUserId/:id
    getTopicByLecturerUserId(req, res, next) {
        Lecturer.findOne({ userId: req.params.id })
            .then((lecturer) => {
                Topic.find({ pi: lecturer.id, isDisplay: true }).populate('pi').populate('student').populate('semester')
                    .then((topics) => {
                        res.json(topics);
                    })
                    .catch(next);
            }).catch(next)
    }

    // [GET] /topic/student/:id
    async getTopicByStudentId(req, res, next) {
        try {
            const topics = await Topic.find({ 'student.studentInfo': req.params.id }).populate('pi').populate('semester');
            res.status(201).json(topics);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /topic --> Create a new topic with needed attribute 
    async create(req, res) {
        const { name, pi, type, isDisplay, description, numberOfStudent, semester } = req.body;
        try {
            const topic = await Topic.create({ name, pi, type, isDisplay, description, numberOfStudent, semester });
            res.status(201).json(topic);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /topic/suggest --> Create a new suggest topic
    async suggested(req, res) {
        const { name, pi, type, description, studentId } = req.body;
        const suggestedTopic = {
            name, pi, type, description,
            student: { studentInfo: studentId, status: 'PENDING' },
            numberOfStudent: 1,
            status: 'SUGGESTED',
            semester: constant.RECENT_SEMESTER_ID,
        }
        try {
            const topic = await Topic.create(suggestedTopic);
            res.status(201).json({ topic });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /topic/update/:id --> Update object with _id 
    async update(req, res, next) {
        try {
            const topic = await Topic.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.status(201).json(topic);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /topic/register --> register a student to a Lecturer's topic
    async register(req, res, next) {
        try {
            const { studentId, topicId } = req.body;
            const topic = await Topic.findOneAndUpdate({ _id: topicId }, { $addToSet: { student: { studentInfo: studentId, status: 'PENDING' } } })
            res.status(201).json({ topic });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /topic/unregister/:slug --> remove student id from topic
    async removeStudentId(req, res, next) {
        const { studentId } = req.body;
        Topic.findOneAndUpdate({ slug: req.params.slug }, { $pull: { student: { studentInfo: studentId } } })
            .then((topic) => {
                res.status(201).json(topic);
            })
            .catch(next);
    }

    // [PUT] /topic/review --> update status of register student
    async review(req, res, next) {
        try {
            const { topicIndex, status, reason, studentId } = req.body;
            const topic = await Topic.findOneAndUpdate({ 'student._id': topicIndex }, {
                '$set': {
                    'student.$.status': status,
                    'student.$.reason': reason,
                }
            });

            if (status === 'APPROVE') {
                const reportTopic = await ReportTopic.create({ pi: topic.pi._id, student: studentId, topic: topic._id, isReport: false });
                res.status(201).json({ topic, reportTopic });

            } else {
                res.status(201).json({ topic });
            }
        } catch (err) {
            console.log(err)
        }
    }

    // [DELETE] /topic/:id --> delete topic by lecturer
    async deleteTopic(req, res, next) {
        Topic.findByIdAndRemove({ _id: req.params.id })
            .then((topic) => {
                res.status(201).json(topic);
            })
            .catch(next);
    }
}

module.exports = new TopicController();
