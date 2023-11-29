const ReportTopic = require('../models/ReportTopic');
const Topic = require('../models/Topic');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { pi: '', student: '', topic: '', isReport: '' };

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

class ReportTopicController {

    // [GET] /report --> get all report topic
    async get(req, res, next) {
        const { page, limit } = req.query;
        const isReport = req.query.isReport || '';

        let query = {};

        if (isReport) {
            // query['module.moduleId'] = { '$in': ['CT554', 'CT666'] }
            // console.log(query)
            // query = { '$and': [{ 'student.status': 'APPROVE' }, { 'module': { $in: ['654fd85377f71c8576f9a339', '654fdb16d92399b3661be1ce'] } }] }
        }

        try {
            // execute query with page and limit values
            const topics = await ReportTopic.find(query)
                .populate({
                    path: 'pi student topic'
                })
                .sort({
                    createdAt: 'desc',
                })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await ReportTopic.find(query).count();

            if (isReport) {
                const filterTopics = topics.filter(({ topic }) => ['CT554', 'CT666'].includes(topic.module.moduleId))
                const length = filterTopics.length;
                res.status(200).json({
                    topics: filterTopics,
                    totalPages: Math.ceil(length / limit),
                    currentPage: Math.ceil(page / 1),
                    count: length
                });
            } else {
                res.status(200).json({
                    topics,
                    totalPages: Math.ceil(count / limit),
                    currentPage: Math.ceil(page / 1),
                    count
                });
            }

        } catch (err) {
            console.error(err);
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [GET] /report/lecturer/:id --> get students + pagination
    async getReportByLecturerId(req, res, next) {
        //limit: item per page
        try {
            const topics = await ReportTopic.find({ 'pi': req.params.id }).populate('pi student').populate({
                path: 'topic',
                populate: { path: 'semester' }
            })
                .sort({ createdAt: '-1' })
            const total = await ReportTopic.find({ 'pi': req.params.id }).countDocuments();

            res.status(200).json({
                topics,
                total
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    // [GET] /report/student/:id --> get students + pagination
    async getReportOfStudent(req, res, next) {
        try {
            const topics = await ReportTopic.find({ 'student': req.params.id }).populate('pi').populate('topic').populate({
                path: 'topic',
                populate: { path: 'semester' }
            })
                .sort({ createdAt: '-1' })
            const total = await ReportTopic.find({ 'student': req.params.id }).countDocuments();

            res.status(200).json({
                topics,
                total
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    // [PUT] /report/register --> student register report topic of mine 
    async registerReport(req, res, next) {

        const { status, topicId, studentId } = req.body;
        try {
            const reportTopic = await ReportTopic.findOneAndUpdate({ topic: topicId, student: studentId },
                { reportStatus: { studentRegister: status, piConfirm: 'PENDING' } }, { new: true })
                .populate('pi')

            res.status(201).json({ reportTopic });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /report/review --> student register report topic of mine 
    async reviewRegisterReport(req, res, next) {
        try {
            const { piConfirm, topicId } = req.body;
            const reportTopic = await ReportTopic.findOneAndUpdate({ _id: topicId },
                { 'reportStatus.piConfirm': piConfirm }, { new: true })
            res.status(201).json({ reportTopic });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new ReportTopicController();
