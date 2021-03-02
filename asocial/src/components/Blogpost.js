import React, { useState, useEffect }  from 'react'
import './Blog.css'
import axios from '../axios'
import { useStateValue } from "./StateProvider";
import Pblog from './Pblog'
import pic0 from '../Image/pic0.gif'
import {Link } from 'react-router-dom';
import LI from '../Image/LI.jpg'


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
                        <div className="jumbotron jumbotron-fluid " style={{textAlign: "center", marginTop: "1rem"}}>
                            <div className="container  blogp">
                                <h2>Welcome {user.displayName}</h2>
                            </div>
                          
                        </div>
                        
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-md-3">
                        {/* <div className="card p-3">
                           <p>title goes here</p>
                           <img src={LI} alt="nature" style={{height:"500px"}}></img>
                        </div> */}
                        <div className="card p-3" >
                        <img src={LI} alt="nature" style={{height:"500px"}}></img>
                        <div className="card-img-overlay">
                        <p style={{marginTop:"8rem",paddingLeft: "8px",paddingRight: "8px",fontFamily: "Niconne",fontSize: "larger"}}>
                          Your limitation—it’s only your imagination.<br/><br/>
                          The harder you work for something, the greater you’ll feel when you achieve it.<br/><br/>
                          Sometimes we’re tested not to show our weaknesses, but to discover our strengths.
                          </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-9" style={{margin:"3rem 0"}} >
                          
                        {!blogs.length ? (
                        <img src={pic0} alt="loading..."style={{width:"6rem",display:"block",margin:"0 auto"}}/>
                        ):(
                        blogs.map((blog)=> (
                            <Pblog 
                            
                         key={blog._id}
                         postId={blog._id}
                        title={blog.title}
                        description={blog.description}
                        article ={blog.article}
                        country={blog.country}
                        author={blog.author}
                        timestamp={blog.date}
                         
                            />  
                            
                        )      
                        ))}
                        
                           
                    </div>

                </div>
                

                
            </div>
        
      
        </div>
    )
}

export default Blogpost
