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
    // [DELETE] /module/remove
    async remove(req, res, next) {
        try {
            const module = await Module.findOneAndRemove({ moduleId: req.params.id });
            res.status(200).json({ message: `Đã xóa thành công ${req.params.id}` });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new ModuleController();
