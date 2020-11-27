import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from './Routes';
import { BrowserRouter as Route } from 'react-router-dom';
import SideBar from './Components/sideBar';
import Header from './Components/header';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    login();
  }, []);

  const login = () => {
    console.log('localStorage', !!localStorage.getItem('token'));
    setIsAuthenticated(!!localStorage.getItem('token'));
  }
  
 
  return (
    <div className="App">
      <Route>
        {
          isAuthenticated ? 
            <>
              <SideBar />
              <Header />
            </> :
             null
        }
        {Routes(login, isAuthenticated)}
      </Route>
    </div>
  );
}



export default App;
