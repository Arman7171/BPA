import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Autentication/Login';
import NotFound from './Components/Pages/notFound';
import Register from './Components/Autentication/Register';
import Dashboard from './Components/Pages/Dashboard';
import Activate from './Components/Autentication/Activate';
import Branches from './Components/Pages/Branches/Branches';
import Workers from './Components/Pages/Workers/Workers';
import Profile from './Components/Pages/Profile';
import Providers from './Components/Pages/Providers/Providers';
import Products from "./Components/Pages/products/Products";
import ProductImports from './Components/Pages/products/ProductImports'; 
import ProductExports from './Components/Pages/products/ProductExports'; 
import BranchInfo from './Components/Pages/Branches/BranchInfo';

export const Routes = (isAuthenticated) => {

    if(isAuthenticated){
        return(
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/not-found' component={NotFound} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/branches' component={Branches} />
                <Route path='/workers' component={Workers} />
                <Route path='/profile/:id' component={Profile} />
                <Route path='/branchInfo/:id' component={BranchInfo} />
                <Route path='/providers' component={Providers} />
                <Route path='/products' component={Products} />
                <Route path='/productImports' component={ProductImports} />
                <Route path='/productExports' component={ProductExports} />
                <Redirect to='/not-found' />
            </Switch>
        );
    }

    else{
        return(
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/not-found' component={NotFound} />
                <Route path='/registration' component={Register} />
                <Route path='/activate/:token' component={Activate} />
                <Redirect to='/not-found' />
            </Switch>
        );
    }
   
}

