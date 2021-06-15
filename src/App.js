import React from 'react';
import { BrowserRouter as Router , Route, Link} from "react-router-dom";

import Admin from './Components/Admin/Admin/Admin'
import User from './Components/User/User/User'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
       <Route path="/"  >
         <User />
         </Route>
       <Route path="/admin" >
         <Admin />
         </Route>
    </Router>   
  );
}

export default App;
