const mongoose=require('mongoose')
const {Schema}=mongoose

const postSchema= new Schema({
    username:{
        type: Schema.ObjectId,
        required: true,
        ref: 'hackUsers'
    },
    image:{
        type: String
    },
    tweet:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:[ ],
    saved:[ ],
    comments:[ ],
    location:{
        type: String
    },
    totallikes:{
        type: Number,
        default: 0
    },
    totalsaved:{
        type: Number,
        default: 0
    },
    totalcomments:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('hackPosts',postSchema);