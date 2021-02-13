import React from 'react'
import  { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Login from './components/Login'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import { useStateValue } from './components/StateProvider'

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <Route exact path = "/Login">
              <Login/>
            </Route>  
           ) : ( 
            <>
            <Route path = "/">
              <Header />
            </Route>
            </>

           )}; 
          </Switch>
      </Router>
    </div>
  );
}

export default App;
