import React,{useState} from 'react'
import {Avatar} from '@material-ui/core'
import './MessageSend.css'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function MessageSend() {
    const [input ,setInput] = useState('')
    const [image, setImage] = useState(null)

    const handleChange =(e) => {
        if(e.target.files[0]){
            setImage(e.target.file[0])
        }
    }

    const handleSubmit =() =>{
        console.log('submitting')
    }
    return (
        <div className="messageSender">
            <div className="row">
                <div className="col-md-1">
                    <div className="m__top">
                        <Avatar />
                    </div>
                </div>
                <div className="col-md-10" style={{paddingTop:"1rem"}}>
                <form>
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
                        value={input}
                        onChange={(e) =>setInput(e.target.value)}/>

                    </div>
                    <div className="col-md-3">
                        <div className="form-group" >
                            <input type="file" 
                            id="exampleFormControlFile1"
                            
                            className="form-control-file fileSelector"
                            onChange={handleChange}/>
                        
                        </div>    

                    </div>
                    <div className="col-md-1">
                        <button
                        style={{ height: "0",
                            width: "0",
                            backgroundColor: "transparent",
                            color: "transparent",
                            border: "none"}}
                        onClick={handleSubmit}
                        type="submit">hidden </button> 
                    </div>

                </div>
               
            </form>
                </div>
            </div>
            
            
            <div className="row">
                <div className="col-md-5">
                    <div className="messageSender__option">
                        <PhotoLibraryIcon style={{ color: 'green' }} />
                        <h3>Photo/Video</h3>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="messageSender__option">
                        <EmojiEmotionsIcon style={{ color: 'orange' }} />
                        <h3>Feeling/Activity</h3>
                    </div>
                </div>  
            </div>
           
               
        </div>
    )
}

export default MessageSend
