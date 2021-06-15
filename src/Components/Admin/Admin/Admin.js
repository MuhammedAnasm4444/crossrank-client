import React from 'react';
import { BrowserRouter as Router , Route,  Switch} from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import Login from "../Login/Login";


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
