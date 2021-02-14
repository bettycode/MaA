import React from 'react'
// import {Link,useHistory } from 'react-router-dom';
import Nav from './Nav'
// import { useStateValue } from './StateProvider'
// import Login from './Login'
// import { auth} from '../firebase'
// import { actionTypes } from './Reducer'

function Home() {
    // const [{user}, dispatch] = useStateValue();
    // let history = useHistory();
    // const signOut = () =>{
    //     auth
    //     .signOut()
    //     .then(() => {
    //             dispatch({
    //                 type: actionTypes.LOGOUT_SUCCESS,
    //                 user:undefined
    //             })
    //             history.push("/Login");
    //            // console.log(dispatch)
    //         }).catch(error => alert(error.message))

    // }
    return (
        <>
        <Nav />
        {/* <div className="d-grid gap-2 col-6 mx-auto">
         
           <button className="btn btn-primary"style={{width: "150%"}} type="submit" onClick={signOut}>LogOut</button>
        
        </div> */}
        
        </>
    )
}

export default Home;
