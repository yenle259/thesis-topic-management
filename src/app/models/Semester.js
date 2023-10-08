const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const SemesterAndYear = new Schema(
    {
        semester: { type: Number, enum: [1, 2, 3] },
        year: { type: Date.year }
    }
);

//fire a function after doc save to db
Semester.post('save', function (doc, next) {
    console.log('New topic was created and saved', doc);
    next();
})

//Add plugins
mongoose.plugin(slug);
module.exports = mongoose.model('Semester', Semester);
