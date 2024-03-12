const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    google_accessToken: String,
    google_id: String,
    google_img: {
        type:String,
        default:'https://www.pngkey.com/png/full/202-2024792_profile-icon-png.png'            
    },
    likedPosts: {
        type: Map,
        of: Boolean,
        default:{}
    }
});

module.exports = mongoose.model('hackUsers', userSchema);  //Collection name "hackUsers" mein jaakr save hoga data