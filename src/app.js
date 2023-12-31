const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { NotFoundError } = require('./core/ApiError');

//const seedProducts = require('./seeds/productsSeed');


const productRoutes = require('./routes/productsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');






app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 5000 }));
app.use(express.json({ parameterLimit: 5000, limit: '10mb' }));
app.use(methodOverride('_method'));


app.use(productRoutes);
app.use(reviewRoutes);



//seedProducts();

app.all('*',(req, res, next)=> next(new NotFoundError('You are requesting a wrong path.')))

// custom error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;
    res.status(status).render('error', { message });
});




module.exports = app;