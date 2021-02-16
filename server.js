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
    appId: "1156581",
    key: "abe1e56f83b980b40655",
    secret: "7da250470429fe45b681",
    cluster: "us2",
    useTLS: true
  });

// middlewheres
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//db config
const MONGODB_URI = ""

// connection for the images
const connect1 = mongoose.createConnection(MONGODB_URI ,{
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
      } else {
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
    url:MONGODB_URI ,
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
mongoose.connect(MONGODB_URI,{
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

//listen port 
app.listen(PORT,() =>console.log(`listening on localhost:${PORT}`))