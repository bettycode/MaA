import dotenv from "dotenv"
dotenv.config()
console.log(process.env.MONGODB_URI)
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'
import { promises } from 'fs'
import mongoPosts from './models/post.js'



//storage our image
Grid.mongo = mongoose.mongo

//app comfig
const app = express()
const PORT = process.env.PORT ||8000

const pusher = new Pusher({
    // appId: "1156581",
    // key: "abe1e56f83b980b40655",
    // secret: "7da250470429fe45b681",
    // cluster: "us2",
    // useTLS: true
    appId:process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: process.env.PUSHER_APP_USETLS
  });
 
  
  
 
 
// middlewheres
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
//

//db config
//const MONGODB_URI = 'mongodb+srv://user-me:J66oj7xT4Ghqr4jS@cluster0.wi8fg.mongodb.net/Asocial?retryWrites=true&w=majority' //fix heroku!!!!!!

// connection for the images
const connect1 = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/posts",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.once("open", () => {
    console.log("main: DB Connected");
  
    const changeStream = mongoose.connection.collection("posts").watch();
  
    changeStream.on("change", (change) => {
      console.log(change);
  
      if (change.operationType === "insert") {
        console.log("Triggering Pusher")
  
        pusher.trigger("posts", "inserted", {
          change: change
        });
      } else if(change.operationType === "update") {
          console.log( "this is the comment" , change.updateDescription.updatedFields.comments)
        pusher.trigger("posts", "inserted", {
            change: change.updateDescription.updatedFields.comments
          });
      }
      else {
        console.log("Error triggering Pusher");
      }
    });
  });
 


let gfs  

connect1.once('open',() => {
    console.log('DB Connected')

    gfs = Grid(connect1.db,mongoose.mongo)
    gfs.collection('images')
});

const storage = new GridFsStorage({
    url:process.env.MONGODB_URI ,
    file:(req,file) => {
        return new Promise((resolve,reject)=>{
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo ={
                filename:filename,
                bucketName:'images'
            };
            resolve(fileInfo);
        })
    }
})

//upload instance

const upload = multer({ storage });

//connection for post
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/posts",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//api routs
app.get('/',(req,res) => res.status(200).send("hello hello"));

app.post('/upload/image',upload.single('file'), (req,res) =>{
    res.status(201).send(req.file)
});

app.post('/upload/post',(req,res) =>{
    const dbPost = req.body

    console.log(dbPost)
    mongoPosts.create(dbPost, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})

app.get('/retrive/posts',(req,res) => {
    mongoPosts.find((err,data) => {
       if(err) {
        res.status(500)
        .send(err)
       }else{
           data.sort((b,a) =>{
               return a.timestamp - b.timestamp;
           })
           res.status(200)
           .send(data)
       }
    })
})
//comment
app.put('/comments',(req,res) =>{
    //console.dir( req.body)
    const comment = {
        text:req.body.text,
        PostedBy:req.body._id

    }
    //console.log("the is the comment" + comment.text)
    mongoPosts.findByIdAndUpdate(req.body.postId,
        {
        $push:{comments:comment}
        },{
        new:true,returnOriginal:false
    })
    .populate("comments.PostedBy","_id name")
    //.populate("comments.Text","comments")
    .populate("PostedBy","_id name")
    .exec((err,post)=>{
        console.log(post)
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json({
                key:post._id,
                postId:post._id,
                PostedBy:post.PostedBy,
                postUserId:post.uid,
                message:post.text,                              
                comments:post.comments,
                timestamp:post.timestamp,
                username:post.user,
                imgName:post.imgName,
                profilePic:post.avatar
            })
        }
    })
})

//filter

app.get ('/retrive/images/single', (req, res) =>{
    gfs.files.findOne({filename:req.query.name},(err,file) =>{
        if(err) {
            res.status(500)
            .send(err)
        }else {
            if(!file || file.length === 0) {
                res.status(404).json({err:'file not found'})
            }else {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        }
    })
})
//
if (process.env.NODE_ENV === "production") {

    app.use(express.static("asocial/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'asocial','build', 'index.html'));
     });
}

 
//listen port 
app.listen(PORT,() =>console.log(`listening on localhost:${PORT}`))
