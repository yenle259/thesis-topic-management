
const StudentRegisterModule = require('../models/Student');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { userInfo };

    if (err.message.includes('Lecturer validation failed')) {
        Object.values(err.errors).forEach((item) => {
            if (item.path === 'userInfo' && item.messageFormat === undefined) {
                errors.student = 'User ID is invalid'
            }
            else {
                const { properties } = item;
                errors[properties.path] = properties.message;
            }
        });
    }
    return errors;
};

class StudentRegisterModuleController {

    // [POST] /student
    async create(req, res) {
        const { userInfo } = req.body;
        try {
            const lecturer = await StudentRegisterModule.create({ userInfo });
            res.status(201).json(lecturer);
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }


}

module.exports = new StudentRegisterModuleController();
