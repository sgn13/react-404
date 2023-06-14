import { Box, Stack, Typography } from "@mui/material";
import UserImages from "src/assets/images/login_avatars.png";
import LoginStar from "src/assets/images/login_stars.svg";

// components
import Footer from "src/components/Footer";
import AuthenticationStyles from "src/features/auth/common/Authentication.styled";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <AuthenticationStyles>
      <Box className="main_container">
        <Box className="main_inner_container">
          <Box className="flex_container">
            {/* left */}
            <Box className="left_container">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ padding: "0 22%" }}>
                  <Box>
                    {/* <img src={BrandLogo} alt="bas" style={{ height: '50px', width: '50px' }} /> */}
                    <Box sx={{ marginTop: "26px" }}>
                      <Typography
                        variant="h4"
                        component="h4"
                        sx={{ fontWeight: "600", color: "#384874" }}
                      >
                        Log In
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ marginTop: "8px", color: "#475467" }}
                      >
                        Welcome! Please enter your details
                      </Typography>
                    </Box>
                  </Box>
                  {/* forms */}

                  <LoginForm />
                </Box>
              </Box>
              <Footer />
            </Box>

            {
              <Box className="right_container">
                <Box sx={{ padding: "0 10%" }}>
                  <Box sx={{ textAlign: "right" }}>
                    <img src={LoginStar} alt="stars" width={55} height={55} />
                  </Box>
                  <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Typography
                      component="h6"
                      variant="h6"
                      fontSize={14}
                      my={2}
                      sx={{ color: "#EAECF0" }}
                    >
                      Nice to see you again.
                    </Typography>
                    <Typography
                      component="h2"
                      variant="h2"
                      my={3}
                      className="login_image_inner_text"
                    >
                      WELCOME BACK
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      fontSize={14}
                      my={2}
                      sx={{ color: "#ccc" }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ad debitis autem
                      explicabo repellendus nesciunt veritatis sed assumenda cumque aliquam?
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ width: "100%", justifyContent: "center" }}
                    >
                      <Box>
                        <img
                          src={UserImages}
                          alt="users"
                          style={{
                            objectFit: "cover",
                          }}
                          height={30}
                          width={100}
                        />
                      </Box>
                      <Box fontSize={12} color="#EAECF0">
                        Join 40,000+ Users
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        position: "absolute",
                        left: "-34%",
                        bottom: "-55%",
                      }}
                    />
                  </Box>
                  <Box>
                    <img src={LoginStar} alt="stars" width={55} height={55} />
                  </Box>
                </Box>
              </Box>
            }
          </Box>
        </Box>
      </Box>
    </AuthenticationStyles>
  );
}

export default Login;
