const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const Topic = new Schema(
    {
        name: { type: String, maxLength: 255, required: [true, 'Topic name is required'] },
        slug: { type: String, slug: 'name', unique: true },
        pi: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "PI is required"] },
        description: { type: String, maxLength: 500 },
        type: { type: String, enum: ['NLCS', 'NL', 'TL', 'LV',] },
        numberOfStudent: { type: Number, default: 1 },
        student: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        isDisplay: { type: Boolean, default: false },
    },
    { timestamps: true },
);

//fire a function after doc save to db
Topic.post('save', function (doc, next) {
    console.log('New topic was created and saved', doc);
    next();
})

//Add plugins
mongoose.plugin(slug);
module.exports = mongoose.model('Topic', Topic);
