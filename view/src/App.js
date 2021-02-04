import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from './Routes';
import { BrowserRouter as Route } from 'react-router-dom';
import SideBar from './Components/sideBar';
import Header from './Components/header';
import Spinner from './Components/Spinner/Spinner';
import { connect } from 'react-redux';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    login();
  }, []);

  const login = () => {
    console.log('localStorage', !!localStorage.getItem('token'));
    setIsAuthenticated(!!localStorage.getItem('token'));
  }
  
  const { loading } = props;
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
        {
          loading ? <Spinner /> : null
        }
      </Route>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    loading: state.activityReducer.loading
  }
};

export default connect(mapStateToProps, null)(App);
