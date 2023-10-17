const topicRouter = require('./topic');
const sysRouter = require('./sys');
const userRouter = require('./user');
const siteRouter = require('./site');
const authRouter = require('./auth');
const studentRouter = require('./student');
const { requireAuth } = require('../middleware/authMiddleware')

function route(app) {
    app.use('/student', studentRouter);
    app.use('/auth', authRouter);
    app.use('/sys', sysRouter);
    app.use('/topic', requireAuth, topicRouter);
    app.use('/user', requireAuth, userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
