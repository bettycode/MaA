import React from 'react'
import  { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Login from './components/Login'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import Blog from './components/Blog'
import F from './components/F'
import { useStateValue } from './components/StateProvider'
function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <Route path = "/Login">
              <Login/>
              <F />
            </Route>  
          ) : (  
            <>
            <Route exact path = "/">
              <Home />
            </Route>  
            <Route exact path = "/BLOG" >
             <Blog />
             </Route> 
             <F />
            </>
           )};  
            
          </Switch>
      </Router>
     
    </div>
  );
}

export default App;
