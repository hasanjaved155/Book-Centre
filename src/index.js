const app = require('./app');
const DB = require('./data-source');

const PORT = 3000;

(async() => {
    try {
        await DB.connectDataBase();
        console.log('Database connection open!!');
        app.listen(PORT, () => {
            console.log(`Server start at port :: ${PORT}`);
        })
    }
    catch(e) {
        console.log('Cannot Start the server at the moment', e);
    }    
})();