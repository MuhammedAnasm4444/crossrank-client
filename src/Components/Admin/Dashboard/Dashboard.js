import React from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LinkMaterial from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Main from "./Main/Main";
import Challenges from "./Challenges/Challenges";
import UserList from "./UserList/UserList";
import AddChallenge from "./Challenges/AddChallenge";
import EditChallenge from "./Challenges/EditChallenge";
import AddTask from "./Challenges/AddTask";
import Blogs from "./Blogs/Blogs";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ViewChallenge from "./Challenges/ViewChallenge";
import ViewTask from "./Challenges/ViewTask";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const history = useHistory();
  var username;
  const token = localStorage.getItem("admin_token");
  if (!token) console.log("user not found");
  else {
    const decoded = jwt_decode(token);
    console.log(decoded);
    username = decoded.name;
  }
  if (!token) {
    history.push("/admin/login");
  }
  // eslint-disable-next-line

  const classes = useStyles();
  const theme = useTheme();
  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
          <div className="ml-auto">
            <AccountCircleIcon className="mr-3" />

            <SettingsIcon className="" />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <LinkMaterial href="/admin/">
            <ListItem button key="Dashboard">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </LinkMaterial>
          <LinkMaterial href="/admin/challenges">
            <ListItem button key="Challenges">
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Challenges" />
            </ListItem>
          </LinkMaterial>
          <LinkMaterial href="/admin/users">
            <ListItem button key="Users">
              <ListItemIcon>
             < AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </LinkMaterial>
          <LinkMaterial href="/admin/blogs">
            <ListItem button key="Blogs">
              <ListItemIcon>
             <  ImportContactsIcon/>
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItem>
          </LinkMaterial>
        </List>

        <Divider />
{/* 
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Router>
        <Switch>
          <Route path="/admin" exact component={Challenges} />
          <Route path="/admin/challenges" component={Challenges} />
          <Route path="/admin/challenge/:id" component={ViewChallenge}/>
          <Route path="/admin/add-challenge" component={AddChallenge} />
          <Route path="/admin/edit-challenge/:id" component={EditChallenge} />
          <Route path="/admin/users" component={UserList} />
          <Route path="/admin/blogs" component={Blogs} />
          <Route path="/admin/add-question/:id"component={AddTask} />
          <Route path="/admin/task/:id" component={ViewTask} />
        </Switch>
      </Router>
    </div>
  );
}
