const mongoose = require('mongoose');

const connectDataBase = async() => {
    try {
        // const dbUrl = 'mongodb://127.0.0.1/book-centre';
        const dbUrl = process.env.MONGO_DB_URL;

        await mongoose.connect(dbUrl);
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('DB Connection Failed');
    }
}

module.exports = {
    connectDataBase
}