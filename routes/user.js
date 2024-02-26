const path = require('path');
const express = require('express');
const router = express.Router();
const Controller = require('../controller/user');
const multer  = require('multer')
const Passport = require('../passport/passport')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        // console.log("File ", file);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
})


const upload = multer({ storage: storage })

router.get('/',Controller.getIndex);

router.get('/profile',Controller.getProfile);

router.get('/logout',Controller.getLogOut);

router.get('/signup',Controller.getSignUp);

router.post('/signup',Controller.postSignUp);

router.post('/addtweet',upload.single('image'),Controller.postAddTweet);

router.post('/signin',Passport.authenticate('local', { failureRedirect: '/signup' }),Controller.postSignIn);

router.get('/homepage',Controller.getHomePage);

router.get('/feed', Controller.getFeed);

router.get('/addtweet', Controller.getAddTweet);

router.post('/addLike', Controller.addLike);

router.post('/addComment', Controller.addComment);

router.post('/addSave', Controller.addSave);

router.get('/getLike',Controller.getLike)

module.exports = router;