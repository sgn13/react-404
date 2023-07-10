import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "src/constants/api";
import network from "src/utils/network";

function Finetune({
  setFieldValue,
  nextStep,
  setNextStep,
  next,
  noNextStep,
  formikValues,
}: {
  nextStep?: any;
  setFieldValue?: any;
  setNextStep?: any;
  next?: any;
  noNextStep?: string;
  formikValues?: any;
}) {
  const [isFinetuning, setIsFinetuning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinetune = async () => {
    try {
      if (nextStep?.name === "Finetune") {
        setIsSubmitting(true);
        const featureIdsInOrder = formikValues.features.map((item) => item.id);
        const response = {
          fes_order: featureIdsInOrder,
          ml_model: formikValues.model.id,
          data: formikValues?.fileUpload?.id,
        };
        const { data, status } = await network({}).post(api.finetune, response);
        if (status === 200 || (status > 200 && status < 300)) {
          setIsFinetuning(true);
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      console.log("error", err);
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {" "}
      {isFinetuning ? (
        <Box>
          <Typography variant="body2">Finetuning of the model started at the server</Typography>
        </Box>
      ) : (
        <Button type="submit" variant="contained" onClick={handleFinetune}>
          {isSubmitting ? "Submitting..." : "Finetune"}
        </Button>
      )}
    </div>
  );
}

export default Finetune;
