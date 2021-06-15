import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router , useHistory, Route, Link, Switch} from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import Login from "../Login/Login";
import jwt_decode from 'jwt-decode';

function Admin() {
   
    return (
        <Router>
            <Switch >
            <Route  path='/admin/login' component={Login} /> 

            <Route  path='/admin' component={Dashboard} />
            </Switch>
            
        </Router>
    )
}

export default Admin
