import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import { BrowserRouter as Route } from 'react-router-dom';
import Header from './Components/header';

function App() {
 
  return (
    <div className="App">
      <Route>
        <Header />
        <Routes />
      </Route>
    </div>
  );
}



export default App;
