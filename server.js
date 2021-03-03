import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'


// blog routs
import blogapi from './routes/blogapi.js'
import postapi from './routes/postapi.js'


//storage our image
Grid.mongo = mongoose.mongo

//app comfig
const app = express()
const PORT = process.env.PORT ||8000

//pusher keys
const pusher = new Pusher({
    appId:process.env.PUSHER_APP_ID,
    key:process.env.PUSHER_APP_KEY,
    secret:process.env.PUSHER_APP_SECRET,
    cluster:process.env.PUSHER_APP_CLUSTER,
    useTLS:process.env.PUSHER_APP_USETLS
  });
 
  
  
 
 
// middlewheres
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
//
if (process.env.NODE_ENV === "production") {

    app.use(express.static("asocial/build"));

}
//db config

// connection for the images
const connect1 = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/posts",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});
// triggering change in post 
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
//storage
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

//connection for blog
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blogs",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//api routs

//post api
 app.post('/upload/image',upload.single('file'), (req,res) =>{
     res.status(201).send(req.file)
 });
//post api
app.use("/upload/post",postapi)
app.use("/retrive/posts",postapi)
app.use("/comments",postapi)
app.use("/retrive/images/single",postapi)
//
//blog api
app.use("/blog",blogapi)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'./asocial/build/index.html'));
 });
 
//listen port 
app.listen(PORT,() =>console.log(`listening on localhost:${PORT}`))
