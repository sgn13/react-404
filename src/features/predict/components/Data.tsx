import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import FileInput from "src/components/FileInput";
import Label from "src/components/Label";
import { AppState } from "src/store/reducer";
import { fetchFileUploads } from "src/store/source/fileUpload/actions";

function Data({
  fileuploads,
  isLoading,
  fetchFileUploads,
  setFieldValue,
  values,
  name,
  errors,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchFileUploads({});
  }, []);

  return (
    <Grid item xs={12}>
      <Label htmlFor={name} required>
        Source
      </Label>

      <FormGroup className="input-holder">
        <FileInput
          id={name}
          name={name}
          accept="application/json,.csv"
          // editData={editData}
          onChange={(event) => {
            const { files } = event.target;
            const file = files[0];
            setFieldValue(name, file);
          }}
          placeholder="Choose file"
          size="small"
          disabled
          fullWidth
          values={values}
          value={values?.[name]?.name}
          error={Boolean(errors?.[name])}
          errors={errors}
        />
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ fileUploadState: { fileuploads, isLoading } }: AppState) => ({
  fileuploads,
  isLoading,
});

const mapDispatchToProps = { fetchFileUploads };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Data);
