import { useState } from "react";
import { connect } from "react-redux";
import { login } from "src/store/app/actions";
import * as Yup from "yup";

import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
// import Link from "next/link";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Field, Form, Formik, FormikProps } from "formik";
// import { useRouter } from "next/router";
import { Link, useNavigate } from "react-router-dom";
import app from "src/constants/app";
import { AppState } from "src/store/reducer";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  login: (arg?: any) => Promise<boolean>;
  isSubmitting: boolean;
  notification: any;
}

interface ISignUpForm {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

function AuthLogin({ title, subtitle, subtext, login, isSubmitting }: loginType) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("username", values.email);
    formData.append("password", values.password);
    const result = await login({ values: formData });
    if (result) {
      navigate("/");
    }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="600" textAlign="center" color="textSecondary" variant="h6" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* {!!notification.length && (
        <Toast item={notification[0]} resetNotification={resetNotification} />
      )} */}

      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;

          return (
            <Form style={{ marginTop: "30px" }}>
              <InputLabel htmlFor="email" className="input_label">
                Email ID
              </InputLabel>
              <Field
                as={OutlinedInput}
                size="small"
                id="email"
                name="email"
                type="text"
                fullWidth
                sx={{ marginTop: "5px" }}
                placeholder="Enter your email"
                className="form_input"
                value={values.email}
                error={!!(errors.email && touched.email)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.email && touched?.email && (
                <FormHelperText style={{ color: "red" }}>{errors?.email}</FormHelperText>
              )}
              <InputLabel htmlFor="password" className="input_label" sx={{ marginTop: "17px" }}>
                Password
              </InputLabel>
              <Field
                as={OutlinedInput}
                size="small"
                id="password"
                name="password"
                className="form_input"
                value={values.password}
                error={!!(errors.password && touched.password)}
                placeholder="Enter you password"
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      sx={{ color: "#667085" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors?.password && touched?.password && (
                <FormHelperText style={{ color: "red" }}>{errors?.password}</FormHelperText>
              )}

              <Box mt={2} mb={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Field
                      as={Checkbox}
                      size="small"
                      id="remember"
                      name="remember"
                      sx={{
                        color: "#D0D5DD",
                        "&.Mui-checked": {
                          color: "#33426A",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#344054",
                      }}
                    >
                      Remember me
                    </Box>
                  </Stack>
                  <Link to={app.auth.forgotPassword} className="link_style">
                    <Box>Forgot Password?</Box>
                  </Link>
                </Stack>
              </Box>

              <Button
                variant="contained"
                className="login_button"
                disabled={!!isSubmitting}
                fullWidth
                type="submit"
              >
                {isSubmitting ? "Logging in ..." : "Log in "}
              </Button>
            </Form>
          );
        }}
      </Formik>

      {subtitle}
    </>
  );
}

const mapStateToProps = ({ appState: { isLoading, isSubmitting, notification } }: AppState) => ({
  isLoading,
  isSubmitting,
  notification,
});

const mapDispatchToProps = { login };

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AuthLogin);
