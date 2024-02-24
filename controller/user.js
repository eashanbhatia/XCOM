const mongoose = require('mongoose')
const isLoggedIn = require('../middleware/isLoggedIn')
const hackUsers = require('../model/user')
const hackPosts = require('../model/post')
const bcrypt = require('bcrypt')
const Passport = require('../passport/passport');
const cloudinary = require('cloudinary').v2
const path = require('path');



cloudinary.config({
    cloud_name: 'ddlly0w8c',
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});
hackUsers

module.exports.getIndex = (req, res, next) => {
    if (req.user) return res.redirect('profile')
    res.render('index', {
        isLoggedIn: req.user ? true : false
    });
}

module.exports.getProfile = (req, res, next) => {
    if (!req.user) return res.redirect('/');
    res.render('profile', {
        user: req.user,
        isLoggedIn: req.user ? true : false
    });
}

module.exports.getLogOut = (req, res, next) => {
    req.logout(() => {
        res.redirect('/')
    })
}

module.exports.getSignUp = (req, res, next) => {
    res.render('signup')
}

module.exports.postSignUp = async (req, res, next) => {
    const { username, password } = req.body;//params ya queryparameter m dete h toh req.query use hoti
    try {
        let user = await hackUsers.findOne({ username });

        if (!user) {
            let saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    hackUsers.create({ username, password: hash })
                });
            });
            res.redirect('/profile')

        }
        else {
            res.render('signup', {
                msg: 'user already present',
                username,
                password
            })
        }
    }
    catch (err) {
        res.render('signup', {
            msg: err.message
        })

    }
}


module.exports.postSignIn = (req, res, next) => {
    // console.log(req)    
    res.redirect('/homepage');

}

module.exports.getHomePage = (req, res, next) => {
    res.render('homepage')
}


module.exports.postAddTweet = async (req, res, next) => {
    const { tweet } = req.body;
    const image = req.file;
    if (!image) {
        try {
            let newPost = await hackPosts.create({
                username: req.user._id,
                tweet: tweet
            });

            return res.redirect('/feed');
        } catch (err) {
            console.log(err);
            // Handle the error appropriately
        }
    }
    else {
        try {
            const imagePath = path.join('uploads', req.file.filename);
            cloudinary.uploader.upload(imagePath, async (error, result) => {

                if (error) return next(error);
                console.log(result);
                let newPost = await hackPosts.create({
                    username: req.user._id,
                    image: result.url,
                    tweet: tweet
                });
                return res.redirect('/feed');
            });

        }
        catch (err) {
            console.log(err);
        }

    }

}


module.exports.getFeed = async (req, res, next) => {
    let allPosts = await hackPosts.find({}).populate('username');
    // console.log(allPosts);
    res.render('feed', { allPosts });
}

module.exports.getAddTweet = (req, res, next) => {
    res.render('addtweet')
}


module.exports.addLike = async (req, res, next) => {
    // console.log(req.body)
    let { postId } = req.body;
    let userId = req.user;
    // console.log(postId)
    console.log("userId", userId._id.toString())
    let Post = await hackPosts.findOne({ _id: postId });
    // console.log(Post.likes);
    // console.log(Post.likes[0]._id.toString()==userId)
    let likedUsers = Post.likes.find(element => element._id.toString() === userId._id.toString());
    // let likedUsers = await hackPosts.find({ _id:postId });
    // console.log(Post);
    console.log("likedUsers:", likedUsers);
    if (!likedUsers) {
        Post.likes.push(userId);
        Post.totallikes++;
        // console.log(Post)
        Post.save();
        res.json({ data: 'done' })
        console.log("badha dia");
        console.log(Post);
    }
    else {
        Post.likes = Post.likes.filter(element => element._id.toString() !== userId._id.toString());
        Post.totallikes--;
        Post.save();
        console.log("ghata dia");
        console.log(Post);
    }
    // console.log(likedUsers);
    // console.log(Post)
    // console.log(Post.likes)
}


module.exports.addComment = async (req, res, next) => {
    console.log(req.body)
    let { postId } = req.body;
    let userId = req.user;
    let Post = await hackPosts.findOne({ _id: postId });
    console.log(Post)
}

module.exports.addSave = async (req, res, next) => {
    // console.log(req.body)
    let { postId } = req.body;
    let userId = req.user;
    // console.log(postId)
    // console.log("userId", userId._id.toString())
    let Post = await hackPosts.findOne({ _id: postId });
    // console.log(Post.likes);
    // console.log(Post.likes[0]._id.toString()==userId)
    let likedUsers = Post.likes.find(element => element._id.toString() === userId._id.toString());
    // let likedUsers = await hackPosts.find({ _id:postId });
    // console.log(Post);
    console.log("likedUsers:", likedUsers);
    if (!likedUsers) {
        Post.likes.push(userId);
        Post.totallikes++;
        // console.log(Post)
        Post.save();
        res.json({ data: 'done' })
        console.log("badha dia");
        console.log(Post);
    }
    else {
        Post.likes = Post.likes.filter(element => element._id.toString() !== userId._id.toString());
        Post.totallikes--;
        Post.save();
        console.log("ghata dia");
        console.log(Post);
    }
}