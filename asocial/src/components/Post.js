import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'

function Post({profilePic,imgName, username, timestamp, message}) {
    return (
        <div  >
           
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
                    {/* image here */}
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
              
            
        </div>
    );
}

export default Post
