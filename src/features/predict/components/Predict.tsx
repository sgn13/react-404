import { Button, Stack, Typography } from "@mui/material";

function Predict({
  nextStep,
  setFieldValue,
  setNextStep,
  values,
  next,
  isPredicting,
  result,
}: any) {
  return (
    <Stack>
      {result ? (
        <Typography variant="body2">{result}</Typography>
      ) : (
        <Button type="submit" variant="contained">
          {isPredicting ? "Predicting..." : "Predict"}
        </Button>
      )}
    </Stack>
  );
}

export default Predict;
