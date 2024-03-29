const Topic = require('../models/Topic');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const ReportTopic = require('../models/ReportTopic');
const constant = require('../../constants');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const { reviewEmailMessageHtml } = require('../../utils/reviewEmailMessageHtml')

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

const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'htqldt@gmail.com',
        pass: 'xewy omrj tars ywkv'
    }
});

class TopicController {

    // [GET] /topic --> get all topic
    async get(req, res, next) {

        const { page, limit } = req.query;
        const module = req.query.module || '';

        let queryString = {}
        queryString['isDisplay'] = true;
        queryString['semester'] = '6526d24c7547ab02d497a7a4';

        if (module) {
            queryString['module'] = module;
        }

        console.log(queryString)
        try {
            //options : i -> case sensitve
            const topics = await Topic.find(queryString).populate('pi').populate('semester').populate({
                path: 'student',
                populate: { path: 'studentInfo' }
            }).sort({
                createdAt: 'desc'
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Topic.find(queryString).countDocuments();;

            // return response with posts, total pages, and current page
            res.status(200).json({
                topics,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1),
                count
            });
        } catch (err) {
            console.error(err);
        }
    }

    // [GET] /topic/reported --> get all reported topic for student review
    async getTopics(req, res, next) {

        const { page, limit } = req.query;
        const module = req.query.module || '';

        let queryString = {}

        if (module) {
            queryString['module'] = module;
        }
        console.log(queryString)
        try {
            //options : i -> case sensitve
            const topics = await Topic.find(queryString).populate('pi').populate('semester').populate({
                path: 'student',
                populate: { path: 'studentInfo' }
            }).sort({
                createdAt: 'desc'
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Topic.find(queryString).countDocuments();;

            // return response with posts, total pages, and current page
            res.status(200).json({
                topics,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1),
                count
            });
        } catch (err) {
            console.error(err);
        }
    }

    // [GET] /topic/:slug --> get topic by slug
    async getTopicBySlug(req, res, next) {
        const token = req.cookies.access_token;
        let currentUserId;
        let query = {}

        if (token) {
            jwt.verify(token, constant.TOKEN_SECRET, async (error, decodedToken) => {
                if (error) {
                    console.log(error);
                } else {
                    currentUserId = decodedToken.id;
                }
            })
        }

        Topic.findOne({ slug: req.params.slug }).populate('pi semester').populate({
            path: 'student',
            populate: { path: 'studentInfo' }
        })
            .then(async (topic) => {
                let reports = [];
                query['topic'] = topic._id;

                if (topic.pi._id == currentUserId) {
                    query['pi'] = currentUserId;
                    reports = await ReportTopic.find(query).populate('student', 'name');
                } else {
                    query['student'] = currentUserId;
                    reports = await ReportTopic.find(query).populate('student', 'name');
                }
                res.status(200).json({
                    topic,
                    reports: reports ?? null,
                });

            }).catch(next);
    }

    // [GET] /topic/lecturer/:id
    async getTopicByLecturerId(req, res, next) {
        const { page, limit } = req.query;
        const semester = req.query.semester || "";
        const module = req.query.module || '';
        const status = req.query.status || '';

        let queryString = {};

        queryString['pi'] = req.params.id;

        if (status) {
            queryString['status'] = 'SUGGESTED';
        }

        if (module) {
            queryString['module'] = module;
        }

        if (semester) {
            queryString['semester'] = semester;
        }

        console.log(queryString);

        try {
            const topics = await Topic.find(queryString).populate('pi').populate('semester').populate({
                path: 'student',
                populate: { path: 'studentInfo' }
            }).sort({
                createdAt: 'desc'
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Topic.find(queryString).countDocuments();

            res.status(200).json({
                topics,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1),
                count
            });
        } catch (err) {
            console.error(err);
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [GET] /topic/lecturerUserId/:id
    getTopicByLecturerUserId(req, res, next) {
        const { page, limit } = req.query;

        Lecturer.findOne({ userId: req.params.id })
            .then(async (lecturer) => {
                try {
                    //options : i -> case sensitve
                    const topics = await Topic.find({ pi: lecturer.id, isDisplay: true }).populate('pi semester student')
                        .sort({
                            createdAt: 'desc'
                        })
                        .limit(limit * 1)
                        .skip((page - 1) * limit)
                        .exec();

                    const count = await Topic.find({ pi: lecturer.id, isDisplay: true }).countDocuments();;

                    // return response with posts, total pages, and current page
                    res.status(200).json({
                        topics,
                        totalPages: Math.ceil(count / limit),
                        currentPage: Math.ceil(page / 1),
                        count
                    });
                } catch (err) {
                    console.error(err);
                }
            }).catch(next)

    }

    // [GET] /topic/student/:id -> get Topic that student registered
    async getTopicByStudentId(req, res, next) {
        try {
            const topics = await Topic.find({ 'student.studentInfo': req.params.id }).populate('pi semester').populate({
                path: 'student',
                populate: { path: 'studentInfo' }
            });
            res.status(201).json(topics);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /topic --> Create a new topic with needed attribute 
    async create(req, res) {
        const { name, pi, type, isDisplay, description, numberOfStudent, semester, module } = req.body;
        try {
            const topic = await Topic.create({ name, pi, type, isDisplay, description, numberOfStudent, semester, module });
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

    // [POST] /topic/suggest --> Create a new suggest topic
    async suggested(req, res) {
        const { name, pi, type, description, studentId, module } = req.body;
        const suggestedTopic = {
            name, pi, description, module,
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

    // [POST] /topic/register --> register a student to a Lecturer's topic
    async register(req, res, next) {
        try {

            const { studentId, topicId } = req.body;
            const topic = await Topic.findOneAndUpdate({ _id: topicId }, { $addToSet: { student: { studentInfo: studentId, status: 'PENDING' } } }, { new: true }).populate('pi semester')
            res.status(201).json({ topic });
            // if (topic) {
            //     const { name, pi, semester, module } = topic;
            //     const emailMessage = { // thiết lập đối tượng, nội dung gửi mail
            //         from: 'Hệ thống quản lý đề tài',
            //         to: 'yenb1910335@student.ctu.edu.vn',
            //         subject: 'ĐĂNG KÝ ĐỀ TÀI THÀNH CÔNG',
            //         html: emailMessageHtml(topic.name, topic.slug, pi.name, module.moduleId + ' | ' + module.name, getSemesterBySysId(semester.sysId), 'Đang chờ duyệt')
            //     }

            //     transporter.sendMail(emailMessage).then(console.log).catch(console.error);
            // }

        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /topic/unregister/:slug --> remove student id from topic
    async removeStudentId(req, res, next) {
        const { studentId } = req.body;
        try {
            const topic = await Topic.findOne({ slug: req.params.slug });
            const { status, numberOfStudent } = topic;
            if (status === 'SUGGESTED' && numberOfStudent === 1) {
                Topic.deleteOne({ slug: req.params.slug }).then((topic) => {
                    res.status(200).json(topic);
                })
                    .catch(next);
            } else {
                Topic.findOneAndUpdate({ slug: req.params.slug }, { $pull: { student: { studentInfo: studentId } } })
                    .then((topic) => {
                        res.status(201).json(topic);
                    })
                    .catch(next);
            }
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /topic/review --> update status of register student
    async review(req, res, next) {
        try {
            const { topicIndex, status, reason, studentId } = req.body;

            const topic = await Topic.findOneAndUpdate({ 'student._id': topicIndex }, {
                '$set': {
                    'student.$.status': status,
                    'student.$.reason': status === 'REJECT' ? reason : '',
                }
            }).populate('pi');

            const emailMessage = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Hệ thống quản lý đề tài',
                to: 'yenb1910335@student.ctu.edu.vn',
                subject: 'Đề tài đã được phê duyệt',
                html: reviewEmailMessageHtml(topic.name, topic.slug, topic.pi.name, status)
            }

            transporter.sendMail(emailMessage).then(console.log).catch(console.error);

            if (status === 'APPROVE') {
                const reportTopic = (await ReportTopic.create({ pi: topic.pi._id, student: studentId, topic: topic._id, isReport: false })).populate('pi topic');
                // if (reportTopic) {
                //     const emailMessage = { 
                //         from: 'Hệ thống quản lý đề tài',
                //         to: 'yenb1910335@student.ctu.edu.vn',
                //         subject: 'Đề tài đã được phê duyệt',
                //         html: reviewEmailMessageHtml(topic.name, topic.slug, topic.pi.name, status)
                //     }

                //     transporter.sendMail(emailMessage).then(console.log).catch(console.error);
                // }

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
