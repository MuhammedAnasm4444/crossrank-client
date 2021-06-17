import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from "axios";
import makeToast from "../../../User/User/Toaster";

import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  input: "",
  output: "",
  taskId: "",
};

const validationSchema = Yup.object({
  input: Yup.string().required("This field is required"),
  output: Yup.string().required("This field is required"),
  taskId: "",
});

function AddTest(props) {
  const [test, setTest] = useState(props);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTest({
      ...test,
      ...props,
    });
    setShow(true)
  }, []);

  // function testOnChange(e) {
  //   console.log(test);
  //   setTest({
  //     ...test,
  //     [e.target.name]: e.target.value,
  //   });
  // }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  function onSubmit(formData) {
    console.log(props)
    console.log(test)
    if (test.taskId === "") {
      alert("Please add test case after question submission");
    } else {
      axios
        .post("https://ycart.tk/admin/add-testCase", {...formData,...test})
        .then((response) => {
          makeToast("success", "test "+test.count+ " succesfully added");
          setShow(true);
          props.setAdd(test.taskId)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="col-md-4">
      <Form onSubmit={formik.handleSubmit}>
        <p className="font-weight-bolder" style={{ color: "darkslategrey" }}>
          Test Case{props.count}:
        </p>
        <Form.Label className="font-weight-bold">Input</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="input"
          placeholder="Enter the Test Input"
          {...formik.getFieldProps("input")}
          readOnly={show}
        />
        {formik.touched.input && formik.errors.input ? (
          <div className="text-danger">{formik.errors.input}</div>
        ) : null}
        <Form.Label className="font-weight-bold">Output</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="output"
          placeholder="Enter the Test Output"
          {...formik.getFieldProps("output")}
          readOnly={show}
        />
        {formik.touched.output && formik.errors.output ? (
          <div className="text-danger">{formik.errors.output}</div>
        ) : null}
        {!show && (
          <Button
            variant="contained"
            className="mt-2"
            color="primary"
            type="submit"
          >
            Add
          </Button>
        )}
      </Form>
    </div>
  );
}

export default AddTest;
