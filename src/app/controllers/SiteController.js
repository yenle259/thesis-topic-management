
const PublishDate = require('../models/PublishDate');
const Manage = require('../models/Manage');
const { isOpenForRegister } = require('../../utils/isOpenForRegister')

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    let errors = { publishDate: '' };

    let manageErrors = { endAt: '', beginAt: '' };

    if (err.message.includes('PublishDate validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }

    if (err.message.includes('Manage validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            manageErrors[properties.path] = properties.message;
        });
        return manageErrors;
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


    // [GET] /register-time
    async getRegisterTopicTime(req, res, next) {
        try {
            const manage = await Manage.findOne({ _id: '65624fae85c2a4edd040f817' });
            const { registerTopicTime, registerReportTime } = manage;
            const isRegisterTopicTime = isOpenForRegister(registerTopicTime.beginAt, registerTopicTime.endAt);
            const isReportTime = isOpenForRegister(registerReportTime.beginAt, registerReportTime.endAt);

            res.status(201).json({ registerTopicTime, registerReportTime, isRegisterTopicTime, isReportTime });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PATCH] /register-time
    async setRegisterTopicTime(req, res, next) {
        const { beginAt, endAt } = req.body;

        try {
            const manage = await Manage.findOneAndUpdate({ _id: '65624fae85c2a4edd040f817' }, { registerTopicTime: { beginAt, endAt } }, { new: true });
            res.status(201).json(manage);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [GET] /report-time
    async getRegisterReportTime(req, res, next) {
        try {
            const manage = await Manage.findOne({ _id: '65624fae85c2a4edd040f817' });
            res.status(201).json({ registerReportTime: manage.registerReportTime });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PATCH] /report-time -> set report time at
    async setRegisterReportTime(req, res, next) {
        const { beginAt, endAt } = req.body;

        try {
            const manage = await Manage.findOneAndUpdate({ _id: '65624fae85c2a4edd040f817' }, { registerReportTime: { beginAt, endAt } }, { new: true });
            res.status(201).json(manage);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /manage -> create new manage document
    async init(req, res, next) {
        let beginAt = new Date();
        let endAt = new Date();
        endAt = new Date(endAt.setDate(beginAt.getDate() + 7));

        const registerReportTime = { beginAt, endAt };
        const registerTopicTime = { beginAt, endAt };

        try {
            const manage = await Manage.create({ registerReportTime, registerTopicTime });
            res.status(201).json(manage);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new SiteController();
