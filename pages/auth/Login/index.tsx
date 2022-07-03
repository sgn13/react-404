import { connect } from "react-redux";
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

// eslint-disable-next-line no-shadow
// eslint-disable-next-line @typescript-eslint/no-shadow
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
      validateOnBlur
      validateOnChange
      enableReinitialize={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        // eslint-disable-next-line no-shadow
        // eslint-disable-next-line @typescript-eslint/no-shadow
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} style={{ maxWidth: "50%", transform: "translate(50%,50%)" }}>
          <fieldset style={{ border: "1px solid black" }}>
            <legend style={{ backgroundColor: "black", color: "white", marginLeft: 10 }}>
              Login Page
            </legend>
            <div>
              <label id="email" htmlFor="email">
                Email:
              </label>
              <br />
              <input type="email" name="email" onChange={handleChange} value={values.email} />
              <br />
              {(values.email || (errors.email && touched.email)) && errors.email}
            </div>
            <div>
              <label id="password" htmlFor="password">
                Password:
              </label>
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
