import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Autentication/Login';
import NotFound from './Components/Pages/notFound';
import Register from './Components/Autentication/Register';
import Dashboard from './Components/Pages/Dashboard';
import Activate from './Components/Autentication/Activate';
import Branches from './Components/Pages/Branches/Branches';

export const Routes = (login, isAuthenticated) => {

    if(isAuthenticated){
        return(
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/not-found' component={NotFound} />
                <Route path='/registration' component={Register} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/branches' component={Branches} />
                <Redirect to='/not-found' />
            </Switch>
        );
    }

    else{
        return(
            <Switch>
                <Route path='/' exact render={(prop) => <Login {...prop} Login={login} isAuthed={true} />} />
                <Route path='/not-found' component={NotFound} />
                <Route path='/registration' component={Register} />
                <Route path='/activate/:token' component={Activate} />
                <Redirect to='/not-found' />
            </Switch>
        );
    }
   
}

