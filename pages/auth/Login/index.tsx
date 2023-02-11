import React from "react";
import loginImage from "assets/images/login-left-image.svg";
import logo from "assets/logo.png";
import { login } from "store/app/actions";
import { ConnectedProps, connect } from "react-redux";
import { AppState } from "store/reducer";
import styled from "styled-components";
import { Box, Col, Container, Row } from "containers/Grid/Grid";
import { PageContainer } from "containers/Content";
import niceIcon from "assets/icons/nice.svg";
import { primary } from "theme";
import { AuthForm } from "./AuthForm";
import { useLocation, useNavigate } from "react-router-dom";

const LogoHolder = styled.div`
  max-width: 220px;
  width: 100%;
  position: absolute;
  top: 15px;
`;

const ImageHolder = styled.div`
  max-width: 220px;
  width: 100%;
  position: absolute;
  bottom: 55px;
`;

const LeftSection = styled.section`
  position: relative;
  height: 100vh;
  max-height: 600px;
  background-color: ${primary};
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  /* identical to box height */

  color: #0d1d54;
`;

const Caption = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 24px;

  color: #404b7c;

  margin-bottom: 2rem;
`;

/* eslint-disable-next-line */
function Index({ login, isSubmitting }: PropsFromRedux) {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <PageContainer>
      <Container fullHeight centerHorizontally centerVertically>
        <Box
          style={{
            width: "992px",
            boxShadow:
              "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Row>
            <Col sm={4}>
              <LeftSection>
                <LogoHolder>
                  <img src={logo} alt="Logo" style={{ width: "inherit" }} />
                </LogoHolder>
                <ImageHolder>
                  <img src={loginImage} alt="Login" style={{ width: "inherit" }} />
                </ImageHolder>
              </LeftSection>
            </Col>
            <Col sm={8}>
              <Box style={{ maxWidth: 400, marginLeft: "4rem", marginTop: "6rem" }}>
                <Heading>
                  Login <img src={niceIcon} alt="nice" width="12px" />{" "}
                </Heading>
                <Caption>Welcome to Prabhu KYC System</Caption>
                <AuthForm
                  isSubmitting={isSubmitting}
                  elements={{
                    email: true,
                    password: true,
                    confirmPassword: false,
                    oldPassword: false,
                    username: false,
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    const formData = new FormData();
                    formData.append("email", values.email);
                    formData.append("password", values.password);
                    if (await login({ values: formData })) {
                      const redirectTo = state?.from || "/";
                      navigate(redirectTo);
                      resetForm();
                    }
                  }}
                />
              </Box>
            </Col>
          </Row>
        </Box>
      </Container>
    </PageContainer>
  );
}

const mapStateToProps = ({ appState: { me, isSubmitting } }: AppState) => ({
  me,
  isSubmitting,
});

const mapDispatchToProps = {
  login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Index);
