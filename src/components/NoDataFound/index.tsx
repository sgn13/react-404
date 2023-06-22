import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import NoDataFoundImg from "src/assets/images/no_data_found.svg";

interface NoDataFoundProps {
  link?: string;
  title?: string;
  isButtonDisplayed?: boolean;
}

export default function NoDataFound({ link, title, isButtonDisplayed }: NoDataFoundProps) {
  const navigateHandler = () => {
    // link && navigate(link);
  };

  return (
    <Stack
      sx={{ width: "100%", mt: 8, fontFamily: "Poppins" }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Box>
          <img src={NoDataFoundImg} alt="no_data_found" width={300} height={300} />
        </Box>

        <Box sx={{ color: "#384874", fontSize: "19px", mt: 2.5, fontWeight: 600 }}>
          {title} Data Not Found
        </Box>
        <Box sx={{ color: "#475467;", fontSize: "15px", mt: 1, fontWeight: 300 }}>
          {/* Add Your new {title?.charAt(0).toLocaleLowerCase() + title.slice(1)} here */}
        </Box>

        {isButtonDisplayed && (
          <Button
            onClick={navigateHandler}
            startIcon={<AddIcon />}
            sx={{
              background: "#33426A",
              color: "#fff",
              px: 2,
              mt: 3,
              "&:hover": {
                background: "#283352",
              },
            }}
          >
            {`Create ${title}`}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
