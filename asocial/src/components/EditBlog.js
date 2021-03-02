import React,{useState,useEffect}  from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
  } from "react-router-dom";
import Nav from './Nav'
import axios from '../axios'

function Addblog() {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [country,setCountry] = useState("")
    const [author,setAuthor] = useState("")
    const [article,setrArticle] = useState("")
    const [date,setdate] = useState("")
    const {id} = useParams()


    const hundleSubmit =(e)  => {
        e.preventDefault();

        const blogs ={
            title:title,
            description:description,
            country:country,
            author: author,
            article:article,
            timestamp: Date.now()
        };

        setTitle("")
        setDescription("")
        setCountry("")
        setAuthor("")
        setrArticle("")

        axios.post("/blog/add",blogs)
            .then(res => console.log(res.data))
            .catch(err =>{
                console.log(err)
            })
    }

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
            <div className="row addblog" style={{marginTop: "2rem" ,paddingTop: "2rem",marginBottom:"2rem",paddingBottom:"2rem"}}>
                <div className="col-md-3">
                
                </div>
                <div className="col-md-6">
                    <div className="addtitle" style={{marginBottom:"2rem",fontFamily:"monospace",fontWeight:"500"}}>
                        <h2 style={{fontWeight: "600", color: "#043504d1"}}>Update Blog</h2>
                    </div>
                    <form onSubmit={hundleSubmit} encType="multipart/form-data" >
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" 
                            className="form-control" 
                             value={title}
                             onChange={(e) =>setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Short Description About your Blog/Article</label>
                            <input type="text" 
                            className="form-control" 
                             value={description}
                             onChange={(e) =>setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" 
                            className="form-control" 
                             value={country}
                             onChange={(e) =>setCountry(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author Name</label>
                            <input type="text" 
                            className ="form-control"
                            value={author}
                             onChange={(e) =>setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="article">Article</label>
                            <textarea className="form-control"  
                            rows="5"
                            type="text"
                            value={article}
                             onChange={(e) =>setrArticle(e.target.value)}
                           
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary"style={{background:"rgba(4, 53, 4, 0.82)",border: "rgba(4, 53, 4, 0.82)"}}>Update</button> 
                    </form>
            
                </div>
            
            </div>

        </div>
      
    </div>
  )
}

export default  Addblog

