const constant = require('../../constants')
const Student = require('../models/Student');
const Module = require('../models/Module');
const bcrypt = require('bcrypt');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { userId: '', name: '', email: '', moduleType: '', password: '' };

    if (err.code === 11000) {
        errors.userId = "Mã số sinh viên đã tồn tại"
    }

    if (err.message.includes('Student validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        // console.log(errors);
    }

    // if (err.writeErrors) {
    //     // let errors = { userId: [] }
    //     err.writeErrors.map((error) => {
    //         if (err.code === 11000) {
    //             errors.userId = 'MSSV: ' + error.err.op.userId + ' đã tồn tại\n';
    //         }
    //     })
    // }

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
        }).sort({
            createdAt: -1
        })
            .then((students) => {
                res.json(students);
            })
            .catch(next);
    }

    // [GET] /student --> get students + pagination
    async getStudentsPerPage(req, res, next) {
        //limit: item per page
        const { page, limit } = req.query;
        const search = req.query.search || "";
        const module = req.query.module || '';

        const modules = (await Module.find()).map((item) => (item.moduleId));

        let queryString = {};

        if (module === 'none') {
            queryString = { '$and': [{ 'registerModule.moduleType': { "$nin": modules } }, { 'registerModule.moduleType': { $eq: '' } }] }
        } else {
            queryString['registerModule.moduleType'] = { $regex: module, $options: "i" }
        }

        try {
            //options : i -> case sensitve
            const students = await Student.find(queryString).or([
                { name: { $regex: search, $options: "i" } },
                { userId: { $regex: search, $options: "i" } },
            ]).populate({
                path: 'registerModule',
                populate: { path: 'semester' }
            }).sort({
                userId: 'desc'
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Student.find(queryString).or([{ name: { $regex: search, $options: "i" } }, { userId: { $regex: search, $options: "i" } }]).countDocuments();;

            // return response with posts, total pages, and current page
            res.json({
                students,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1),
                count
            });
        } catch (err) {
            console.error(err);
        }
    }

    // [GET] /student/:id --> get student by id
    getStudentByUserId(req, res, next) {
        const student = Student.findOne({ userInfo: req.params.id })
            .then((student) => {
                res.json(student);
            })
            .catch(next);
    }

    // [GET] /student/module/:id --> get register module at recent semester(default) of student by Id
    async getRegisterModule(req, res, next) {
        const { semesterId } = req.query;
        try {
            const student = await Student.findOne({ _id: req.params.id }).populate({
                path: 'registerModule',
                populate: { path: 'semester' }
            })
            const { registerModule } = student;
            console.log(registerModule)
            if (semesterId) {
                const module = registerModule.find((module) => module.semester._id === semesterId)
                res.status(200).json({ module });
            } else {
                const module = registerModule.find((module) => module.semester._id = constant.RECENT_SEMESTER_ID)
                res.status(200).json({ module });
            }
        } catch (err) {
            console.log(err)
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
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
            // console.log(err)
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /student/account
    async handleStudentSignup(req, res) {
        const { userId, password, name, email, moduleType } = req.body;
        try {
            const registerModule = {
                semester: '6526d24c7547ab02d497a7a4',
                moduleType
            }
            const student = await Student.create({ userId, password, name, email, registerModule });

            res.status(201).json({ student: student._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /student/account/import --> Create a list of student by file import
    async importAccount(req, res, next) {
        try {
            const data = req.body;
            const accountData = data.map((student) => {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(student.password, salt)
                return new Student({
                    userId: student.userId,
                    name: student.name,
                    password: hash ?? student.password,
                    email: student.email,
                    registerModule: [
                        {
                            semester: '6526d24c7547ab02d497a7a4',
                            moduleType: student.moduleType ?? ''
                        }
                    ]
                })
            }
            )
            const students = await Student.insertMany(accountData, { ordered: false })
            res.status(200).json(students);
        } catch (err) {
            console.log(err)
            if (err.writeErrors) {
                let errors = { userId: [] }
                err.writeErrors.map((error) => {
                    if (err.code === 11000) {
                        errors.userId.push('MSSV: ' + error.err.op.userId + ' đã tồn tại\n')
                    }
                })
                res.status(400).json({ errors });
            } else {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        }
    }

    // [DELETE] /student/:id --> delete student by id
    async deleteStudent(req, res, next) {
        Student.findByIdAndRemove({ _id: req.params.id })
            .then((student) => {
                res.status(200).json(student);
            })
            .catch(next);
    }
}

module.exports = new StudentController();
