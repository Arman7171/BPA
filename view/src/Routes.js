import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Autentication/Login/Login';
import Home from './Components/Pages/home';
import NotFound from './Components/Pages/notFound';

const Routes = () => {
    return(
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/not-found' component={NotFound} />
            <Redirect to='/not-found' />
        </Switch>
    );
}

export default Routes;