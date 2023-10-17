const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublishDate = new Schema(
    {
        publishDate: { type: Date, required: [true, 'Public date is required'] }
    }
);

PublishDate.post('save', function (doc, next) {
    console.log('Publish date was created and saved', doc);
    next();
})

//Add plugins
module.exports = mongoose.model('PublishDate', PublishDate);
