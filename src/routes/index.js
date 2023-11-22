const reportRouter = require('./report');
const topicRouter = require('./topic');
const sysRouter = require('./sys');
const lecturerRouter = require('./lecturer');
const siteRouter = require('./site');
const authRouter = require('./auth');
const studentRouter = require('./student');
const moduleRouter = require('./module');
const { requireAuth } = require('../middleware/authMiddleware')

function route(app) {
    app.use('/module', requireAuth, moduleRouter);
    app.use('/student', requireAuth, studentRouter);
    app.use('/auth', authRouter);
    app.use('/sys', requireAuth, sysRouter);
    app.use('/report', requireAuth, reportRouter);
    app.use('/topic', requireAuth, topicRouter);
    app.use('/user', requireAuth, lecturerRouter);
    app.use('/', siteRouter);
}

module.exports = route;
