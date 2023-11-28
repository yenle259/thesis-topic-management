const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('./Student');

const Schema = mongoose.Schema;

const Lecturer = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            required: [true, 'UserId is required'],
            lowercase: true
        },
        name: { type: String, maxLength: 255 },
        email: { type: String, maxLength: 255 },
        phone: { type: String, maxLength: 50 },
        role: { type: String, enum: ['LECTURER', 'ADMIN'], default: 'LECTURER' },
        password: {
            type: String,
            minLength: [8, 'Password must have more than 8 characters'],
            required: [true, 'Password is required'],
            select: false,
        },
    },
    { timestamps: true },
);

//fire a function before doc save to db - this prehook to hash pass before storing in db
Lecturer.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    console.log('Lecturer was about to created and saved', this);
    next();
})


//fire a function after doc save to db
Lecturer.post('save', function (doc, next) {
    console.log('new Lecturer was created and saved', doc);
    next();
})

Lecturer.statics.login = async function (userId, password) {

    const student = await Student.findOne({ userId }).select("+password").populate({
        path: 'registerModule',
        populate: { path: 'semester' }
    });
    const user = await this.findOne({ userId }).select("+password");

    if (student) {
        const auth = await bcrypt.compare(password, student.password);
        if (auth) {
            return student;
        }
        throw Error('Incorrect password');
    } else if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    } else {
        throw Error('Invalid User ID');
    }
}


module.exports = mongoose.model('Lecturer', Lecturer);
