import React from 'react'
import './Login.css'
import {Link } from 'react-router-dom';
import Loginheader from './Loginheader'
import { auth, provider} from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'
import pic from '../Image/Google1.png'
import pic1 from '../Image/pic1.png'
import pic4 from '../Image/pic4.jpg'
import F from './F'


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
                <div className="row" style={{marginLeft:"0",marginRight:"0" ,height:"400px"}}>
                    <div className="col-md-7">
                    <div className="container" style={{textAlign:"center"}}>
                        <h2 style={{textAlign:"center", marginTop:"2rem"}}>Welcome to ASOCIAL!</h2>
                        
                    </div>
                    </div>
                    <div className="col-md-4 signin">
                        <div className="logo">
                       
                            <p style={{textAlign:"center",paddingTop:"2rem"}}>New to Asocial? Sign Up!</p>
                        </div>
                       
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <div className ="signup">
                            <Link to = "/">
                           
                                <button className="btn btn-outline-primary"style={{width: "150%",position: "relative",left: "-20%",color:"green",borderColor: "green"}} 
                                type="submit" onClick={signIn}>  <img src={pic} style={{height: "40px",paddingRight: "5px"}}></img>Sign Up in with Google</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-4"></div> */}
                    
                </div>
                <div className="container">
                    <div className="row" style={{textAlign:"center"}}>
                        <div className="col-md-6 imgsocial">
                            <img src={pic4}></img>
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
                <div className="container">
                    <div className="row">
                    
                        <div className="col-md-4 section01">
                            <div className="section1"><strong>1</strong></div>
                            <h5>Sing Up</h5>

                        </div>
                        <div className="col-md-4 section01">
                            <div  className="section1"><strong>2</strong></div>
                            <h5>Explore</h5>
                        </div>
                        <div className="col-md-4 section01">
                            <div  className="section1"><strong>3</strong></div>
                            <h5>Participate</h5>
                        </div>

                    </div>
                </div>
            </div>
                
            </div>
            
            <F />
        </div>
    )
}
