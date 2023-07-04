import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
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
    fetchModels({});
  }, []);

  return <div>Model Content</div>;
}

const mapStateToProps = ({ modelState: { models, isLoading } }: AppState) => ({
  models,
  isLoading,
});

const mapDispatchToProps = { fetchModels };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Model);
