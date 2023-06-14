import { connect } from "react-redux";
import { postForgotPassword } from "src/store/app/actions";
import * as Yup from "yup";

import { Box, Button, FormHelperText, InputLabel, OutlinedInput, Typography } from "@mui/material";

import { Field, Form, Formik, FormikProps } from "formik";
import { AppState } from "src/store/reducer";

interface forgotPasswordType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  postForgotPassword: (arg?: any) => void;
  isSubmitting: boolean;
  notification: any;
  resetNotification: (arg?: any) => void;
}

interface ISignUpForm {
  email: string;
}

const initialValues = {
  email: "",
};

function ForgotPasswordForm({
  title,
  subtitle,
  subtext,
  postForgotPassword,
  isSubmitting,
}: forgotPasswordType) {
  const submitHandler = (values: any, actions: any) => {
    postForgotPassword({ values });
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="600" textAlign="center" color="textSecondary" variant="h6" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string().required("Email is required"),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;

          return (
            <Form style={{ marginTop: "30px" }}>
              <InputLabel htmlFor="email" className="input_label">
                Email
              </InputLabel>
              <Field
                as={OutlinedInput}
                size="small"
                id="email"
                name="email"
                type="text"
                fullWidth
                sx={{ marginTop: "5px" }}
                placeholder="Enter Email"
                className="form_input"
                value={values.email}
                error={!!(errors.email && touched.email)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.email && touched?.email && (
                <FormHelperText style={{ color: "red" }}>{errors?.email}</FormHelperText>
              )}
              <Box mt={2} mb={2}>
                <Button
                  variant="contained"
                  className="login_button"
                  disabled={!!isSubmitting}
                  fullWidth
                  type="submit"
                >
                  {isSubmitting ? "Submitting ..." : "Submit "}
                </Button>
              </Box>
              {/* <Box mt={2} mb={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" justifyContent="center" alignItems="center"></Stack>
                  <Link to="/authentication/login" className="link_style">
                    <Box>Back to login</Box>
                  </Link>
                </Stack>
              </Box> */}
            </Form>
          );
        }}
      </Formik>

      {subtitle}
    </>
  );
}

const mapStateToProps = ({ appState: { isLoading, isSubmitting } }: AppState) => ({
  isLoading,
  isSubmitting,
});

const mapDispatchToProps = { postForgotPassword };

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ForgotPasswordForm);
