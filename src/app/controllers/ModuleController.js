const Module = require('../models/Module');
const Topic = require('../models/Topic');

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
    // [DELETE] /module/remove
    async remove(req, res, next) {
        const moduleId = req.params.id;
        try {
            // const module = await Module.findOneAndRemove({ moduleId: req.params.id });
            const module = await Module.findOne({ moduleId: req.params.id });

            const topic = await Topic.findOne({ module: module._id })

            if (topic) {
                res.status(400).json({ errors: { message: `Tồn tại đề tài được tạo với mã học phần ${req.params.id}, không thể xóa học phần` } });
            } else {
                const deleteModule = await Module.findOneAndRemove({ moduleId: req.params.id });
                res.status(200).json({ statusCode: 200, message: `Đã xóa thành công ${req.params.id}` });
            }
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new ModuleController();
