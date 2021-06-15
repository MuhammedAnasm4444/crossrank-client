import  React, { useState, useEffect } from 'react';
import axios  from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

;const useStyles = makeStyles((theme) => ({
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
   
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
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

export default function Blogs() {
    const classes = useStyles();
 
    useEffect(() => {
    
    },[])

  return (
    <main className={classes.content}>
    <div className={classes.toolbar} />
    <div className="row">
   
    </div>
    <div style={{ height: 400, width: '100%' }}>
      hello
    </div>
    </main>
  );
}

