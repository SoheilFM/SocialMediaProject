const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/place-routes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || 'An Unknown Error Occurred',
    });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
