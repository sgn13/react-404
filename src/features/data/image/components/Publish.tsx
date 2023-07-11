import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { createAnnotation } from "src/store/annotation/actions";
import { AppState } from "src/store/reducer";

function Train({
  setFieldValue,
  nextStep,
  setNextStep,
  next,
  noNextStep,
  values,
  resetForm,
  createAnnotation,
}: PropsFromRedux & {
  nextStep?: any;
  setFieldValue?: any;
  setNextStep?: any;
  next?: any;
  noNextStep?: string;
  values?: any;
  resetForm?: any;
}) {
  const [isTraining, setIsTraining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async () => {
    try {
      if (nextStep?.name === "Publish") {
        setIsSubmitting(true);
        const trainNumber = (Number(values.train) / 100) * values.annotations.length;
        const trainWithoutDecimal = Math.ceil(trainNumber);
        const trainDatasetImages: any = values.annotations.slice(0, trainWithoutDecimal);
        const validDatasetImages = values.annotations.slice(trainWithoutDecimal); // from trainDatasetImages to end of the array.
        const payload = {
          train: trainDatasetImages,
          valid: validDatasetImages,
        };
        if (await createAnnotation({ values: payload })) {
          setIsTraining(true);
          setIsSubmitting(false);
          resetForm();
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
      {isTraining ? (
        <Box>
          <Typography variant="body2">
            Image Annotations have been successfully published !
          </Typography>
        </Box>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper sx={{ width: "fit-content", padding: 4 }}>
            <Typography variant="body1">Project Name: {values.projectName}</Typography>
            <Typography variant="body2">
              No. of Annotated Images: {values.annotations?.length}
            </Typography>

            <Button type="submit" variant="contained" onClick={handlePublish}>
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ appState: {} }: AppState) => ({});
const mapDispatchToProps = {
  createAnnotation,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Train);
