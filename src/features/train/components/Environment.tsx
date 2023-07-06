import { FormGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchEnvironments } from "src/store/environment/actions";
import { AppState } from "src/store/reducer";

function Environment({
  environments,
  isLoading,
  fetchEnvironments,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; name?: any; value?: any }) {
  useEffect(() => {
    fetchEnvironments({ query: { perPage: 90 } });
  }, []);
  return (
    <Grid item>
      <Label htmlFor="code_type">Select Runtime Environment</Label>
      <FormGroup className="input-holder">
        <ReactSelect
          onChange={(selected) => {
            setFieldValue(name, selected);
          }}
          selectedValue={undefined}
          keyname="name_or_tag"
          options={environments?.items || []}
        />
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ environmentState: { environments, isLoading } }: AppState) => ({
  environments,
  isLoading,
});

const mapDispatchToProps = { fetchEnvironments };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Environment);
