import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchFeatures } from "src/store/feature/actions";
import { AppState } from "src/store/reducer";

function Feature({
  features,
  isLoading,
  fetchFeatures,
  setFieldValue,
  value,
  name,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  useEffect(() => {
    fetchFeatures({});
  }, []);

  console.log({ features });
  return (
    <Grid item>
      <Label htmlFor="code_type" required>
        Code Type
      </Label>
      <FormGroup className="input-holder">
        <ReactSelect
          onChange={(selected) => {
            setFieldValue(name, selected);
          }}
          // selectedValue={undefined}
          keyname="name"
          options={features?.items || []}
          isMulti
        />
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ featureState: { features, isLoading } }: AppState) => ({
  features,
  isLoading,
});

const mapDispatchToProps = { fetchFeatures };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Feature);
