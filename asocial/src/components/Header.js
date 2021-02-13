import React from 'react'
import {Link,useHistory } from 'react-router-dom';
//import { provider } from '../firebase';
import { useStateValue } from './StateProvider'
import Login from './Login'
import { auth} from '../firebase'
//import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'

function Header() {
    const [{user}, dispatch] = useStateValue();
    let history = useHistory();
    const signOut = () =>{
        auth
        .signOut()
        .then(() => {
                console.log("hello world")
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS,
                    user:undefined
                })
                history.push("/Login");
                console.log(dispatch)
            }).catch(error => alert(error.message))

    }
    return (
        <>
        <div className="d-grid gap-2 col-6 mx-auto">
         
           <button className="btn btn-primary"style={{width: "150%"}} type="submit" onClick={signOut}>LogOut</button>
        
        </div>
        <div>
            <h2>you did it !!! hello </h2>

        </div>
        </>
    )
}

export default Header
