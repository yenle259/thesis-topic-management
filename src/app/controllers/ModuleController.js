const Module = require('../models/Module');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { moduleId: '', name: '' }

    if (err.code === 11000) {
        errors.moduleId = 'Mã học phần không được trùng lặp'
    }
    //invalid topic
    if (err.message.includes('Module validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }

    return errors;
}

class ModuleController {

    // [GET] /module --> get all module
    get(req, res, next) {
        Module.find()
            .then((modules) => {
                res.json(modules);
            })
            .catch(next);
    }

    // [POST] /module/create
    async addModule(req, res, next) {
        const { moduleId, name } = req.body;
        try {
            const module = await Module.create({ name, moduleId });
            res.status(201).json({ module });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
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

module.exports = new ModuleController();
