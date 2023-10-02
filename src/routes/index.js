const topicRouter = require('./topic');
const userRouter = require('./user');
const siteRouter = require('./site');
const authRouter = require('./auth');
const { requireAuth } = require('../middleware/authMiddleware')

function route(app) {
    app.use('/auth', authRouter);
    app.use('/topic', requireAuth, topicRouter);
    app.use('/user', requireAuth, userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
