import { Button } from "@mui/material";
import api from "src/constants/api";
import network from "src/utils/network";

function Train({
  setFieldValue,
  nextStep,
  setNextStep,
  next,
}: {
  nextStep?: any;
  setFieldValue?: any;
  setNextStep?: any;
  next?: any;
}) {
  const handleTrain = async () => {
    if (nextStep?.name === "Train") {
      const { data, status } = await network({}).post(api.mlPipeBuild.root);
      if (data) setNextStep(next);
    }
  };
  return (
    <div>
      {" "}
      <Button type="submit" variant="contained" onClick={handleTrain}>
        Train
      </Button>
    </div>
  );
}

export default Train;
