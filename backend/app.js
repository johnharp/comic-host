const express = require("express");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

require("dotenv").config();

const usersRoutes = require("./routes/users-routes");
const chaptersRoutes = require("./routes/chapters-routes");
const stripsRoutes = require("./routes/strips-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/chapters", chaptersRoutes);
app.use("/api/strips", stripsRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });

