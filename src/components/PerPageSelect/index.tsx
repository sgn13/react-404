import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import selectArrow from "src/assets/icons/select-arrow.svg";
import defaultFont from "src/constants/css/font";

export const rowsPerPageOptions = [5, 10, 25, 50, 100];
export default function PerPageSelect({ rowsPerPage = 5, setRowsPerPage, fetchData }) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedSize = event.target.value;
    setRowsPerPage(selectedSize as string);
    fetchData({ query: { perPage: Number(selectedSize), page: 1 } });
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1ch",
            color: "GrayText",
            fontFamily: defaultFont,
          }}
        >
          <Typography sx={{ fontFamily: defaultFont }} typography={"paragraph"}>
            Show
          </Typography>{" "}
          <Select
            value={rowsPerPage}
            onChange={handleChange}
            autoWidth
            disableUnderline
            variant="standard"
            IconComponent={() => (
              <img
                src={selectArrow}
                alt="select arrow"
                width={24}
                height={24}
                style={{ padding: 6 }}
              />
            )}
            inputProps={{
              "aria-label": "Without label",
              border: "none",
            }}
            sx={{
              width: 55,
              backgroundColor: "#F0F0F0",
              color: "#686868",
              borderRadius: "2px",
              boxShadow: "none",
              paddingRight: 0,
              textAlign: "center",
              fontFamily: defaultFont,
              ".MuiSelect-select.MuiSelect-standard": {
                paddingRight: "0px !important",
                paddingLeft: "2px",
              },
            }}
          >
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"10"}>10</MenuItem>
            <MenuItem value={"20"}>20</MenuItem>
            <MenuItem value={"50"}>50</MenuItem>
          </Select>
          <Typography typography={"paragraph"} style={{ fontFamily: defaultFont }}>
            entries
          </Typography>
        </Box>
      </FormControl>
    </Box>
  );
}
