import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from './Routes';
import { Router } from 'react-router-dom';
import SideBar from './Components/sideBar';
import Header from './Components/header';
import Spinner from './Components/Spinner/Spinner';
import { connect } from 'react-redux';
import { history } from "./helpers/history";

function App({isAuthenticated, loading, productLoadin}) {
  
  return (
    <div className="App">
      <Router history={history}>
        {
          isAuthenticated ? 
            <>
              <SideBar />
              <Header />
            </> :
             null
        }
          {Routes(isAuthenticated)}
        {
          loading || productLoadin ? <Spinner /> : null
        }
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    loading: state.activityReducer.loading,
    productLoadin: state.productReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated
  }
};

export default connect(mapStateToProps, null)(App);
