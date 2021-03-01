import React,{useState,useEffect} from 'react'
import axios from '../axios'
import Nav from './Nav'

function BlogId({key}) {
    const [title,setTitle] = useState("")
    const [country,setCountry] = useState("")
    const [author,setAuthor] = useState("")
    const [article,setrArticle] = useState("")

    useEffect(() => {
        axios
            .get("/blog/:id")
            .then(res =>[
                setTitle(res.data.title),
                setCountry(res.data.country),
                setAuthor(res.data.author),
                setrArticle(res.data.article)
            ])
            .catch(error => console.log(error))
    },[])

    return (
        
        <div>
            <Nav />
            <h2>{title}</h2>
            <p>{country}</p>
            <p>{author}</p>
            <p>{article}</p>
        </div>
    )
}

export default BlogId
