import React, { useState, useEffect }  from 'react'
import axios from '../axios'
import { useStateValue } from "./StateProvider";
import Pblog from './Pblog'

function Blogpost() {
    const [{user},dispatch] = useStateValue()
    const [blogs, setBlogs] = useState([])
   

//   const syncBlog  =()=>{
//       axios.get('/blog')
//       .then((res) => {
//        console.log(res.data)
//        setBlogs(res.data)
//        console.log(res.data)
      
//    })
//   }
 useEffect(()=> {
 // syncBlog ()
 // console.log( syncBlog ())
    axios.get('/blog')
    .then((res) => {
    console.log(res.data)
    setBlogs(res.data)
    console.log(res.data)
    
    })
 },[])
      
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12" >
                        <div class="jumbotron jumbotron-fluid" style={{textAlign: "center", marginTop: "1rem"}}>
                            <div class="container">
                                <h4>welcome {user.displayName}</h4>
                                <p>comming soon</p>
                            </div>
                        </div>
                        
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div class="card p-3">
                           <p>title goes here</p>
                        </div>
                    </div>
                    <div className="col-md-9">
                          
                        {blogs.map((blog)=> (
                            <Pblog 
                        // key={blog._id}
                        // postId={blog._id}
                        // postUserId={blog.uid}
                        title={blog.title}
                        article ={blog.article}
                        country={blog.country}
                        author={blog.author}
                        // username={blog.user}
                        // imgName={blog.imgName}
                        // profilePic={blog.avatar}
                            />        
                        ))}
                      
                           
                    </div>

                </div>
                

                
            </div>
        
      
        </div>
    )
}

export default Blogpost
