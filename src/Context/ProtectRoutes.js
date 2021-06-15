import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Components/User/User/User';
import Navbar from '../Components/User/Dashboard/Navbar/Navbar'

const ProtectedRoute = ({children,...rest}) => {
    const {state } = useContext(AuthContext);
    console.log('blajakdjfj')
    console.log(rest)
    console.log(state)
  return (
    <Route {...rest} render={
      () => {
        if (state.isAuthenticated===true) {
          return children
              
         
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;