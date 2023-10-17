const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lecturer = new Schema(
    {
        userInfo: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Student is required'], },
    }, { timestamps: true },
);

//fire a function after doc save to db
Lecturer.post('save', function (doc, next) {
    console.log('Student register module was created and saved', doc);
    next();
})

module.exports = mongoose.model('Lecturer', Lecturer);
