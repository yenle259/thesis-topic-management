const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const PublishDate = require('../app/models/PublishDate');

const checkPublishDate = async (req, res, next) => {

    const { publishDate } = await PublishDate.findOne();
    const recentDate = new Date(Date.now());

    if (new Date(publishDate.publishDate) > recentDate) {
        let errors = { publishDate: '' };
        errors.publishDate = 'Topic is not publish yet';
        res.status(500).json({ errors })
    }
}

module.exports = { checkPublishDate }