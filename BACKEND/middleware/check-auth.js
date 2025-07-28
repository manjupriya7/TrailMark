
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};



































// const jwt = require('jsonwebtoken');//to generate token and also to verify token

// const HttpError = require('../models/http-error');

// module.exports = (req, res, next) => {
//     if(req.method==='OPTIONS'){
//         return next();
//     }
//     try {
//         const token = req.headers.autherization.split('')[1]; //Autherization 'Bearer Token'
//         if (!token) {
//             throw new Error('Autherization failed');
//         }
//         const decodedToken = jwt.verify(token, 'supersecret_dont_share');
//         req.userData={userId:decodedToken.userId};
//         next();
//     } catch (err) {
//         const error = new HttpError('Autherization Error', 404);
//         return next(error);
//     }
// }