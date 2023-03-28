const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/place-routes');
const usersRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred!',
    });
});

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
} catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
}
mongoose.connection.on('disconnect', () => {
    console.log('MongoDB Disconnected');
});

mongoose.connection.on('connect', () => {
    console.log('MongoDB Connected');
});
