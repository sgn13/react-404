import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import Label from "src/components/Label";
import ReactSelect from "src/components/ReactSelect/ReactSelect";
import api from "src/constants/api";
import { fetchModels } from "src/store/model/actions";
import { AppState } from "src/store/reducer";
import network from "src/utils/network";

function Project({
  models,
  isLoading,
  fetchModels,
  setFieldValue,
  values,
  errors,
  name,
}: PropsFromRedux & { setFieldValue?: any; errors?: any; values?: any; name?: any }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, status } = await network({}).get(api.imagePrediction.imageProject);
        if (status === 200 || (status > 200 && status < 300)) {
          setProjects(data);
        }
      } catch (err) {
        console.log("my bad", err);
      }
    };

    fetchProjects();
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
          options={projects || []}
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

export default connector(Project);
