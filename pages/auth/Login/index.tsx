import { connect } from "react-redux";
import { useState } from "react";
import { login } from "store/app/actions";
import { AppState } from "store/reducer";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // email: Yup.string().email().required().label("Email"),
  // password: Yup.string().min(8).required().label("Password"),
});

const initialValues = {
  email: "test@test.test",
  password: "test",
};

function Login({ login, isSubmitting }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (login({ values: formData })) {
          resetForm();
        }
      }}
      validateOnMount={false}
      validateOnBlur={true}
      validateOnChange={true}
      enableReinitialize={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} style={{ maxWidth: "50%", transform: "translate(50%,50%)" }}>
          <fieldset style={{ border: "1px solid black" }}>
            <legend style={{ backgroundColor: "black", color: "white", marginLeft: 10 }}>
              Login Page
            </legend>
            <div>
              <label>Email:</label>
              <br />
              <input type="email" name="email" onChange={handleChange} value={values.email} />
              <br />
              {(values.email || (errors.email && touched.email)) && errors.email}
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <br />
              {(values.password || (errors.password && touched.password)) && errors.password}
            </div>{" "}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </fieldset>
        </form>
      )}
    </Formik>
  );
}

const mapStateToProps = ({ appState: { notification, isSubmitting } }: AppState) => ({
  notification,
  isSubmitting,
});

const mapDispatchToProps = { login };

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Login);
