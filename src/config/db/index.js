const mongoose = require('mongoose');

async function connect() {
    try {
        //mongodb://127.0.0.1:27017/
        //mongodb://localhost:27017
        await mongoose.connect('mongodb://127.0.0.1:27017/htql_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect Failed!!!');
    }
}

module.exports = { connect };
