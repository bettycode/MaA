import mongoose from 'mongoose'
const {ObjectId} =  mongoose.Schema.Types;
const post = mongoose.Schema({
    user:String,
    imgName:String,
    text:String,
    comments:[
        {
            text:String,
            PostedBy:{
                type:ObjectId,
            }
            
        },
    ],
    
    avatar:String,
    timestamp:String,
    country:String,
    PostedBy:{
        type:ObjectId,
    }
})

export default mongoose.model('posts',post)