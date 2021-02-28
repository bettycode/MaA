import React from 'react'
import './Loginheader.css'
import pic2 from '../Image/pic2.png'


function Loginheader() {
    return (
        <div className=" login-header">
            <nav class="navbar navbar-light  ">
                <div class="container">
                    <img src={pic2} alt="img" style={{width:"150px"}}></img>
                   
                </div>
               
            </nav>
            
        </div>
    )
}

export default Loginheader
