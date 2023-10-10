const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolYearSemester = new Schema(
    {
        sysId: { type: String, unique: true },
        semester: { type: Number, enum: [1, 2, 3], required: [true, 'Semester is required'] },
        schoolYear: {
            beginAt: { type: Date, required: [true, 'Begin of school is required'] },
            endAt: { type: Date, required: [true, 'End of school year is required'] }
        },
    }
);

//fire a function after doc save to db
SchoolYearSemester.post('save', function (doc, next) {
    console.log('New SYS was created and saved', doc);
    next();
})

module.exports = mongoose.model('SchoolYearSemester', SchoolYearSemester);
