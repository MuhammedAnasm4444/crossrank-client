import  React, { useState, useEffect } from 'react';
import axios  from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 250 },

  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 250,
  },
  {
    field: 'fullName',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 
// ]
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

export default function DataTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    useEffect(() => {
      axios.get('https://anasmhd.tk/admin/get-users').then((res) => {
        console.log(res)
        console.log(res.data[0]);
        
        var data = res.data
        data.map((item) => {
          item.id = item._id
        })
        console.log(data)
        setRows(rows =>  [...rows, ...data])
 
      }).
      catch(err => {
        console.log(err)
      })
    },[])

  return (
    <main className={classes.content}>
    <div className={classes.toolbar} />
    <div className="row">
    <Button variant="contained" color="primary" className="ml-auto m-1 mb-3">
  Add Challenge
</Button>
    </div>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
    </main>
  );
}
