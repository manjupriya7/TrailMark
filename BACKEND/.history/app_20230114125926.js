const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const app = express();

app.use(bodyParser.json());//it tells the system that we have to use json or returns middleware that only parses JSON

app.use("/", (req, res) => {
  res.status(200).send("Api is running");
})
app.use(cors());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});

app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes);

app.use((res, req, next) => {
  const error = new HttpError('could not find the route', 404);
  throw error; //we can throw error becoz of synchronous nature. and nothing speaks against throwing it.
});

app.use((error, req, res, next) => {

  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
  .set("strictQuery", false)
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t3rtmhc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5001);
    console.log(`listening on port ${PORT}`);
  })
  .catch(err => {
    console.log(err);
  });

