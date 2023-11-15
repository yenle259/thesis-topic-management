const SchoolYearSemester = require('../models/SchoolYearSemester');
const cookieParser = require('cookie-parser');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { sysId: '', semester: '', schoolYear: { beginAt: '', endAt: '' } };

    //invalid SYS
    if (err.message.includes('SchoolYearSemester validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }

    //duplicate err code 11000
    if (err.code === 11000) {
        errors.sysId = "Sys ID: " + err.writeErrors[0].err.op.sysId + " is existed"
    }

    // if(Object.)
    return errors;
}

class SchoolYearSemesterController {

    // [GET] /sys
    async getAll(req, res, next) {
        const isMain = req.query.isMain || '';
        let query = {};

        if (isMain) {
            query = { semester: { "$ne": 3 } }
        }

        try {
            const semesters = await SchoolYearSemester.find(query).sort({ 'schoolYear.beginAt': -1 })
            res.status(200).json(semesters);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
    // [GET] /sys/main =>get main semester
    async getMain(req, res, next) {
        try {
            const semesters = await SchoolYearSemester.find({ semester: { '$in': [1, 2] } }).sort({ 'schoolYear.beginAt': -1 })
            res.status(200).json(semesters);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
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
            // res.status(400).json(err.writeErrors[0].err.op.sysId);

        }
    }
}

module.exports = new SchoolYearSemesterController();
