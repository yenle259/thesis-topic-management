const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema(
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
        role: { type: String, maxLength: 50 },
        password: {
            type: String,
            minLength: [8, 'Password must have more than 8 characters'],
            required: [true, 'Password is required']
        },
    },
    { timestamps: true },
);

//fire a function before doc save to db - this prehook to hash pass before storing in db
User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    console.log('user was about to created and saved', this);
    next();
})


//fire a function after doc save to db
User.post('save', function (doc, next) {
    console.log('new user was created and saved', doc);
    next();
})


//static method to user login
User.statics.login = async function (userId, password) {
    const user = await this.findOne({ userId });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Invalid User ID');
}

module.exports = mongoose.model('User', User);
