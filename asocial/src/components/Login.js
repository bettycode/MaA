import React from 'react'
import './Login.css'
import {Link } from 'react-router-dom';
import Loginheader from './Loginheader'
import { auth, provider} from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'
import pic from '../Image/Google1.png'
import pic4 from '../Image/pic4.jpg'
import F from './F'
import pic7 from '../Image/pic7.png'
import pic8 from '../Image/pic8.png'
import pic9 from '../Image/pic9.jpg'


export default function Login() {
const [state, dispatch] = useStateValue()

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
               // console.log(result)

                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })

            }).catch(error => alert(error.message))
    }
    return (
        <div className="loginPage">
            <Loginheader />
            <div className="login">
                <div className="row" style={{marginLeft:"0",marginRight:"0" ,marginBottom:"6rem",paddingBottom:"1rem"}}>
                    <div className="col-md-7">
                    <div className="container" style={{textAlign:"center"}}>
                        <h2 style={{textAlign:"center", marginTop:"4rem"}}>Welcome to ASOCIAL!</h2>
                        <h7>A networking website for showcasing Africian countries in their true and glories state.</h7>
                        
                    </div>
                    </div>
                    <div className="col-md-4 signin">
                        <div className="logo">
                       
                            <p style={{textAlign:"center",paddingTop:"2rem",marginBottom:"5rem"}}>New to Asocial? Sign Up!</p>
                        </div>
                       
                        {/* <div className="d-grid gap-2 col-6 mx-auto"> */}
                            <div className ="signup">
                            <Link to = "/HOME">
                           
                                <button className="btn btn-outline-primary"style={{width: "70%",position: "relative",left:"15%",color:"green",borderColor: "green"}} 
                                type="submit" onClick={signIn}>  <img src={pic} alt="img" style={{height: "40px",paddingRight: "5px"}}></img>Sign Up in with Google</button>
                            </Link>
                            </div>
                            
                        {/* </div> */}
                        <p style={{fontSize:"x-small",padding:"10px",textAlign: "center",color: "gray"}}>
                            By clicking ‘Create account’ or signing up, you agree to the Terms of Use and Privacy Notice.</p>
                    </div>
                    {/* <div className="col-md-4"></div> */}
                    
                </div>
                <div className="container">
                    <div className="row" style={{textAlign:"center"}}>
                        <div className="col-md-6 imgsocial">
                            <img src={pic4} alt="img"></img>
                        </div>
                        <div className="col-md-6">
                        <h2 style={{textAlign:"center",marginTop: "2.5rem"}}>What is ASOCIAL?</h2><br/>
                        <p>Asocial is a place to explore and also share different things about African countries.
                            You will find posts, pictures, blogs and articles that talks about Africa in a different light!
                         
                            </p>
                        </div>
        
                    </div>
            </div>
            <div className="container-fluid" style={{background:"#80808026",textAlign:"center", borderTop:" 1px solid #00800033"}} >
                <div className="container" style={{marginTop:"1rem",paddingTop:"1rem"}}>
                    <h3>How it works</h3>
                    <div className="row">
                    
                        <div className="col-md-4 section01">
                            <div className="section1"> <img src={pic8} alt="img"></img></div>
                            <h5>Sing Up</h5>
                            <p>Join the community!</p>
                        </div>
                        <div className="col-md-4 section01">
                            <div  className="section1"> <img src={pic7} alt="img"></img></div>
                            <h5>Explore</h5>
                            <p>Check the Posts or the Blogs!  </p>

                        </div>
                        <div className="col-md-4 section01">
                            <div  className="section1"> <img src={pic9} alt="img"></img></div>
                            <h5>Participate</h5>
                            Tell us about your country or the country you visited!
                        </div>

                    </div>
                </div>
            </div>
                
            </div>
            
            <F />
        </div>
    )
}
