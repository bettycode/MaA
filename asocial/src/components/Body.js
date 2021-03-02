import React, { useState,useEffect } from 'react'
import './Body.css'
import Avatar from '@material-ui/core/Avatar'
import MessageSend from './MessageSend';
import Post from './Post';
import Pusher from 'pusher-js'
import axios from '../axios'
import db from '../firebase'
import { useStateValue } from "./StateProvider";
import Widget from './Widget';
import {Link } from 'react-router-dom';
import BookIcon from '@material-ui/icons/Book';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';



const pusher = new Pusher('abe1e56f83b980b40655', {
    cluster: 'us2'
  });

function Body() {
    // const [profilePic, setProfilePic] = useState('')
    const [{user},dispatch] = useStateValue()
    const [postData, setPostData] = useState([])
    // const [postComments,setPostComments]=useState([])
  
  

const syncBody = () =>{
        axios.get('/retrive/posts')
            .then((res) => {
                console.log(res.data)
                setPostData(res.data)
                console.log(res.data)
               
            })
           
    }
    
  

    useEffect(() => {
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function(data) {
            syncBody()
            console.log(syncBody())
          
        });
    },[])

    useEffect(() => {
        syncBody()
        console.log(syncBody())
    },[])
    return (
        <>
        <div className="container-fluid " style={{background:"rgb(128 128 128 / 6%)", minHeight: "100%", paddingBottom: "100px"}}>
            <div className="row">
                <div className="col-md-3" style={{width:"200px", 
                    height:"200px"}}>
                        {/* avatar place */}
                        <div className="container avatarc">
                            
                            <Avatar  src={user.photoURL} className="acatar" style={{width:"100px",height:"100px",marginTop:"1.5rem",marginLeft:"10px"}}/>
                            <h4>{user.displayName}</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-8 aside" style={{color:"black",fontWeight:"500"}}>
                               
                                <LibraryAddIcon />
                       
                            <Link 
                                to="/AddBlog"
                                className={ window.location.pathname === "/HOME" ? "nav-link active aside1" :"nav-link"  } style={{color:"black",fontWeight:"500", transform:" translate(20px, -30px)"}} >
                                    Add Blog 
                            </Link>
                            <BookIcon />
                            <Link 
                                to="/BLOG"
                                className={ window.location.pathname === "/HOME" ? "nav-link active aside1" :"nav-link"  } style={{color:"black",fontWeight:"500", transform:" translate(20px, -30px)"}} >
                                    Blogs 
                            </Link>
                            <PeopleIcon />
                            <p className="asideLinks" style={{ transform:" translate(20px, -24px)"}}>community</p>
                            <InfoIcon />
                            <p className="asideLinks"  style={{ transform:" translate(20px, -24px)"}} >About</p>
                            {/* <p className="asideLinks">Blogs</p> */}
                            </div>
                         </div>
                </div>
                <div className="col-md-5">
                        <div className= "row">
                           <MessageSend />
                        </div> 
                        <div className="row">
                      
                            {postData.map((post) => (
                                <Post
                                key={post._id}
                                postId={post._id}
                                postUserId={post.uid}
                                message={post.text}                               
                                comments={post.comments}
                                timestamp={post.timestamp}
                                username={post.user}
                                imgName={post.imgName}
                                profilePic={post.avatar}
                              
                                />
                            ))}
                           
                        </div>
                       
                </div>
                <div className="col-md-3">
                            <Widget />

                        </div>
            
               
            </div>
           
           

        </div>
       
        </>
    )
}

export default Body
