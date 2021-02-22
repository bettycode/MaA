import React,{useState} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'
import axios from '../axios';
import { useStateValue } from "./StateProvider";

function Post({profilePic,imgName, username, timestamp, message,postId,key,comments}) {
    const [{user},dispatch] = useStateValue()
    // const [input ,setInput] = useState('')
    const [comment,setComment] = useState([])

    const postcomments =(e) =>{
        e.preventDefault()
        console.log('submitting')
            const postData  = {
                id:postId,
                avatar:user.photoURL,
                comment:comment
              }
            console.log(postData)
            saveComment(postData)
        
        
        setComment('')
     
    }
    const saveComment = async(postData) => {
        await axios.post('/comments', postData)
        .then((res) =>{
            console.log(res.data)
            setComment(res.data)
            console.log(res.data)
           
        })
    }
    return (
        <div className="col-md-8 post__box">
           
                {/* <div className="row"> */}
                    <div className="post__top">
                    <Avatar src={profilePic} className='post__avatar' />
                        <div className="post__topInfo">
                            <h3>{username}</h3>
                            <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
                        </div>
                    </div>
                    <div className="post__bottom">
                         <p>{message}</p>
                    </div>
                {/* </div>     */}
                    {
                        imgName ? (
                            <div className=" imgName">
                                <img src= {`http://localhost:8000/retrive/images/single?name=${imgName}` } alt=''/>
                            </div>
                        ) : (
                                console.log('ERROR >>>>IMAGE NOT FOUND')
                           )
                    }




                <div className="row post__options"> 
                    <div className="col-md-4 post__option">
                        <ThumbUpIcon />
                        <p>Like</p>
                    </div>    
                        <div className="col-md-4 post__option">
                            <ChatBubbleOutlineIcon />
                            <p>Comment</p>
                        </div>
                        <div className="col-md-4 post__option">
                            <NearMeIcon />
                            <p>Share</p>
                        </div>
                           
                </div>      
                {/*  */}
                <div className="row">
                <div className="col-md-2">
                    <div className="m__top">
                        <Avatar  src={user.photoURL}/>
                        <p > {key}</p>
                    </div>
                </div>
                <div className="col-md-9" style={{paddingTop:"1rem"}}>
                <form onSubmit={postcomments}>
                <div className="row">
                    <div className="col-md-8 message1">
                        <input className="form-control" 
                        type="text" 
                        style={{ outlineWidth:" 0",
                            border:" none",
                            padding: "5px 20px",
                            margin:" 0 10px",
                            borderRadius:" 999px",
                            backgroundColor:" #eff2f5"}}
                        placeholder="What is on your mind?"
                        value={comment}
                        onChange={(e) =>setComment(e.target.value)}/>

                    </div>
                   
                    <div className="col-md-1">
                        <button
                        style={{ height: "0",
                            width: "0",
                            backgroundColor: "transparent",
                            color: "transparent",
                            border: "none"}}
                       
                        type="submit">hidden </button> 
                    </div>
                    

                </div>
               
                 </form>
                </div>
            </div>
            
            <div className="post__comment">
                <p>{comments}</p>
                        
            </div>
           
        </div>
    );
}

export default Post
