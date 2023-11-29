const Manage = require('../app/models/Manage');
const Student = require('../app/models/Student');
const Module = require('../app/models/Module');
const Topic = require('../app/models/Topic');
const constant = require('.././constants')

const { isOpenForRegister } = require('.././utils/isOpenForRegister')
const { isBefore } = require('date-fns')

const checkRegisterTopicTime = async (req, res, next) => {
    let errors = { registerTime: '' };

    const { registerTopicTime } = await Manage.findOne();
    const isRegisterTopicTime = isOpenForRegister(registerTopicTime.beginAt, registerTopicTime.endAt);
    if (isRegisterTopicTime) {
        next();
    } else {
        if (isBefore(new Date(Date.now()),
            new Date(registerTopicTime.beginAt))) {

            errors.registerTime = 'Chưa đến thời gian đăng ký đề tài';
            res.status(400).json({ errors })
            return;
        } else {
            errors.registerTime = 'Thời gian đăng ký đề tài đã kết thúc';
            res.status(400).json({ errors });
            return;
        }
    }
}

//check register module of student is suitable for register this topic with topicId in param
const isValidToRegister = async (req, res, next) => {
    const { studentId, topicId } = req.body;
    let errors = { student: '' };

    const { module } = await Topic.findOne({ _id: topicId });
    const student = await Student.findOne({ _id: studentId }).populate({
        path: 'registerModule',
        populate: { path: 'semester' }
    })

    const moduleType = student.registerModule.find((module) => module.semester._id = constant.RECENT_SEMESTER_ID).moduleType;

    if (moduleType) {
        if (moduleType.split('-').includes(module.moduleId)) {
            next();
        } else {
            // errors.student = 'Đề tài sinh viên đăng ký không phù hợp với học phần của sinh viên'
            errors.student = 'Đề tài sinh viên đăng ký không hợp lệ'
            res.status(400).json({ errors })
        }
    } else {
        errors.student = 'Sinh viên chưa đăng ký học phần';
        res.status(400).json({ errors })
    }

}

//check register module of student is suitable for register this topic with topicId in param
const isValidToSuggest = async (req, res, next) => {

    const { studentId, module } = req.body;
    let errors = { student: '' };

    const student = await Student.findOne({ _id: studentId }).populate({
        path: 'registerModule',
        populate: { path: 'semester' }
    })
    //get moduleType of recent semester
    const moduleType = student.registerModule.find((module) => module.semester._id = constant.RECENT_SEMESTER_ID).moduleType;
    const moduleDoc = await Module.findOne({ _id: module });

    if (moduleType) {
        if (moduleType.includes(moduleDoc.moduleId)) {
            next();
        } else {
            // errors.student = 'Đề tài sinh viên đăng ký không phù hợp với học phần của sinh viên'
            errors.student = 'Đề tài sinh viên đăng ký không hợp lệ'
            res.status(400).json({ errors })
        }
    } else {
        errors.student = 'Sinh viên chưa đăng ký học phần';
        res.status(400).json({ errors })
    }

}

module.exports = { isValidToRegister, isValidToSuggest, checkRegisterTopicTime }