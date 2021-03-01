import { Link } from '@material-ui/core'
import React from 'react'

function Pblog({key,postId , postUserId,title,article, country ,author,username,imgName,profilePic,timestamp}) {
    return (
        <div>
            <div className="col-md-12">
         
                <div className="card-body" style={{borderBottom: "1px solid gainsboro"}}>
                    <h5 className="card-title">{title}</h5>
                    <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
                    <p className="card-text">{article}</p>
                    <p className="card-text">{author} from {country}</p>

                </div>
            </div>
          
        </div>
    )
}

export default Pblog
 