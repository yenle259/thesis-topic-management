const User = require('../models/User');

class UserController {
    // [GET] /user
    index(req, res) {
        res.send('User!!!');
    }
    // [GET] /user
    search(req, res) {
        res.json();
    }

    get(req, res, next) {
        User.find({})
            .then((courses) => {
                res.json(courses);
            })
            .catch(next);
    }
}

module.exports = new UserController();
