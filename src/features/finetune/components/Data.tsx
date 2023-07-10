import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { AppState } from "src/store/reducer";
import { fetchFileUploads } from "src/store/source/fileUpload/actions";

function Data({
  fileuploads,
  isLoading,
  fetchFileUploads,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchFileUploads({ query: { perPage: 90 } });
  }, []);

  return (
    <Grid item>
      <Label htmlFor="code_type">Dataset</Label>
      <FormGroup className="input-holder">
        <ReactSelect
          onChange={(selected) => {
            setFieldValue(name, selected);
          }}
          selectedValue={undefined}
          keyname="name"
          options={fileuploads?.items || []}
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
