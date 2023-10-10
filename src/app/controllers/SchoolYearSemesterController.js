const SchoolYearSemester = require('../models/SchoolYearSemester');
const cookieParser = require('cookie-parser');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { sysId: '', semester: '', schoolYear: { beginAt: '', endAt: '' } };

    //invalid user
    if (err.message.includes('SchoolYearSemester validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
}

class SchoolYearSemesterController {

    // [GET] /sys
    getAll(req, res, next) {
        const semesters = SchoolYearSemester.find().sort({ 'semester': 1, 'schoolYear.beginAt': 1 })
            .then((semesters) => {
                res.status(200).json(semesters);
            })
            .catch(next);
    }

    // [POST] /sys/create
    async create(req, res) {
        const { semester, schoolYear } = req.body;
        const beginYear = new Date(schoolYear.beginAt);
        const sysId = 's' + semester + 'b' + beginYear.getFullYear();
        try {
            const sys = await SchoolYearSemester.create({ sysId, semester, schoolYear });
            res.status(201).json(sys);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /sys/establish
    async establish(req, res) {
        const data = req.body
        try {
            const sys = await SchoolYearSemester.insertMany(data);
            res.status(201).json(sys);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
}

module.exports = new SchoolYearSemesterController();
