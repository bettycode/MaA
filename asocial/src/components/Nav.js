import React from 'react'
import './Nav.css';
import Avatar from '@material-ui/core/Avatar'
import {Link,useHistory } from 'react-router-dom';
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
                history.push("/Login");
               // console.log(dispatch)
            }).catch(error => alert(error.message))

    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
             <div className ="container">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse test" id="navbarNavDropdown">
                    <ul class="navbar-nav test1">
                    <li class="nav-item active test2">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item test2">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item test2">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                   
                    </ul>
                    <button className="btn btn-primary"
                     style={{position: "relative",right:" -30%"}} 
                     type="submit" onClick={signOut}>LogOut</button>
                    <Avatar src={user.photoURL}/>
                </div>
            </div>    
        </nav>
       
    )
}

export default Nav
