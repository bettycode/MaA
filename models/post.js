import mongoose from 'mongoose'

const post = mongoose.Schema({
    user:String,
    imgName:String,
    text:String,
    avatar:String,
    timestamp:String
})

export default mongoose.model('posts',post)