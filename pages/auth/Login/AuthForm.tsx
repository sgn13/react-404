import React from "react";

import * as Yup from "yup";

import FormikBase from "containers/FormikBase/FormikBase";
import { Form, FormikHelpers, FormikProps } from "formik";

import PasswordInput from "components/PasswordInput";
import Button from "components/Button/Button";
import niceIcon from "assets/icons/nice.svg";
import styled from "theme/styled";
import Input from "components/Input/Input";

const Footer = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 200;

  color: #9a9a9a;
  margin-top: 5rem;
  font-size: 0.9em;
`;

const Signup = styled.span`
  color: rgba(64, 75, 124, 1);
  font-weight: 500;
  font-size: 0.8rem;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  width: min-content;
  background: #cd171f;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

export const AuthPageWrapper = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const initialValues = {
  email: "",
  oldPassword: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export function AuthForm({ elements, onSubmit, isSubmitting }) {
  const validationSchema = Yup.object().shape({
    email: elements?.email ? Yup.string().required().label("Email") : Yup.string().optional(),
    username: elements?.username
      ? Yup.string().required().label("Username")
      : Yup.string().optional(),
    oldPassword: elements?.oldPassword
      ? Yup.string().required().label("Old Password")
      : Yup.string().optional(),
    password: elements?.password
      ? Yup.string().required().label("Password")
      : Yup.string().optional(),
    confirmPassword:
      elements.password && elements.confirmPassword
        ? Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
        : Yup.string().optional(),
  });

  return (
    <FormikBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange }) => {
        return (
          <FormikForm>
            {elements?.email && (
              <Input
                name="email"
                inputSize="xxl"
                value={values.email}
                errors={errors}
                type="email"
                label="Email"
                placeholder="Enter email address"
                onChange={handleChange}
              />
            )}

            {elements.username && (
              <Input
                name="username"
                inputSize="xxl"
                value={values.username}
                errors={errors}
                type="text"
                label="Username"
                placeholder="Enter username"
                onChange={handleChange}
              />
            )}

            {elements.oldPassword && (
              <PasswordInput
                name="oldPassword"
                inputSize="xxl"
                value={values.oldPassword}
                errors={errors}
                label="Old Password"
                placeholder="Enter old password"
                onChange={handleChange}
                style={{
                  paddingRight: "2em",
                }}
                showForgotPassword={false}
              />
            )}

            {elements?.password && (
              <PasswordInput
                name="password"
                inputSize="xxl"
                value={values.password}
                errors={errors}
                label="Password"
                placeholder="Enter password"
                onChange={handleChange}
                style={{
                  paddingRight: "2em",
                }}
              />
            )}

            {elements.confirmPassword && (
              <PasswordInput
                name="confirmPassword"
                inputSize="xxl"
                value={values.confirmPassword}
                errors={errors}
                label="Confirm Password"
                placeholder="Enter Confirm password"
                onChange={handleChange}
                style={{
                  paddingRight: "2em",
                }}
                showForgotPassword={false}
              />
            )}

            {onSubmit && (
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </SubmitButton>
            )}

            <Footer>
              Don't Have an account? <Signup>Signup</Signup>{" "}
            </Footer>
          </FormikForm>
        );
      }}
    </FormikBase>
  );
}
