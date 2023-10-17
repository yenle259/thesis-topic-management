
const PublishDate = require('../models/PublishDate');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { publishDate: '' };

    if (err.message.includes('PublishDate validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
};

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('Site Controller!!!');
    }

    // [GET] /set-cookies
    setCookies(req, res, next) {
        // res.setHeader('Set-Cookie','newUser=true')
        res.cookie('isStudent', true);
        res.send('got cookiess');
    }

    // [GET] /read-cookies
    readCookies(req, res, next) {
        const cookies = req.cookies;
        console.log(cookies);
        res.json(cookies);
    }

    // [GET] /publish
    get(req, res, next) {
        PublishDate.findOne()
            .then((publishDate) => {
                res.status(200).json(publishDate);
            })
            .catch(next);
    }

    // [POST] /publish/CREATE
    async create(req, res, next) {
        const { publishDate } = req.body;
        try {
            const publish = await PublishDate.create({ publishDate });
            res.status(201).json(publish);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /publish/set
    async set(req, res, next) {
        const { publishDate, id } = req.body;
        try {
            const publish = await PublishDate.findByIdAndUpdate({ _id: id }, { publishDate });
            res.status(201).json(publish);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new SiteController();
