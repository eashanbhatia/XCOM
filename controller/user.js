const mongoose = require('mongoose')
const isLoggedIn = require('../middleware/isLoggedIn')
const hackUsers = require('../model/user')
const hackPosts = require('../model/post')
const hackComments = require('../model/comment')
const bcrypt = require('bcrypt')
const Passport = require('../passport/passport');
const cloudinary = require('cloudinary').v2
const path = require('path');
const { listeners } = require('process')



cloudinary.config({
    cloud_name: 'ddlly0w8c',
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});
hackUsers

module.exports.getIndex = (req, res, next) => {
    if (req.user) return res.redirect('/homepage')
    res.render('index', {
        isLoggedIn: req.user ? true : false
    });
}

module.exports.getProfile = async (req, res, next) => {
    if (!req.user) return res.redirect('/');
    let user = req.user;
    // console.log(user);
    let userPosts = await hackPosts.find({username:user._id}).populate('username');   //filter lgaya hai ye mongoose ka
    console.log("userposts:",userPosts)
    // let newPost = await hackPosts.find({}).populate('username');
    // console.log(newPost)
    // let userPosts =  $filter:
    // const query = hackPosts.find({ username: 'user._id' });
    // // console.log(query);
    // query.getFilter();
    // let profilePost= await hackPosts.find().populate('user');
        

    

    res.render('profile', {
        user: req.user,
        isLoggedIn: req.user ? true : false,
        userPosts
    });
}

// {
//     if (!req.user) {
//       res.redirect("/login");
//     } else {
//       let photoes = await photo.find().populate('user');
//       res.render("home", {
//         photoes,
//       });
//     }
//   };

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


module.exports.getHomePage = async (req, res, next) => {
    let userdetails = req.user;
    // console.log("userdetails:",userdetails)
    // console.log(userdetails.likedPosts)
    let allPosts = await hackPosts.find({}).populate('username');
    let allComments = await hackComments.find({});
    console.log("allComments",allComments)
    // console.log(allPosts)
    // console.log(userdetails._id)
    // let newPost = await hackPosts.find({}).populate('username');
    // let allPosts = newPost.map((post)=> {
    //     post  = post.toObject()
    //     let temp = post.likes.filter((v)=>{
    //         console.log(v._id, userdetails._id)
    //         if(v._id.equals(userdetails._id)){
    //             return true ;
    //         }
    //         else{
    //             return false;
    //         }
    //     })
    //     console.log(temp)
    //     if(temp && temp.length > 0)
    //     {
    //         return {...post,hasLiked:true}
    //     }
    //     else{
    //         return {...post,hasLiked:false}
    //     }
    // })
    // console.log(allPosts)
    // res.render('homepage',{ allPosts, userdetails })
    res.render('homepage',{allPosts,userdetails,allComments})
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

            return res.redirect('/homepage');
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
                return res.redirect('/homepage');
            });

        }
        catch (err) {
            console.log(err);
        }

    }

}


module.exports.getFeed = async (req, res, next) => {

    let userdetails = req.user;
    // console.log(userdetails._id)
    let newPost = await hackPosts.find({}).populate('username');
    let allPosts = newPost.map((post)=> {
        post  = post.toObject()
        let temp = post.likes.filter((v)=>{
            console.log(v._id, userdetails._id)
            if(v._id.equals(userdetails._id)){
                return true ;
            }
            else{
                return false;
            }
        })
        console.log(temp)
        if(temp && temp.length > 0)
        {
            return {...post,hasLiked:true}
        }
        else{
            return {...post,hasLiked:false}
        }
    })
    console.log(allPosts)
    res.render('feed', { allPosts, userdetails });
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
        Post.save();
        // user.socialMediaHandles.set('github', 'vkarpov15');
        // hackUsers.likedPosts.set('postId','true');
        // hackUsers.save();
        // console.log(Post)
        let user = await hackUsers.findById(userId._id);
        user.likedPosts.set(postId, true);
        user.save();
        res.json({ data: 'inc' });
        // let allPosts = await hackPosts.find({}).populate('username');

        // console.log(allPosts);
 
        console.log("badha dia");
        console.log(Post);
    }
    else {
        Post.likes = Post.likes.filter(element => element._id.toString() !== userId._id.toString()); 
        // Post.likes.pull(userId)
        Post.totallikes--;
        Post.save();

        let user = await hackUsers.findById(userId._id);
        user.likedPosts.delete(postId);
        user.save();

        console.log("ghata dia");
        console.log(Post);
        res.json({ data: 'dec' });
    }

}


module.exports.addComment = async (req, res, next) => {
    console.log(req.body)
    let {comment,postID} = req.body;
    let user= req.user;
    let Post = await hackPosts.findOne({ _id: postID });
    // console.log(Post)

    let newComment = await hackComments.create({
        post_id: postID,
        user_id: user,
        comments:comment
    })
    console.log(newComment)
    // Post.comments.push(comment);
    Post.totalcomments++;
    Post.save();
    console.log(Post)
    res.redirect('/homepage')
    // console.log(comment);

    // let { postId } = req.body;
    // let userId = req.user;
    // console.log(Post)

}

// module.exports.addSave = async (req, res, next) => {
//     // console.log(req.body)
//     let { postId } = req.body;
//     let userId = req.user;
//     // console.log(postId)
//     // console.log("userId", userId._id.toString())
//     let Post = await hackPosts.findOne({ _id: postId });
//     // console.log(Post.likes);
//     // console.log(Post.likes[0]._id.toString()==userId)
//     let likedUsers = Post.likes.find(element => element._id.toString() === userId._id.toString());
//     // let likedUsers = await hackPosts.find({ _id:postId });
//     // console.log(Post);
//     console.log("likedUsers:", likedUsers);
//     if (!likedUsers) {
//         Post.likes.push(userId);
//         Post.totallikes++;
//         // console.log(Post)
//         Post.save();
//         res.json({ data: 'done' })
//         console.log("badha dia");
//         console.log(Post);
//     }
//     else {
//         Post.likes = Post.likes.filter(element => element._id.toString() !== userId._id.toString());
//         Post.totallikes--;
//         Post.save();
//         console.log("ghata dia");
//         console.log(Post);
//     }
// }

module.exports.addSave = async (req, res, next) => {
    // console.log(req.body)
    let { postId } = req.body;
    let userId = req.user;

    let Post = await hackPosts.findOne({ _id: postId });
    console.log(Post);
    let savedUsers = Post.saved.find(element => element._id.toString() === userId._id.toString());
    // let likedUsers = await hackPosts.find({ _id:postId });
    // console.log(Post);
    // console.log("likedUsers:", likedUsers);
    if (!savedUsers) {
        Post.saved.push(userId);
        console.log(Post);
        Post.totalsaved++;
        // console.log(Post)
        Post.save();
        res.json({ data: 'inc' });  
        console.log("badha dia");
        console.log(Post);
    }
    else {
        // Post.likes = Post.likes.filter(element => element._id.toString() !== userId._id.toString()); very jainwin logic
        Post.saved.pull(userId)
        Post.totalsaved--;
        Post.save();
        console.log("ghata dia");
        console.log(Post);
        res.json({ data: 'dec' });
    }
    // console.log(likedUsers);
    // console.log(Post)
    // console.log(Post.likes)
}

// module.exports.getLike = async (req,res,next)=>{
//     let Post = await hackPosts.findOne({ _id: postId });
//     let likes = Post.totallikes;
//     res.send(likes);
    
// }





module.exports.getTrending = async (req,res,next) =>{
    let trendingPosts = await hackPosts.find().sort({totallikes:-1}).populate('username');
    let user = req.user;
    res.render('trending',{trendingPosts,user})
}

module.exports.deleteTweet = async (req,res,next) =>{
    let {pid} = req.query;
    console.log(pid)
    let tweetDel = await hackPosts.findOne({_id:pid});
    await tweetDel.deleteOne();

    return res.redirect('/profile')

}

module.exports.getPayment = (req,res,next) => {
    res.render('payment')
}

module.exports.getPostComment = async (req,res,next) => {
    let {pid} = req.query;
    console.log("controller ki id:",pid);
    let postComments = await hackComments.find({post_id:pid}).populate('user_id');
    console.log("ye rhi:",postComments);
    return res.render('comments',{postComments,pid})
    

}