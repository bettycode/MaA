import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import pusher from 'pusher'
import { promises } from 'fs'
import mongoPost from './models/post.js'
import { error } from 'console'

//storage
Grid.mongo = mongoose.mongo

//app comfig
const app = express()
const PORT = process.env.PORT ||8000

// middlewheres
app.use(bodyParser.json());
app.use(cors())

//db config
const mongoURI = 'mongodb+srv://user-me:J66oj7xT4Ghqr4jS@cluster0.wi8fg.mongodb.net/Asocial?retryWrites=true&w=majority';
// connection for the images
const connect1 = mongoose.createConnection(mongoURI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

let gfs  

connect1.once('open',() => {
    console.log('DB Connected')

    gfs = Grid(connect1.db,mongoose.mongo)
    gfs.collection('images')
});

const storage = new GridFsStorage({
    url:mongoURI,
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

const upload = multer({storage});

//connection for post
mongoose.connect(mongoURI,{
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
    mongoPosts.creat(dbPost,(err,data) =>{
        if(err){
            res.status(500)
            .send(err)
        }else {
            res.status(201)
            .send(data)
        }
    })
})

app.get('/retrive/posts',(req,res) => {
    mongoPost.find((err,data) => {
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