const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        studentId: { type: String, unique: true, required: true, lowercase: true },
        name: { type: String, maxLength: 255 },
        phone: { type: String, maxLength: 50 },
        password: { type: String, minLength: 8, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
