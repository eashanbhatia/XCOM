const mongoose=require('mongoose')
const {Schema}=mongoose

const commentSchema= new Schema({
    user_id:{
        type: Schema.ObjectId,
        required: true,
        ref: 'hackUsers'
    },
})

module.exports = mongoose.model