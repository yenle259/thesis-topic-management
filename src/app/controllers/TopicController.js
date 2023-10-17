const PublishDate = require('../models/PublishDate');
const Student = require('../models/Student');
const Topic = require('../models/Topic');
const User = require('../models/User');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { name: '', pi: '', type: '', semester: '', publishDate: '' };

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
        Topic.find({ isDisplay: true }).populate('pi')
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
        Topic.find({ slug: req.params.slug }).populate('pi')
            .then((topic) => {
                res.status(201).json(topic);
            })
            .catch(next);
    }

    // [GET] /topic/lecturer/:id
    getTopicByLecturerId(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then((lecturer) => {
                Topic.find({ pi: lecturer.id }).populate('pi').populate('student').populate('semester')
                    .then((topics) => {
                        res.json(topics);
                    })
                    .catch(next);
            }).catch(next)

    }

    // [GET] /topic/lecturerUserId/:id
    getTopicByLecturerUserId(req, res, next) {
        User.findOne({ userId: req.params.id })
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
            const topics = await Topic.find({ student: req.params.id }).populate('pi');
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
            const topic = await Topic.updateOne({ _id: topicId }, { student: studentId })
            // const user = await User.updateOne({ _id: studentId }, { registerModule: { registerTopic: topicId, type: "LV" } })
            res.status(201).json({ topic });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /topic/unregister/:slug --> remove student id from topic
    async removeStudentId(req, res, next) {
        Topic.findOneAndUpdate({ slug: req.params.slug }, { student: [] })
            .then((topic) => {
                res.status(201).json(topic);
            })
            .catch(next);

        // try {

        //     const { studentId, topicId } = req.body;

        //     const topic = await Topic.findOneAndUpdate({ slug: req.params.slug }, { student: [] });

        //     const user = await User.updateOne({ _id: studentId }, { registerModule: { registerTopic: '', type: "LV" } })
        //     res.status(201).json({ topic, user });
        // } catch (err) {
        //     const errors = handleErrors(err);
        //     res.status(400).json({ errors });
        // }
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
