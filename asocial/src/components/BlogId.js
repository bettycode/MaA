import React,{useState,useEffect} from 'react'
import { useStateValue } from "./StateProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
  } from "react-router-dom";
import axios from '../axios'
import Nav from './Nav'
import './Blog.css'


function BlogId({postId}) {
    const [{user},dispatch] = useStateValue()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [country,setCountry] = useState("")
    const [author,setAuthor] = useState("")
    const [article,setrArticle] = useState("")
    const [date,setdate] = useState("")
    const {id} = useParams()
    useEffect(() => {
        axios
            .get(`/blog/${id}`)
            .then(res =>[
                setTitle(res.data.title),
                setDescription(res.data.description),
                setdate(res.data.date),
                setCountry(res.data.country),
                setAuthor(res.data.author),
                setrArticle(res.data.article)
            ])
            .catch(error => console.log(error))
    },[])

    return (
        
        <div>
            <Nav />
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
                    <div className="blogbody">
                        <h1 style={{textAlign:"center",paddingBottom:"2rem"}}>{title}</h1>
                        <p>{description}</p>
                        <p style={{paddingBottom:"1rem"}}>{article}</p>
                        <Link  to={`/BLOG`}>
                       <button type="submit" className="btn btn-outline-success"style={{ marginBottom:"2rem"}}>Back To Blogs</button>
                       </Link>
                        <p style={{fontStyle: "italic",fontWeight: "500",borderTop:" 1px solid gainsboro",paddingTop: "2rem"}}>
                             By {author} from {country} </p>
                        <p>{new Date(parseInt(date)).toUTCString()}</p>
                       
                        <br/>
                      
                        <br/>
                    </div>
            
            </div>
            <div className="row">
            </div>
           
        </div>
    )
}

export default BlogId
