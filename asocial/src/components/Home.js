import React from 'react'
// import {Link,useHistory } from 'react-router-dom';
import Nav from './Nav'
import Body from './Body'
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
        <Body />
        
        </>
    )
}

export default Home;
