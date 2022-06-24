import React from "react";
import Button from "../../Button";
import Input from "../../Input";
import PasswordInput from "../../PasswordInput";

import theme, { styled } from "../../../theme/styled-components";
import { AuthFormContainerType, AuthFormType } from "./types";
import { FaKey, FaUser } from "react-icons/fa";

import * as Yup from "yup";
import { Formik, Form } from "formik";

const AuthFormWrapper = styled.div`
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 60vw;
  max-width: 100%;
  height: clamp(450px, 70vh, 600px);
`;

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;
const Overlay = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  position: relative;
  left: 0%;
  height: 100%;
  width: 100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;
const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;
const StyledOverlayPanel = styled.div`
  background: $primary;
  background: url("images/pattern.png") ${theme.primary.default};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: 0%;
  height: 100%;
  width: 100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  h1 {
    font-weight: bold;
    margin: 0;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`;
const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  right: 0;
  width: 50%;
  z-index: 2;
`;

const FormWrapper = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  position: relative;
`;

const FormTitle = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.43rem;

  position: relative;

  margin-bottom: 2rem;

  &::before {
    content: "";
    position: absolute;
    height: 3px;
    width: 30%;
    background: #fff;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20%;
  }
`;

const Link = styled.p`
  margin: 0.5rem auto 0 auto;
`;

const FormLogo = styled.div`
  width: 180px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const FormContent = styled.div`
  margin-top: 1.5rem;

  width: 90%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: black;
`;

const LoginButton = styled(Button)`
  width: min-content;

  background: ${theme.primary.default};

  -webkit-border-radius: 24;
  -moz-border-radius: 24;
  border-radius: 24px;
  font-family: Arial;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;

  margin: 1rem auto auto;

  color: white;
`;

export const AuthPageWrapper = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${theme.constant.authBodyHeight};
  min-height: 500px;
  overflow-y: auto;
`;

export const AuthFormContainer: React.FC<
  React.ComponentProps<"div"> & AuthFormContainerType & { ref?: any }
> = ({ ...props }) => {
  const { overlay, form } = props;
  return (
    <AuthFormWrapper>
      <OverlayWrapper>
        <Overlay>
          {overlay ? (
            <OverlayPanel>{overlay}</OverlayPanel>
          ) : (
            <StyledOverlayPanel>
              <div className="inner">
                <h1>Namaste!!!</h1>
              </div>
            </StyledOverlayPanel>
          )}
        </Overlay>
      </OverlayWrapper>
      <FormContainer>{form}</FormContainer>
    </AuthFormWrapper>
  );
};

export const AuthForm: React.FC<AuthFormType> = ({
  formTitle,
  elements,
  buttonName,
  actions = [],
  onSubmit,
  isSubmitting,
}) => {
  const initialValues = { email: "", password: "", confirmPassword: "", username: "" };

  const validationSchema = Yup.object().shape({
    email: elements.email ? Yup.string().required().label("Email") : Yup.string().optional(),
    username: elements.username
      ? Yup.string().required().label("Username")
      : Yup.string().optional(),
    password: elements.password
      ? Yup.string().required().label("Password")
      : Yup.string().optional(),
    confirmPassword:
      elements.password && elements.confirmPassword
        ? Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
        : Yup.string().optional(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={false}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, errors, handleChange }) => {
        return (
          <FormWrapper>
            <FormLogo>
              <img src={require("assets/images/logo.png").default} />
            </FormLogo>
            <FormContent>
              {formTitle && <FormTitle>{formTitle}</FormTitle>}
              {elements.email && (
                <Input
                  name="email"
                  value={values.email}
                  errors={errors}
                  type="email"
                  label="Email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  icon={<FaUser />}
                />
              )}{" "}
              {elements.username && (
                <Input
                  name="username"
                  value={values.username}
                  errors={errors}
                  label="Username"
                  placeholder="Enter Username"
                  onChange={handleChange}
                  icon={<FaUser />}
                />
              )}
              {elements.password && (
                <>
                  <br />
                  <PasswordInput
                    name="password"
                    value={values.password}
                    errors={errors}
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    icon={<FaKey />}
                  />
                </>
              )}{" "}
              {elements.password && elements.confirmPassword && (
                <>
                  <br />
                  <PasswordInput
                    name="confirmPassword"
                    value={values.confirmPassword}
                    errors={errors}
                    type="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter Confirm Password"
                    onChange={handleChange}
                    icon={<FaKey />}
                  />
                </>
              )}
              {buttonName && onSubmit && (
                <LoginButton className="auth" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting" : <>{buttonName}</>}
                </LoginButton>
              )}
              {actions.map((action) => (
                <Link onClick={action.action}>{action.name}</Link>
              ))}
            </FormContent>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};
