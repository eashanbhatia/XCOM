const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    google_accessToken: String,
    google_img: String,
    google_id: String,
    likedPosts: {
        type: Map,
        of: Boolean,
        default:{}
    }
});

module.exports = mongoose.model('hackUsers', userSchema);  //Collection name "hackUsers" mein jaakr save hoga data