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
  values,
}: {
  nextStep?: any;
  setFieldValue?: any;
  setNextStep?: any;
  next?: any;
  noNextStep?: string;
  tunnelId?: string;
  values?: any;
}) {
  const [isTraining, setIsTraining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTrain = async () => {
    try {
      if (nextStep?.name === "Train") {
        setIsSubmitting(true);
        const { data, status } = await network({}).post(api.mlPipeBuild.root, {
          tunnel_id: tunnelId,
          feature_vars: values.featureVariables,
          model_vars: values.modelVariables,
        });
        if (status === 200 || (status > 200 && status < 300)) {
          setIsTraining(true);
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {" "}
      {isTraining ? (
        <Box>
          <Typography variant="body2">Training of the model started at the server</Typography>
        </Box>
      ) : (
        <Button type="submit" variant="contained" onClick={handleTrain}>
          {isSubmitting ? "Submitting..." : "Train"}
        </Button>
      )}
    </div>
  );
}

export default Train;
