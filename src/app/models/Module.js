const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const Module = new Schema(
    {
        name: { type: String, maxLength: 255, required: [true, 'Module name is required'] },
        moduleId: {
            type: String,
            minLength: 5,
            unique: [true, 'Module ID is unique'],
            uppercase: true,
            required: [true, 'Module ID is required']
        }
    },
    { timestamps: true },
);

//fire a function after doc save to db
Module.post('save', function (doc, next) {
    console.log('New module was created and saved', doc);
    next();
})

//Add plugins
mongoose.plugin(autopopulate);
module.exports = mongoose.model('Module', Module);
