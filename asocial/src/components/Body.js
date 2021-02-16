import React, { useState,useEffect } from 'react'
import './Body.css'
import Avatar from '@material-ui/core/Avatar'
import MessageSend from './MessageSend';
import Post from './Post';
import Pusher from 'pusher-js'
import axios from '../axios'
import db from '../firebase'
import { useStateValue } from "./StateProvider";

const pusher = new Pusher('abe1e56f83b980b40655', {
    cluster: 'us2'
  });

function Body() {
    const [profilePic, setProfilePic] = useState('')
    const [{user},dispatch] = useStateValue()
    const [postData, setPostData] = useState([])

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
        });
    },[])

    useEffect(() => {
        syncBody()
    },[])
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-4" style={{width:"200px", 
                    height:"200px"}}>
                        {/* avatar place */}
                        <div className="container avatarc">
                            
                            <Avatar  src={user.photoURL} className="acatar" style={{width:"100px",height:"100px",marginTop:"1.5rem",marginLeft:"10px"}}/>
                            <h4>{user.displayName}</h4>
                        </div>
                </div>
                <div className="col-md-8">
                        <div className= "row">
                           <MessageSend />
                        </div>
                        <div className="row">
                            <div className="col-md-8 post__box">

                            {postData.map((post) => (
                                <Post
                                key={post._id}
                                message={post.text}
                                timestamp={post.timestamp}
                                username={post.user}
                                imgName={post.imgName}
                                profilePic={post.avatar}
                                />
                            ))}
                            
                        
                            </div>
                           
                        </div>
                       
                </div>
            
               
            </div>
           
            
        </div>
    )
}

export default Body
