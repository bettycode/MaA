import React from 'react'
import  { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Nav from './Nav'
import Body from './Body'



function Home() {
    
    return (
        <>
        <Nav />
        <Body />
        
    
        </>
    )
}

export default Home;
