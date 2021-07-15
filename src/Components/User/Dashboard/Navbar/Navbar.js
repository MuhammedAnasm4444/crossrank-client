import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import { ,withStyles, ThemeProvider, lighten } from "@material-ui/core/styles";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../User/User";
import { green, purple ,teal, grey, lightBlue } from '@material-ui/core/colors';


const SignupButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);
const LoginButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: lightBlue[700],
    '&:hover': {
      backgroundColor: lightBlue[500],
    },
  },
}))(Button);

const headersData = [
  {
    label: "Challenges",
    href: "/",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "My Account",
    href: "/user-profile",
  },
 
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "dodgerblue",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));


export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const {state, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
   
  })

  };

  const isUserLogged = () => {
    if (!state.isAuthenticated) {
      return (<React.Fragment>
           <RouterLink to="/login" className=" ml-2 mr-2">
          <LoginButton>Log In</LoginButton>
        </RouterLink>
        <RouterLink to="/signup">
          <SignupButton>Sign Up</SignupButton>
        </RouterLink>
        </React.Fragment>)
    }
    else {
      return(
      <React.Fragment>
        <Button onClick={logout}  className="ml-2 text-dark">Logout</Button>
      </React.Fragment>
      )
    }
  }
  const [userState, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = userState;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <RouterLink to='/' style={{textDecoration:'none'}}>
        {femmecubatorLogo}
        </RouterLink>
        <div>{getMenuButtons()}{isUserLogged()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}{isUserLogged()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      CrossRank
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header data-testid = "nav">
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      <Toolbar/>
    </header>
  );
}

// import React, { useContext, useEffect }  from "react"; 
// import { Link as LinkRouter, useHistory} from 'react-router-dom';
// import { fade, makeStyles,withStyles, ThemeProvider, lighten } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import "./Navbar.css";
// import { green, purple ,teal, grey, lightBlue } from '@material-ui/core/colors';
// import { Box, Button, Link } from "@material-ui/core";
// import { AuthContext } from "../../User/User";

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   nav:{
//     background:'dodgerblue'
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
//   sectionDesktop: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "flex",
//     },
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none",
//     },
//   },
// }));
// const SignupButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: green[600],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
// }))(Button);
// const LoginButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: lightBlue[700],
//     '&:hover': {
//       backgroundColor: lightBlue[500],
//     },
//   },
// }))(Button);
// export default function PrimarySearchAppBar(props) {
//   const history = useHistory()
//   const classes = useStyles();
//   const {state, dispatch } = useContext(AuthContext);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
//   useEffect(() => {
//     console.log(state)
//   },[state])
//   const isUserLogged = () => {
//     if (!state.isAuthenticated) {
//       return (<div>
//            <LinkRouter to="/login" className="mr-2">
//           <LoginButton>Log In</LoginButton>
//         </LinkRouter>
//         <LinkRouter to="/signup">
//           <SignupButton>Sign Up</SignupButton>
//         </LinkRouter>
//       </div>)
//     }
//     else {
//       return (
//         <div> <LinkRouter to={"/user-profile/"+state.id}><IconButton aria-label="show 4 new mails" style={{color:'white'}}>
//         <Badge color="secondary">
//           <AccountCircle  />
//         </Badge>
//       </IconButton>
//       </LinkRouter>
//       <IconButton aria-label="show 17 new notifications" color="inherit">
//         <Badge color="secondary">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>

//       <IconButton
//         edge="end"
//         aria-label="account of current user"
//         aria-controls={menuId}
//         aria-haspopup="true"
//         onClick={handleProfileMenuOpen}
//         color="inherit"
//       >
//  <MoreVertIcon />
//       </IconButton></div>
//       )
//     }
//   }
//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
  
//     setMobileMoreAnchorEl(null);
//   };
//   const logout = () => {
//     dispatch({
//       type: "LOGOUT",
   
//   })
//     localStorage.removeItem('user_token');
//     history.push('/')
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>{props.name}</MenuItem>
//       <MenuItem onClick={logout}>Logout</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="show 11 new notifications" color="inherit">
//           <Badge badgeContent={11} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//        < MoreVertIcon />
         
//         </IconButton>
//         <p>{props.name}</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static" className={classes.nav} style={{width:"100%"}}>
//         <Toolbar style={{width:"100%"}}>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>

//           <LinkRouter to="/" style={{ textDecoration: 'none' }}><Typography variant="h6" color="inherit" style={{color:"aqua"}}>
//             CROSSRANK
//           </Typography>
//           </LinkRouter>
//           {/* <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div> */}

//           <Typography component="div">
//             <Box fontWeight="fontWeightLight" ml={2}>
//               <LinkRouter to="/">
//              <Button color="inherit" style={{ color: "white" }}>
//                 Challenges
//               </Button>
//               </LinkRouter>
         
//             </Box>
//           </Typography>
//           <Typography component="div">
//             <Box fontWeight="fontWeightLight" ml={2}>
//             <LinkRouter to="/leaderboard">
//               <Button style={{ color: "white" }}>Leaderboard</Button>
//               </LinkRouter>
//             </Box>
//           </Typography>

//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//            {isUserLogged()}
//           </div>
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   );
// }
