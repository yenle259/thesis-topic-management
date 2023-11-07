const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Student = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            required: [true, 'Student ID is required'],
            lowercase: true
        },
        name: { type: String, maxLength: 255 },
        email: { type: String, maxLength: 255 },
        password: {
            type: String,
            minLength: [8, 'Password must have more than 8 characters'],
            required: [true, 'Password is required'],
            select: false,
        },
        registerModule: [{
            semester: { type: Schema.Types.ObjectId, ref: 'SchoolYearSemester' },
            moduleType: { type: String }
        }],
    }, { timestamps: true },
);

//fire a function before doc save to db - this prehook to hash pass before storing in db
Student.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    console.log('Student was about to created and saved', this);
    next();
})

//fire a function after doc save to db
Student.post('save', function (doc, next) {
    console.log('Student was created and saved', doc);
    next();
})

Student.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

//static method to user login
Student.statics.login = async function (userId, password) {
    const user = await this.findOne({ userId }).select("+password");
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Invalid User ID');
}

module.exports = mongoose.model('Student', Student);
