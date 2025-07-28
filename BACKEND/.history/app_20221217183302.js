const fs = require('fs');
const path=require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const app = express();

app.use(bodyParser.json());//it tells the system that we have to use json or returns middleware that only parses JSON

app.use('/uploads/images',express.static(path.join('uploads','images')));

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
    fs.unlink(req.file.path,err=>{
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
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t3rtmhc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5001);
  })
  .catch(err => {
    console.log(err);
  });








// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/user', (req, res, next) => {
//   res.send('<h1>User: ' + req.body.username + '</h1>');
// });

// app.get('/', (req, res, next) => {
//   res.send(
//     '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
//   );
// });

// app.listen(5000);


//-------------------------------------------------------------
// const http = require('http');
// const server = http.createServer((req, res) => {
//   console.log('INCOMING REQUEST');
//   console.log(req.method, req.url);

//   if(req.method=='POST'){
// let body='';
// req.on('end',()=>{
//     const username=body.split('=')[1];

//     res.end('<h1>'+ username+'</h1>')
// })
// req.on('data',(chunk)=>{
//     body+=chunk;
// });
//   }
//   else{
//   res.setHeader('Content-Type','text/html');
//   res.end('<form method="POST"><input type="text" name="username"><button>Create users</button></form>');
//   }
// });

// server.listen(5000);

//---------------------------------------------------------------------------------

// const fs= require('fs'); //new APIs.
//  const userName='Max';
// //  console.log(userName);
// //   alert(userName);//cant use it

//  fs.writeFile('user-data.txt','Name'+ userName,(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('WROTE-FILE');
//  });