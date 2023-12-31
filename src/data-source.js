const mongoose = require('mongoose');

const connectDataBase = async() => {
    try {
        await mongoose.connect('mongodb+srv://Kitaab:462TOxTn5abApMuD@cluster0.agqr9s7.mongodb.net/book_center?retryWrites=true&w=majority');
    }
    catch (e) {
        await mongoose.disconnect();
        console.log('DB Connection Failed');
    }
}

module.exports = {
    connectDataBase
}