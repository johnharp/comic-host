const express = require('express');
const bodyParser = require('body-parser');

const chapterRoutes = require('./routes/chapter-routes.js');
//const stripsRoutes = require('./routes/strips-routes.js');

const app = express();
app.use(chapterRoutes);




app.listen(5000);