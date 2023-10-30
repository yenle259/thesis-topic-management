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

}

module.exports = new ReportTopicController();
