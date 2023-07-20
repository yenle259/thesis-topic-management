const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        studentId: { type: String, unique: true },
        name: { type: String, maxLength: 255 },
        phone: { type: String, maxLength: 50 },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
