const ReportTopic = require('../models/ReportTopic');

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
            query['topic.module.moduleId'] = { '$in': ['CT554', 'CT666'] }
            console.log(query)
        }
        try {
            // execute query with page and limit values
            const topics = await ReportTopic.find(query).populate('pi').populate('student').populate('topic')
                .sort({
                    createdAt: 'desc'`
                })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await ReportTopic.find(query).count();

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

    // [GET] /report/lecturer/:id --> get students + pagination
    async getReportByLecturerId(req, res, next) {
        //limit: item per page
        try {
            const topics = await ReportTopic.find({ 'pi': req.params.id }).populate('pi').populate('student').populate('topic')
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

}

module.exports = new ReportTopicController();
