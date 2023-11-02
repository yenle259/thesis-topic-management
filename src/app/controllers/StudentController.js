
const Student = require('../models/Student');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { userId: '', name: '', email: '', moduleType: '' };

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
        Student.find().populate({
            path: 'registerModule',
            populate: { path: 'semester' }
        })
            .then((students) => {
                res.json(students);
            })
            .catch(next);
    }

    // [GET] /student/:id --> get student by id
    getStudentByUserId(req, res, next) {
        const student = Student.findOne({ userInfo: req.params.id })
            .then((student) => {
                res.json(student);
            })
            .catch(next);
    }

    // [PUT] /student/update/:id --> Update object with _id 
    async update(req, res, next) {
        try {
            const { userId, name, email, moduleType } = req.body;
            const student = await Student.findOneAndUpdate({ _id: req.params.id, 'registerModule.semester': '6526d24c7547ab02d497a7a4' }, {
                '$set': {
                    userId, name, email,
                    'registerModule.$.moduleType': moduleType,
                },
            }, { new: true })
            res.status(200).json(student);
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new StudentController();
