const mongoose = require('mongoose');

const connectDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('DB Connection Failed');
    }
}

module.exports = {
    connectDataBase
}