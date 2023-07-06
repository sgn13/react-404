import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchModels } from "src/store/model/actions";
import { AppState } from "src/store/reducer";

function Model({
  models,
  isLoading,
  fetchModels,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchModels({ query: { perPage: 90 } });
  }, []);

  return (
    <Grid item>
      <Label htmlFor="code_type">Select Your AI Model</Label>
      <FormGroup className="input-holder">
        <ReactSelect
          onChange={(selected) => {
            setFieldValue(name, selected);
          }}
          // selectedValue={undefined}
          keyname="name"
          options={models?.items || []}
        />
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ modelState: { models, isLoading } }: AppState) => ({
  models,
  isLoading,
});

const mapDispatchToProps = { fetchModels };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Model);
