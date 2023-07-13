import { Button, Stack, Typography } from "@mui/material";

const base64 = "";

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
        <div>
          {result?.output_type === "image" ? (
            <div>
              <img
                src={`data:image/jpeg;base64,${result?.data}`}
                width={500}
                height={330}
                alt="output"
              />
            </div>
          ) : (
            <Typography variant="body2">Output: {result?.data}</Typography>
          )}
          <Typography variant="body2">Log: {result?.log?.message}</Typography>
        </div>
      ) : (
        <Button type="submit" variant="contained">
          {isPredicting ? "Predicting..." : "Predict"}
        </Button>
      )}
    </Stack>
  );
}

export default Predict;
