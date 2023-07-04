import { Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
// import Layout from 'src/layouts/common/Index';
import styled from "src/lib/mui/styled";
import { AppState } from "src/store/reducer";
import { setTheme, toggleLightDarkTheme } from "src/store/theme/actions";

const StyledDiv = styled("div")(({ theme }) => ({}));

function Index({ reduxTheme }: PropsFromRedux) {
  return (
    <StyledDiv>
      <Typography variant="h5" gutterBottom={1} sx={{ color: "#143467c9" }}>
        AI Powered Prediction System
      </Typography>
    </StyledDiv>
  );
}

const mapStateToProps = ({ themeState: { theme: reduxTheme } }: AppState) => ({
  reduxTheme,
});

const mapDispatchToProps = {
  toggleLightDarkTheme,
  setTheme,
};
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Index);
