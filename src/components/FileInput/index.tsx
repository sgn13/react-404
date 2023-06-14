import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useReactTheme } from "src/containers/ReactThemeProvider/ReactThemeProvider";
// import { lato } from "src/fonts";
import styled from "src/lib/mui/styled";
import { getFileNameFromUrl } from "src/utils";

const BrowseButton = styled(Button)`
  font-family: "Lato";
  text-transform: none;
  font-weight: 600;
  border: 1px solid gray;
  width: 150px;
`;

function FileInput({
  id,
  name,
  editData,
  values,
  errors,
  onChange,
  ...rest
}: {
  id: any;
  name?: any;
  editData?: any;
  values?: any;
  errors?: any;
  onChange?: (arg?: any) => void;
  rest?: any;
}) {
  const { theme } = useReactTheme();
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} gap={1} sx={{ marginTop: 0.5 }}>
        <label htmlFor={`file-upload-${id}`}>
          <input
            id={`file-upload-${id}`}
            name=""
            type="file"
            accept="application/json,.py"
            hidden
            onChange={onChange}
          />
          <BrowseButton component="div">Browse</BrowseButton>
        </label>

        {editData && !values?.[id] ? (
          <a
            href={values.path}
            target="_blank"
            style={{ color: theme.palette.primary.light }}
            rel="noreferrer"
          >
            {`Download ${getFileNameFromUrl(values.path)}`}
          </a>
        ) : (
          <TextField
            id={id}
            name={name}
            type="text"
            {...rest}
            sx={{
              backgroundColor: "#f6f9fba2",
            }}
          />
        )}
      </Stack>

      {errors?.[id] ? (
        <FormHelperText error id="file-upload">
          {errors?.[id]}
        </FormHelperText>
      ) : null}
    </div>
  );
}

export default FileInput;
