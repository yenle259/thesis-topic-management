const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Lecturer');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const SuggestTopic = new Schema(
    {
        name: { type: String, maxLength: 255, required: [true, 'Topic name is required'] },
        slug: { type: String, slug: 'name', unique: true },
        pi: { type: Schema.Types.ObjectId, ref: 'Lecturer', required: [true, "PI is required"] },
        description: { type: String, maxLength: 500 },
        type: { type: String, enum: ['NLCS', 'NL', 'TL', 'LV',] },
        numberOfStudent: { type: Number, default: 1 },
        student: [{
            studentInfo: { type: Schema.Types.ObjectId, ref: 'Student' },
            status: { type: String, enum: ['APPROVE', 'REJECT', 'PENDING'] },
            reason: { type: String, minlength: 15 },
        }],
        isDisplay: { type: Boolean, default: false },
        semester: { type: Schema.Types.ObjectId, ref: 'SchoolYearSemester' },
    },
    { timestamps: true },
);

//fire a function after doc save to db
SuggestTopic.post('save', function (doc, next) {
    console.log('New SuggestTopic was created and saved', doc);
    next();
})

//Add plugins
mongoose.plugin(slug);
module.exports = mongoose.model('SuggestTopic', SuggestTopic);
