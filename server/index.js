const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db');
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db });
module.exports = app;

if (process.env.NODE_ENV === 'test') {
    after('close the session store', () => sessionStore.stopExpiringSessions())
}
  
// passport registration
passport.serializeUser((user, done) => done(null, user.id))
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.models.user.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
})
  
const createApp = () => {
    // logging middleware
    app.use(morgan('dev'))
  
    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
  
    // session middleware with passport
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'my best friend is Cody',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
      })
    )
    app.use(passport.initialize())
    app.use(passport.session())
  
    // auth and api routes
    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'))
  
    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '../public')));
  
    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
      if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
      } else {
        next()
      }
    })
  
    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    })
  
    // error handling endware
    app.use((err, req, res, next) => {
      console.error(err)
      console.error(err.stack)
      res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
  }
  
  const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`)
    )  
}
  
const syncDb = () => db.sync()
  
async function bootApp() {
    await sessionStore.sync()
    await syncDb()
    await createApp()
    await startListening()
}
  
if (require.main === module) {
    bootApp()
  } else {
    createApp()
}