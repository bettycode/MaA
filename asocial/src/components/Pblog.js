import React from 'react'

function Pblog({key,postId , postUserId,title,article, country ,author,username,imgName,profilePic}) {
    return (
        <div>
              <div className="col-md-12">
           
            {/* <div class="card"> */}
               
                <div className="card-body" style={{borderBottom: "1px solid gainsboro"}}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{article}</p>
                    <p className="card-text">{author} {country}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Pblog
 