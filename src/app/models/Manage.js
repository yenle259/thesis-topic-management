const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Manage = new Schema(
    {
        registerTopicTime: {
            beginAt: { type: Date, required: [true, 'Registration starting time is required'] },
            endAt: { type: Date, required: [true, 'Registration ending time is required'] }
        },
        registerReportTime: {
            beginAt: { type: Date, required: [true, 'Report starting time is required'] },
            endAt: { type: Date, required: [true, 'Report ending time is required'] }
        },
    }
);

Manage.post('save', function (doc, next) {
    console.log('Manage was created and saved', doc);
    next();
})

//Add plugins
module.exports = mongoose.model('Manage', Manage);
