const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportTopic = new Schema(
    {
        pi: { type: Schema.Types.ObjectId, ref: 'Lecturer', required: [true, "PI is required"] },
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: [true, "Student is required"] },
        topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: [true, "Topic is required"] },
        isReport: { type: Boolean }
    },
    { timestamps: true },
);

//fire a function after doc save to db
ReportTopic.post('save', function (doc, next) {
    console.log('New report topic was created and saved', doc);
    next();
})

module.exports = mongoose.model('ReportTopic', ReportTopic);
