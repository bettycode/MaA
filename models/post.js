import mongoose from 'mongoose'
const {ObjectId} =  mongoose.Schema.Types;
const post = mongoose.Schema({
    user:String,
    imgName:String,
    text:String,
    comments:[
        {
            Text:String,
            postId:{
                type:ObjectId,
            }
            
        },
    ],
    avatar:String,
    timestamp:String,
    country:String
})

export default mongoose.model('posts',post)