import { connect } from "react-redux";
// import Layout from 'src/layouts/common/Index';
import { Button, Paper, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import FormikBase from "src/components/FormikBase/FormikBase";
import Stepper from "src/components/Stepper/Stepper";
import api from "src/constants/api";
import styled from "src/lib/mui/styled";
import { AppState } from "src/store/reducer";
import network from "src/utils/network";
import toBase64 from "src/utils/toBase64";
import AIModel from "./components/AIModel";
import Data from "./components/Data";
import Predict from "./components/Predict";

const StyledDiv = styled("div")(({ theme }) => ({}));
const Hidden = styled("div")(({ show }: { show?: boolean }) => ({
  display: show ? "block" : "none",
}));

const stepData = [
  { id: 1, name: "Test Dataset", position: 1, icon: "" },
  { id: 2, name: "AI Model", position: 2, icon: "" },
  { id: 3, name: "Predict", position: 3, icon: "" },
];

// stepper component
// current step - algo ( highest position among submitted)
// next step - alog ( loweset position among not sumbitted)

const getHighestPositionItem = (items) => {
  if (items.length === 1) return items[0];
  let highest = items[0];
  items.forEach((item) => {
    if (item.position > highest.position) highest = item;
  });
  return highest;
};

const getLowestPositionItem = (items) => {
  if (items.length === 1) return items[0];
  let lowest = items[0];
  items.forEach((item) => {
    if (item.position < lowest.position) lowest = item;
  });
  return lowest;
};

const NO_NEXT_STEP = "no-next-step";
// nextstep to currentstep
function Index({ reduxTheme }: PropsFromRedux) {
  const [steps, setSteps] = useState([]);
  const [nextStep, setNextStep] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // setting next step
  useEffect(() => {
    if (!stepData) return;
    const clone = structuredClone(stepData);
    clone.sort((firstItem, secondItem) => (firstItem.position > secondItem.position ? 1 : -1));
    setSteps(clone);
    setNextStep(clone[0]);
  }, [stepData]);

  const isChecked = (index: number, step: any) =>
    nextStep === NO_NEXT_STEP ? true : step?.position < nextStep?.position;

  const getNextItem = () => {
    let next;
    if (!nextStep || nextStep === NO_NEXT_STEP) return next;
    const nextItemIndex = steps.findIndex((item) => item.position === nextStep.position);
    next = nextItemIndex < steps.length - 1 ? steps[nextItemIndex + 1] : NO_NEXT_STEP;
    return next;
  };

  const handleNext = async (values: any) => {
    try {
      const next = getNextItem();

      if (next) setNextStep(next);
    } catch (err) {
      console.log("error while moving next", err);
      setIsPredicting(false);
    }
  };

  const getPrevItem = (): any => {
    let prev;
    if (!nextStep) return prev;
    if (nextStep === NO_NEXT_STEP) {
      prev = steps[steps.length - 1];
      return prev;
    }
    const nextItemIndex = steps.findIndex((item) => item.position === nextStep.position);
    if (nextItemIndex === 0) return prev; // nextStep cannot go behind 0
    prev = steps[nextItemIndex - 1]; // prev is item just before nextItem
    return prev;
  };

  const handlePrev = (values: any) => {
    const prev = getPrevItem();
    if (prev) setNextStep(prev);
  };

  const handlePredict = async (values: any) => {
    const response = {
      name: "default-name",
      ml_model: values.model.id,
      data: values?.csvFile?.id,
    };
    setIsPredicting(true);
    const { data, status } = await network({}).post(api.predict, response);
    if (data) {
      setIsPredicting(false);
      setNextStep(next);
    }
  };

  return (
    <StyledDiv>
      <Typography variant="h5" gutterBottom={1} sx={{ color: "#143467c9" }}>
        Predict The Result
      </Typography>

      <Stepper
        steps={steps}
        isChecked={isChecked}
        nextStepId={nextStep === NO_NEXT_STEP ? steps[-1]?.id : nextStep?.id}
      />
      <FormikBase
        initialValues={{
          csvFile: "",
          model: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          console.log("formik submitting");
          try {
            if (nextStep?.name === "Predict") {
              const payload = {
                ...values,
                csv_file: values?.csvFile ? await toBase64(values.csvFile) : null,
                model: values.model?.id,
              };
              if (await network({}).post(api.predict, payload)) {
                formikHelpers.resetForm();
              }
            }
          } catch (err) {
            console.error("formik submit error", err);
          }
        }}
        // onReset={handleFormReset}
      >
        {(props: FormikProps<any>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
            setFieldValue,
            setFieldTouched,
          } = props;
          console.log({ values });
          return (
            <form
              className="assign-activity-form"
              onSubmit={handleSubmit}
              // onReset={handleReset}
              style={{ margin: ".8rem 0" }}
            >
              <Paper
                style={{
                  marginTop: 10,
                  padding: 8,
                  minHeight: "100px",
                  color: "gray",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    maxWidth: 500,
                    width: "100%",
                  }}
                >
                  <Hidden show={nextStep?.name === "Test Dataset"}>
                    <Data
                      name="csvFile"
                      setFieldValue={setFieldValue}
                      values={values}
                      value={values.csvFile}
                    />
                  </Hidden>
                  <Hidden show={nextStep?.name === "AI Model"}>
                    <AIModel name="model" setFieldValue={setFieldValue} value={values.model} />
                  </Hidden>

                  <Hidden show={nextStep?.name === "Predict"}>
                    <Predict
                      nextStep={nextStep}
                      setFieldValue={setFieldValue}
                      setNextStep={setNextStep}
                      values={values}
                      next={getNextItem()}
                    />
                  </Hidden>
                </div>
              </Paper>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                {nextStep?.name === "Predict" ? (
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setNextStep(steps[0]);
                      setFieldValue("model", "");
                      setFieldValue("csvFile", "");
                      // resetForm();
                    }}
                  >
                    Start
                  </Button>
                ) : null}

                <Button
                  variant="outlined"
                  disabled={isPredicting || nextStep?.name === "Predict"}
                  onClick={() => handlePrev(values)}
                >
                  prev
                </Button>
                <Button
                  variant="outlined"
                  disabled={
                    isPredicting ||
                    nextStep?.name === "Predict" ||
                    (nextStep?.name === "Test Dataset" && !values.csvFile)
                  }
                  onClick={() => handleNext(values)}
                >
                  {"next"}
                </Button>
              </div>
            </form>
          );
        }}
      </FormikBase>
    </StyledDiv>
  );
}

const mapStateToProps = ({ themeState: {} }: AppState) => ({});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Index);
