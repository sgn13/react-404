import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchPipelines } from "src/store/pipeline/actions";
import { AppState } from "src/store/reducer";

function Pipeline({
  pipelines,
  isLoading,
  fetchPipelines,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchPipelines({ query: { perPage: 90 } });
  }, []);

  return (
    <Grid item>
      <Label htmlFor="code_type">Select Your Pipeline</Label>
      <FormGroup className="input-holder">
        <ReactSelect
          onChange={(selected) => {
            setFieldValue(name, selected);
          }}
          // selectedValue={undefined}
          keyname="name"
          options={pipelines?.items || []}
        />
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ pipelineState: { pipelines, isLoading } }: AppState) => ({
  pipelines,
  isLoading,
});

const mapDispatchToProps = { fetchPipelines };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pipeline);
