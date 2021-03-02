import mongoose from 'mongoose'
const {ObjectId} =  mongoose.Schema.Types;
const blog = mongoose.Schema({
  PostedBy:{
        type:ObjectId,
      
    },  
  title: { 
      type: String, 
     
    },
  description: { 
      type: String,
      
    },
  country: { 
      type: String,
      
    },
  author: { 
      type: String,
      
    },
  article: String,
  date: { 
      type: Date, 
      default: Date.now 
    },
  imgName:String,
  avatar:String,
  timestamp:String,
});

export default  mongoose.model("blogs", blog);

