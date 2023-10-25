const Lecturer = require('../models/Lecturer');

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
    getLecturers(req, res, next) {
        Lecturer.find({ role: "LECTURER" })
            .then((lecturers) => {
                res.json(lecturers);
            })
            .catch(next);
    }
}

module.exports = new LecturerController();
