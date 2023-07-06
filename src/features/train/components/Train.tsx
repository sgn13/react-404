import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
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
  const [isTraining, setIsTraining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTrain = async () => {
    try {
      if (nextStep?.name === "Train") {
        setIsSubmitting(true);
        const { data, status } = await network({}).post(api.mlPipeBuild.root, {
          tunnel_id: tunnelId,
        });
        if (status === 200 || (status > 200 && status < 300)) {
          setIsTraining(true);
          setIsSubmitting(false);
        }
        console.log("train res data", data);
      }
    } catch (err) {
      console.log("error", err);
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {" "}
      <Button type="submit" variant="contained" onClick={handleTrain}>
        {isSubmitting ? "Submitting..." : "Train"}
      </Button>
      <Box>
        <Typography variant="body2">Training of the model started at the server</Typography>
      </Box>
    </div>
  );
}

export default Train;
