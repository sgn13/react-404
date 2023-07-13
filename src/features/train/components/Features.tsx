import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import { fetchFeatures } from "src/store/feature/actions";
import { AppState } from "src/store/reducer";
import VariableInputTable from "./VariableInput";

const dummyFeatures = [
  {
    id: 20,
    name: "split feature and predictor",
    source:
      "/Users/adarsharegmibraintip.ai/Desktop/VI86_Full/VI86/fastapi-be/file_configuration/config16.py",
    effective_from: "2023-07-07T23:37:00+00:00",
    effective_to: "2023-07-07T23:37:00+00:00",
    status: true,
    deleted: false,
    code_type: "functionless",
    output_variable: "split",
    class_name: "",
    module_name: "",
    variables: ["Apple", "Ball"],
  },
  {
    id: 22,
    name: "Scalar data",
    source:
      "/Users/adarsharegmibraintip.ai/Desktop/VI86_Full/VI86/fastapi-be/file_configuration/config18.py",
    effective_from: "2023-07-07T23:38:00+00:00",
    effective_to: "2023-07-07T23:38:00+00:00",
    status: true,
    deleted: false,
    code_type: "functionless",
    output_variable: "X_train",
    class_name: "",
    module_name: "",
    variables: ["Cat", "Dog"],
  },
];

function Feature({
  features,
  isLoading,
  fetchFeatures,
  setFieldValue,
  values,
  name,
}: PropsFromRedux & { setFieldValue?: any; values?: any; name?: any }) {
  const [groupedVars, setGroupedVars] = useState([]);

  useEffect(() => {
    fetchFeatures({ query: { perPage: 90 } });
  }, []);

  useEffect(() => {
    if (!values[name]) return;
    const vars = values[name].map((item) => item.variables).flat(2);
    setGroupedVars(vars);
  }, [values[name]]);

  return (
    <Grid item>
      <Label htmlFor="code_type">Select Features of the dataset</Label>
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
      {values[name]?.length ? (
        <FormGroup>
          <VariableInputTable
            name="featureVariables"
            // variables={values[name].map((item) => item.variables).flat(2)}
            variables={groupedVars}
            setFieldValue={setFieldValue}
          />
        </FormGroup>
      ) : null}
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
