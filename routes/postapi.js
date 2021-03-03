import express from 'express';
import Posts from '../models/post.js'

const router = express.Router()



router.post('/upload/post',(req,res) =>{
    const dbPost = req.body

    console.log(dbPost)
    Posts.create(dbPost, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})

router.get('/retrive/posts',(req,res) => {
    Posts.find((err,data) => {
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
router.put('/comments',(req,res) =>{
 
    const comment = {
        text:req.body.text,
        PostedBy:req.body._id
    }
    Posts.findByIdAndUpdate(req.body.postId,
        {
        $push:{comments:comment}
        },{
        new:true,returnOriginal:false
    })
    .populate("comments.PostedBy","_id name")
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

router.get ('/retrive/images/single', (req, res) =>{
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
export default router;