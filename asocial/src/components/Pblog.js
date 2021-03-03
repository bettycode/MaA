import { Link } from 'react-router-dom';
import React from 'react'

function Pblog({postId ,title,article, country ,author,description,timestamp}) {
    return (
        <div>
            <div className="col-md-12">
         
                <div className="card-body" style={{borderBottom: "1px solid gainsboro"}}>
                   
                   <Link to={`/blog/${postId}`}> <h2 className="card-title" style={{color:"black"}}>{title}</h2></Link>
                    <p className="card-text">{description}</p>
                    <p className="card-text" style={{fontStyle: "italic",fontWeight: "500"}}>{author} from {country}</p>
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
 