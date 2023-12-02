const Lecturer = require('../models/Lecturer');
const bcrypt = require('bcrypt');

const handleErrors = (err) => {
    let errors = { userId: '', name: '', email: '', moduleType: '', password: '' };

    if (err.code === 11000) {
        errors.userId = "Mã số sinh viên đã tồn tại"
    }

    if (err.message.includes('Lecturer validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        // console.log(errors);
    }
    return errors;
};

class LecturerController {

    // [GET] /user
    get(req, res, next) {
        Lecturer.find({})
            .then((courses) => {
                res.json(courses);
            })
            .catch(next);
    }

    // [GET] /user/lecturers/:userId
    getLecturersById(req, res, next) {
        Lecturer.findOne({ userId: req.params.id })
            .then((lecturer) => {
                res.json(lecturer);
            })
            .catch(next);
    }

    // [GET] /user/lecturers
    async getLecturers(req, res) {
        const { page, limit } = req.query;
        const search = req.query.search || "";
        const role = req.query.role || "";

        let queryRole;

        if (role === 'LECTURER') {
            queryRole = { 'role': 'LECTURER' }
        }
        if (role === 'ADMIN') {
            queryRole = { 'role': 'ADMIN' }
        }

        try {
            const lecturers = await Lecturer.find(queryRole)
                .or([
                    { name: { $regex: search, $options: "i" } },
                    { userId: { $regex: search, $options: "i" } }])
                .sort({
                    userId: 'desc'
                })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Lecturer.find(queryRole).or([{ name: { $regex: search, $options: "i" } }, { userId: { $regex: search, $options: "i" } }]).countDocuments();

            res.status(200).json({
                lecturers,
                totalPages: Math.ceil(count / limit),
                currentPage: Math.ceil(page / 1),
                count,
            });
        } catch (err) {
            console.log(err)
        }
    }

    // [POST] /user/account
    async createLecturer(req, res) {
        const { userId, password, name, email, role } = req.body;
        try {
            const lecturer = await Lecturer.create({ userId, password, name, email, role: 'LECTURER' });

            res.status(201).json({ lecturer: lecturer._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /user/update/:id --> Update user by id
    async updateLecturer(req, res, next) {
        try {
            const { userId, name, email, password, role } = req.body;
            if (password) {
                const salt = bcrypt.genSaltSync();
                const hashPassword = bcrypt.hashSync(password, salt)
            }

            console.log(name);
            const lecturer = await Lecturer.findOneAndUpdate({ _id: req.params.id },
                {
                    userId, name, email, role
                },
                { new: true })

            res.status(200).json(lecturer);
        } catch (err) {
            console.log(err)
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /lecturer/account/import --> Create a list of lecturer by file import
    async importAccount(req, res, next) {
        try {
            const data = req.body;
            const accountData = data.map((lecturer) => {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(lecturer.password, salt)
                return new Lecturer({
                    userId: lecturer.userId,
                    name: lecturer.name,
                    password: hash ?? lecturer.password,
                    email: lecturer.email,
                    role: lecturer.role
                })
            }
            )
            const lecturers = await Lecturer.insertMany(accountData, { ordered: false })
            res.status(200).json(lecturers);
        } catch (err) {
            console.log(err)
            if (err.writeErrors) {
                let errors = { userId: [] }
                err.writeErrors.map((error) => {
                    if (err.code === 11000) {
                        errors.userId.push('MSCB: ' + error.err.op.userId + ' đã tồn tại\n')
                    }
                })
                res.status(400).json({ errors });
            } else {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        }
    }

    // [POST] /lecturer/account/import -> import file account of lecturer without hash pass
    async importAccountWithoutHashPw(req, res, next) {
        try {
            const data = req.body;
            const accountData = data.map((lecturer) => {

                return new Lecturer({
                    userId: lecturer.userId,
                    name: lecturer.name,
                    password: lecturer.password,
                    email: lecturer.email,
                    role: lecturer.role ?? 'LECTURER'
                })
            }
            )
            const lecturers = await Lecturer.insertMany(accountData, { ordered: false })
            res.status(200).json(lecturers);
        } catch (err) {
            console.log(err)
            if (err.writeErrors) {
                let errors = { userId: [] }
                err.writeErrors.map((error) => {
                    if (err.code === 11000) {
                        errors.userId = 'Mã số cán bộ: ' + error.err.op.userId + ' đã tồn tại\n';
                    }else{
                        errors.error = 'Không thể thực hiện thoa tác';
                    }
                })
                res.status(400).json({ errors });
            } else {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        }
    }

}

module.exports = new LecturerController();
