import React from 'react'
import {Link } from 'react-router-dom';
import './Nav.css';
import Avatar from '@material-ui/core/Avatar'
import {useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import { auth} from '../firebase'
import { actionTypes } from './Reducer'


function Nav() {

    const [{user}, dispatch] = useStateValue();
    let history = useHistory();
    const signOut = () =>{
        auth
        .signOut()
        .then(() => {
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS,
                    user:undefined
                })
                history.push("/");//Login
               // console.log(dispatch)
            }).catch(error => alert(error.message))

    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
             <div className ="container">
                <Link
                    to="/HOME"
                     className="navbar-brand">
                    Navbar
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse test" id="navbarNavDropdown">
                    <ul className="navbar-nav test1">
                    <li className="nav-item active test2">
                        <Link 
                            to="/HOME"
                                className={ window.location.pathname === "/HOME" ? "nav-link active" :"nav-link" } >
                                HOME 
                        </Link>
                    </li>
                    <li className="nav-item test2">
                        <Link 
                            to="/MESSAGE" 
                            className={ window.location.pathname === "/MESSAGE" ? "nav-link active": "nav-link"} >
                                MESSAGE
                        </Link>
                    </li>
                    <li className="nav-item test2">
                    <Link 
                            to="/BLOG" className={ window.location.pathname === "/BLOG" ? "nav-link active": "nav-link"} >
                                BLOG
                        </Link>
                    </li>
                   
                    </ul>
                    <button className="btn btn-primary"
                     style={{position: "relative",right:" -25%"}} 
                     type="submit" onClick={signOut}>LogOut</button>
                    <Avatar src={user.photoURL}/>
                </div>
            </div>    
        </nav>
       
    )
}

export default Nav
