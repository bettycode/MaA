import React from 'react'
import Loginheader from './Loginheader'
import { auth, provider} from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'


export default function Login() {
const [state, dispatch] = useStateValue()

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
                console.log(result)

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
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <p style={{textAlign:"center"}}>log in with google</p>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary"style={{width: "150%"}} type="submit" onClick={signIn}>Button</button>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                    
                </div>
                
                
            </div>
        </div>
    )
}
