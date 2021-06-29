import React from 'react';
import { BrowserRouter as Router , Route, Link, Switch} from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Navbar from '../Dashboard/Navbar/Navbar'
import Task from '../Task/Task';
import Challenge from '../Dashboard/Section/Challenge';
import UserProfile from '../UserProfile/UserProfile';
import ProtectedRoute from '../../../Context/ProtectRoutes';
import BlogPage from '../BlogPage/BlogsPage';
import AddBlog from '../AddBlog/AddBlog';
import Leaderboard from '../Leaderboard/Leaderboard';
import Blog from '../BlogPage/Blog';


export const AuthContext = React.createContext();
const token = localStorage.getItem('user_token')
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
if(token) {
  const user = localStorage.getItem("user")
  const id= localStorage.getItem("userId")
   initialState.isAuthenticated=true
   initialState.token=token
   initialState.user= user
   initialState.id=id
   
}

  const reducer = (state, action) => {
    console.log("reduceeeeeeeeeeeeeeeeeeeeeeeeeer")
    console.log(action.payload)
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", action.payload.user.name);
        localStorage.setItem("userId", action.payload.user.id);
        localStorage.setItem("user_token", JSON.stringify(action.payload.token));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user.name,
          id:action.payload.user.id,
          token: action.payload.token
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };  
function User() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // const [token, setToken] = useState();

    // if(!token) {
    //   return <Login setToken={setToken} />
    // }
    return (
      <AuthContext.Provider value={{
        state,
        dispatch
      }}>
        <Router>
            <Switch>
            <Route path='/signup'  >
                <Navbar />
                <Signup />
                
                </Route>
            <Route path='/' exact component={Dashboard} />
            <Route path='/login' >
                <Navbar />
                <Login />
                </Route>
                <Route path="/challenge/task/">  
                    <Navbar />
                    <Task />
                </Route>
                
                <ProtectedRoute  path='/challenge/:id'   >
                <Navbar />
                    <Challenge />
                    </ProtectedRoute>
                {/* <Route path="/challenge/:id">
                    <Navbar />
                    <Challenge />
                </Route> */}
                <ProtectedRoute path="/leaderboard">
                  <Navbar />
                  <Leaderboard />
                </ProtectedRoute>
                <Route path="/user-profile/:id">
                    <Navbar />
                    <UserProfile />
                </Route>
                <Route path="/user-profile">
                    <Navbar />
                    <UserProfile />
                </Route>
                <Route path='/blogs'>
                  <Navbar />
                  <BlogPage />
                </Route>
                <Route path='/add-blog'>
                  <Navbar />
                  <AddBlog />
                </Route>
                <Route path='/blog/:id'>
                  <Navbar />
                  <Blog />
                </Route>
                </Switch>
        </Router>
        </AuthContext.Provider>

    )
}

export default User
