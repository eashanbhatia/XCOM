const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
const hbs = require('hbs');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

require('dotenv').config();


app.use(require('express-session')(
    {
        secret: 'nice',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
        //Isse jo sessions honge vo mongo ke server pr jaakr store honge instead of local pc
    }
));


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));


const passport = require('passport');
require('./passport/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/user'));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to profile.
    res.redirect('/profile');
  });

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    });
})
    .catch(err => {
        console.log(err);
    })