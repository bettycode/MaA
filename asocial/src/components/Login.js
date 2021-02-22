import React from 'react'
import './Login.css'
import {Link } from 'react-router-dom';
import Loginheader from './Loginheader'
import { auth, provider} from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'
import pic from '../Image/Google1.png'
import pic2 from '../Image/pic1.jpg'


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
                <div className="row" style={{marginLeft:"0",marginRight:"0" ,height:" 657px"}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4 signin">
                        
                       
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Link to = "/">
                           
                                <button className="btn btn-outline-primary"style={{width: "150%",position: "relative",left: "-20%"}} type="submit" onClick={signIn}>  <img src={pic} style={{height: "40px",paddingRight: "5px"}}></img>Sign in with Google</button>
                            </Link>
                        </div>
                    </div>
                    {/* <div className="col-md-4"></div> */}
                    
                </div>
                
                
            </div>
        </div>
    )
}
