const express = require('express');
const bodyParser = require('body-parser');

const chaptersRoutes = require('./routes/chapters-routes.js');
const stripsRoutes = require('./routes/strips-routes.js');

const app = express();

app.use(bodyParser.json());

app.use('/api/chapters', chaptersRoutes);
app.use('/api/strips', stripsRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred'});
});


app.listen(5000);