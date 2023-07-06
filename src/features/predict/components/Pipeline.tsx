import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchPipelines } from "src/store/pipeline/actions";
import { AppState } from "src/store/reducer";

const dummyPipelines = [
  { id: 1, name: "Pipeline 1" },
  { id: 2, name: "Pipeline 2" },
  { id: 3, name: "Pipeline 3" },
  { id: 4, name: "Pipeline 4" },
];

function Pipeline({
  pipelines,
  isLoading,
  fetchPipelines,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchPipelines({});
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
