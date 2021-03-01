import React from 'react'
import './Loginheader.css'
import pic2 from '../Image/pic2.png'


function Loginheader() {
    return (
        <div className=" login-header">
            <nav className="navbar navbar-light  ">
                <div className="container">
                    <img src={pic2} alt="img" style={{width:"150px"}}></img>
                   
                </div>
               
            </nav>
            
        </div>
    )
}

export default Loginheader
