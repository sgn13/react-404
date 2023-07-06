import { Button } from "@mui/material";
import api from "src/constants/api";
import network from "src/utils/network";

function Train({
  setFieldValue,
  nextStep,
  setNextStep,
  next,
  noNextStep,
  tunnelId,
}: {
  nextStep?: any;
  setFieldValue?: any;
  setNextStep?: any;
  next?: any;
  noNextStep?: string;
  tunnelId?: string;
}) {
  const handleTrain = async () => {
    if (nextStep?.name === "Train") {
      const { data, status } = await network({}).post(api.mlPipeBuild.root, {
        tunnel_id: tunnelId,
      });
      console.log("train res data", data);
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
