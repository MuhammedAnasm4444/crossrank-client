import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
      padding: theme.spacing(8),
    },
  }));

function ViewTask() {
    const classes = useStyles();
    return (
     
                   <main className={classes.content}>
        <div className={classes.toolbar} />
        View Task
     </main>
    )
}

export default ViewTask
