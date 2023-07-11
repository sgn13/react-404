import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Input from "src/components/Input";
import Label from "src/components/Label";
import { AppState } from "src/store/reducer";
import { fetchFileUploads } from "src/store/source/fileUpload/actions";

function Data({
  fileuploads,
  isLoading,
  fetchFileUploads,
  setFieldValue,
  name,
  values,
  errors,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchFileUploads({ query: { perPage: 90 } });
  }, []);

  return (
    <Grid item>
      <Label htmlFor={name} required>
        Provide the name for the project.
      </Label>

      <FormGroup className="input-holder">
        <Input
          id={name}
          type="text"
          placeholder="Project Name"
          size="small"
          fullWidth
          name={name}
          onChange={(e: any) => setFieldValue(name, e.target.value)}
          value={values.name}
          error={Boolean(errors.name)}
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
