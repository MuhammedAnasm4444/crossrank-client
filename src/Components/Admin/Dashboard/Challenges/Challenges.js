import  React, {useState, useEffect} from "react";
// import {
//   DataGrid,
//   gridColumnsTotalWidthSelector,
// } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import makeToast from "../../../User/User/Toaster";

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
export default function Basic() {
  const classes = useStyles();
  const history = useHistory();
  const val = '0'
  // var data;
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "Title",
        field: "title",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Language",
        field: "language",
        width: 500,
      },
      {
        label: "Description",
        field: "description",
        width: 200,
      },
      {
        label: "Action",
        field: "buttonEdit",
        sort: "asc",
        width: 300,
      },
      {
        label: "Action",
        field: "buttonRemove",
        sort: "asc",
        width: 300,
      },
      {
        label: "",
        field: "publish",
        sort: "asc",
        width: 300,
      },
    ],
    rows: [
      {
        _id: "1",
        title: "",
        description: "",
        language: "",
        buttonEdit: ( <Button
                onClick={() => {
                  editPage(this._id);
                }}
                 size="small"
                variant="contained"
                color="primary"
              >
                Edit
              </Button>),
      buttonRemove:(
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  onCancel(this._id);
                }}
              >
                Remove
              </Button>
            ),
            publish:(
                    <Button
                      onClick={() => {
                        viewPage(this._id);
                      }}
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      view
                    </Button>
                  )
      },
    ],
  });
  const viewPage = (id) => {
    console.log(datatable)
    console.log(val)
    history.push("/admin/challenge/" + id);
  };

  useEffect(() => {
    axios.get("https://ycart.tk/admin/challenges").then((res) => {
      // data = res.data; 
     
     res.data.map((item) => {
     
        item.buttonEdit = (
          <Button
            onClick={() => {
             return editPage(item._id);
            }}
             size="small"
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        );
        item.buttonRemove = (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              return onCancel(item._id);
            }}
          >
            Remove
          </Button>
        );
        item.publish = (
          <Button
            onClick={() => {
              console.log(datatable)
             return viewPage(item._id);
            }}
            size="small"
            variant="outlined"
            color="primary"
          >
            view
          </Button>
        );
      });
    
      setDatatable({
        ...datatable,
      rows:res.data
      });

    });
    console.log(...datatable.rows)
    
  }, []);

  // Button Actions
 
  const editPage = (id) => {
    history.push("/admin/edit-challenge/" + id);
  };
  const onCancel = (id) => {
    console.log(datatable)
    console.log(datatable.rows);
    if(window.confirm("are you sure")){
      axios.get("https://ycart.tk/admin/remove-challenge/" + id).then((response) => {
        setDatatable({
          ...datatable,
          rows: datatable.rows.filter((item) => item._id !== id),
        });
        makeToast("success", response.data.message);
       
      });
    }
    
    
  };
  return (
    <main className={classes.content}>
      <div className="row">
        <Link to="/admin/add-challenge" className="ml-auto m-3">
          <Button variant="contained" color="primary">
            Add Challenge
          </Button>
        </Link>
       {/* <button onClick={viewPage}>Hllo</button> */}
      </div>
      <div className={classes.toolbar} />
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
      />
    </main>
  );
}
