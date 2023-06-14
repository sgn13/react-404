import { Box, Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import KeyIcon from "src/assets/icons/key_icon.svg";
import LeftArrow from "src/assets/icons/left_arrow.svg";
import Footer from "src/components/Footer";
import app from "src/constants/app";
import BlankLayout from "src/layouts/blank/BlankLayout";
import AuthenticationStyles from "../common/Authentication.styled";
import AuthForgotPassword from "./ForgotPasswordForm";

function ForgotPassword() {
  return (
    <AuthenticationStyles>
      <Box className="main_container">
        <Box className="forgot_password_inner">
          <Box sx={{ width: "40%" }}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div className="forgot_password_key_cotainer">
                <img src={KeyIcon} alt="key" width={24} height={24} />
              </div>
              <Typography
                mt={3}
                variant="h4"
                component="h4"
                sx={{ fontWeight: "600", color: "#384874" }}
              >
                Forgot Password?
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#475467",
                }}
                variant="body2"
                component="p"
                mt={2}
              >
                Enter your email and we’ll send you instructions on how to reset your password.
              </Typography>
              <Box sx={{ width: "100%" }}>
                <AuthForgotPassword />
              </Box>
              <div className="back_to_login_btn">
                <Link to={app.auth.login} className="link_style">
                  <Stack
                    spacing={1}
                    mt={5}
                    direction="row"
                    alignContent="center"
                    justifyContent="center"
                  >
                    <Box>
                      <img
                        src={LeftArrow}
                        alt="left"
                        style={{
                          marginTop: "2px",
                        }}
                        width={12}
                        height={12}
                      />
                    </Box>
                    <Box> Back to Log In</Box>
                  </Stack>
                </Link>
              </div>
            </Stack>
          </Box>

          <Footer />
        </Box>
      </Box>
    </AuthenticationStyles>
  );
}

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
