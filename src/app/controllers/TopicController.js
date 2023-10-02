const Topic = require('../models/Topic');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { name: '', pi: '', type: '' };

    //invalid topic
    if (err.message.includes('Topic validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
}

class TopicController {

    // [GET] /topic
    get(req, res, next) {
        Topic.find().populate('pi')
            .then((topics) => {
                res.json(topics);
            })
            .catch(next);
    }

    // [POST] /topic
    async create(req, res) {
        const { name, pi, type } = req.body;
        try {
            const topic = await Topic.create({ name, pi, type });
            res.status(201).json({ topic: topic._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
}

module.exports = new TopicController();
