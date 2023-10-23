
const Student = require('../models/Student');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { userInfo: '', registerModule: '' };

    if (err.message.includes('Student validation failed')) {
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

class StudentController {

    // [POST] /student
    async create(req, res) {
        const { student, type } = req.body;
        try {
            const register = await Student.create({ student, type });
            res.status(201).json(register);
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }

    // [GET] /student --> get all student
    getStudents(req, res, next) {
        Student.find()
            .then((students) => {
                res.json(students);
            })
            .catch(next);
    }

    // [GET] /student/:id --> get student by id
    getStudentByUserId(req, res, next) {
        const student = Student.findOne({ userInfo: req.params.id }).populate('userInfo')
            .then((student) => {
                res.json(student);
            })
            .catch(next);
    }

}

module.exports = new StudentController();
