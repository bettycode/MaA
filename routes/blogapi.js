import express from 'express';
//import blogController from '../controllers/blogcontroller.js';
import Blog from '../models/blog.js'

const router = express.Router()





//blog api

router.get("/blog/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get('/blog',(req,res) =>{
    Blog.find((err,data) => {
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
//
router.post('/blog',(req,res) =>{
    const dbPost = req.body

    console.log(dbPost)
    Blog.create(dbPost, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})
//
router.get('/blog/:id',(req,res) =>{
    const dbPost = req.params._id

    console.log(dbPost)
    Blog.findById(dbPost, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})
//
//
router.put('/blog/:id',(req,res) =>{
    const dbPost = req.body

    console.log(dbPost)
    Blog.findOneAndUpdate({ _id: req.params.id },dbPost, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})
//
//
router.delete('/blog/:id',(req,res) =>{
  
    Blog.findById({ _id: req.params.id }, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})
// //
export default router;