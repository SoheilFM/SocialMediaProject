const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/place-routes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
