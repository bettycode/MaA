import React from 'react'
import './Body.css'
import Avatar from '@material-ui/core/Avatar'
import MessageSend from './MessageSend';
import Post from './Post';


function Body() {
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-4" style={{width:"200px", 
                    height:"200px"}}>
                        {/* avatar place */}
                        <div className="container avatarc">
                            
                            <Avatar className="acatar" style={{width:"100px",height:"100px",marginTop:"1.5rem",marginLeft:"10px"}}/>
                            <h4>Sam Sam</h4>
                        </div>
                </div>
                <div className="col-md-8">
                        <div className= "row">
                           <MessageSend />
                        </div>
                        <div className="row">
                            <div className="col-md-11 post__box">
                            <Post 
                                  profilePic= "< Avatar />"
                                  message="hello Guys"
                                  timestamp="1613298800"
                                  imgName="imgName"
                                  username="sam"
                           />
                            </div>
                           
                        </div>
                       
                </div>
            
               
            </div>
           
            
        </div>
    )
}

export default Body
