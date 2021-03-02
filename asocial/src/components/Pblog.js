import { Link } from 'react-router-dom';
import React from 'react'

function Pblog({key,postId , postUserId,title,article, country ,author,username,imgName,profilePic,description,timestamp}) {
    return (
        <div>
            <div className="col-md-12">
         
                <div className="card-body" style={{borderBottom: "1px solid gainsboro"}}>
                   
                   <Link to={`/blog/${postId}`}> <h5 className="card-title" style={{color:"black"}}>{title}</h5></Link>
                    <p className="card-text">{description}</p>
                    {/* <p className="card-text">{article}</p> */}
                    <p className="card-text">{author} from {country}</p>
                    <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
                    
                      <Link to={`/update/${postId}`}>
                       
                       <button type="submit" className="btn btn-outline-success">Update</button>
                       </Link>
                </div>
            </div>
          
        </div>
    ) 
}

export default Pblog
 