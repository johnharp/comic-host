const express = require('express');
const bodyParser = require('body-parser');

const chaptersRoutes = require('./routes/chapters-routes.js');
const stripsRoutes = require('./routes/strips-routes.js');

const app = express();
app.use('/api/chapters', chaptersRoutes);
app.use('/api/strips', stripsRoutes);



app.listen(5000);