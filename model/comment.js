const mongoose=require('mongoose')
const {Schema}=mongoose

const commentSchema= new Schema({
    user_id:{
        type: Schema.ObjectId,
        required: true,
        ref: 'hackUsers'
    },
    post_id:{
        type: Schema.ObjectId,
        required: true,
        ref: 'hackPosts'
    },
    comments: String,
},{timestamps: true});

module.exports = mongoose.model('hackComments',commentSchema);