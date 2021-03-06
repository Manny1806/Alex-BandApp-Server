'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const { router: usersRouter } = require('./routes/users');
const { jwtStrategy } = require('./auth/strategies');
const { localStrategy } = require('./auth/strategies');

const authRouter = require('./routes/auth')
const postRouter = require('./routes/posts');
const eventRouter = require('./routes/events');
const bandRouter = require('./routes/bands')
const locationRouter = require('./routes/locations')

mongoose.Promise = global.Promise;

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.send(204);
//   }
//   next();
// });

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
)

passport.use( localStrategy)
passport.use( jwtStrategy);


app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter.router);
app.use('/api/bands', bandRouter)
app.use('/api/locations', locationRouter)

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
