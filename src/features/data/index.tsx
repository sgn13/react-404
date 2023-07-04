import { ConnectedProps, connect } from "react-redux";
// import Layout from 'src/layouts/common/Index';
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import app from "src/constants/app";
import styled from "src/lib/mui/styled";
import { AppState } from "src/store/reducer";
import { setTheme, toggleLightDarkTheme } from "src/store/theme/actions";

const StyledDiv = styled("div")(({ theme }) => ({}));

const dataSources = [
  { id: 1, name: "File Upload", icon: "", link: app.data.fileUpload },
  { id: 3, name: "Streaming", icon: "", link: app.data.streaming },
  { id: 2, name: "Database", icon: "", link: app.data.database },
];

const NO_NEXT_STEP = "no-next-step";
// nextstep to currentstep

function Index({ reduxTheme }: PropsFromRedux) {
  const navigate = useNavigate();
  return (
    <StyledDiv>
      <Typography variant="h5" gutterBottom={1} sx={{ color: "#143467c9" }}>
        Provide the data to the system
      </Typography>
      <Stack direction="row" gap={5} sx={{ marginTop: 5 }}>
        {dataSources?.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              width: 200,
              height: 100,
              borderRadius: 4,
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(item.link)}
          >
            <div>{item?.name}</div>
          </div>
        ))}
      </Stack>
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
