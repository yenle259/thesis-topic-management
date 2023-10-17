const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema(
    {
        userInfo: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Student is required'], },
        registerModule: { type: String, enum: ['NLCS', 'NL', 'TL', 'LV'], required: [true, 'Module type is required'] },
    }, { timestamps: true },
);

//fire a function after doc save to db
Student.post('save', function (doc, next) {
    console.log('Student register module was created and saved', doc);
    next();
})

module.exports = mongoose.model('Student', Student);
