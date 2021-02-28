import React,{useState} from 'react'
//import firebase from 'firebase'
import {Avatar} from '@material-ui/core'
import './MessageSend.css'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useStateValue } from "./StateProvider";
import axios from '../axios';

function MessageSend() {

    const [input ,setInput] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl,setImageUrl] =useState('')
    const [{user},dispatch] = useStateValue()
   
    
   
    //console.log(user)

    const handleChange =(e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const uplodefile =() =>{
        document.getElementsByClassName('fileSelector')[0].click()
    }

    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log('submitting')

        if (image){
            const imgForm = new FormData()
            imgForm.append('file', image, image.name)

            axios.post('/upload/image',imgForm, {
                headers: {
                    "accept": "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    "Content-Type": `multipart/form-data; boundary=${imgForm._boundary}`,
                  },
            }).then((res) => {
                console.log(res.data)

                const postData = {
                    text:input,
                    imgName:res.data.filename,
                    user: user.displayName,
                    avatar: user.photoURL,
                    timestamp: Date.now()

                }    
                console.log(postData)
                savePost(postData)
            })
        }else{
            const postData = {
                text:input,
                user: user.displayName,
                avatar:user.photoURL,
                timestamp:Date.now()
            }
            console.log(postData)
            savePost(postData)
        }
        
        setImageUrl('')
        setInput('')
        setImage(null)
       
    }

    const savePost = async(postData) => {
        await axios.post('/upload/post', postData)
        .then((res) =>{console.log(res)})
    }

    return (
        <div className="col-md-12  messageSender">
            <div className="row" style={{borderBottom:" 1px solid #eff2f5", marginRight:"0", marginLeft:"0"}}>
                <div className="col-md-2">
                    <div className="m__top">
                        <Avatar  src={user.photoURL}/>
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
                    {/* <div className="col-md-3">
                        <div className="form-group" >
                            <input type="file" 
                            id="exampleFormControlFile1"
                            
                            className="form-control-file fileSelector"
                            onChange={handleChange}/>
                        
                        </div>    

                    </div> */}
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
                    <div className="messageSender__option"onClick ={uplodefile}>
                        <PhotoLibraryIcon style={{ color: 'green' }} />
                        <input type="file" 
                            className=" fileSelector"
                            onChange={handleChange} style={{display:" none"}}/>
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
