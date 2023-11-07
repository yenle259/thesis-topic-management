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
    get(req, res, next) {
        ReportTopic.find().populate('pi').populate('student').populate('topic')
            .then((topics) => {
                res.json(topics);
            })
            .catch(next);
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
