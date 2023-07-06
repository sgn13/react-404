import { ConnectedProps, connect } from "react-redux";
// import Layout from 'src/layouts/common/Index';
import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormikBase from "src/components/FormikBase/FormikBase";
import Stepper from "src/components/Stepper/Stepper";
import api from "src/constants/api";
import styled from "src/lib/mui/styled";
import { AppState } from "src/store/reducer";
import network from "src/utils/network";
import AIModel from "./components/AIModel";
import Data from "./components/Data";
import Environment from "./components/Environment";
import Features from "./components/Features";
import Train from "./components/Train";

const StyledDiv = styled("div")(({ theme }) => ({}));
const Hidden = styled("div")(({ show }: { show?: boolean }) => ({
  display: show ? "block" : "none",
}));

const stepData = [
  { id: 1, name: "Training Dataset", position: 1, icon: "" },
  { id: 3, name: "AI Model", position: 3, icon: "" },
  { id: 2, name: "Features", position: 2, icon: "" },
  { id: 4, name: "Environment", position: 4, icon: "" },
  { id: 5, name: "Train", position: 5, icon: "" },
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
let tunnelId: any = null;
// nextstep to currentstep
function Index({ reduxTheme }: PropsFromRedux) {
  const [steps, setSteps] = useState([]);
  const [nextStep, setNextStep] = useState(null);
  const [isPipeSubmitting, setIsPipeSubmitting] = useState(false);

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
      if (next && nextStep?.name === "Environment") {
        const featureIdsInOrder = values.features.map((item) => item.id);
        const response = {
          name: `default-name-${new Date().getTime()}`,
          fes_order: featureIdsInOrder,
          ml_model: values.model.id,
          prediction_variable: "default-prediction-variable",
          build_path: "default-build-path",
          environment: values.environment?.id,
          data: values?.fileUpload?.id,
        };
        setIsPipeSubmitting(true);
        const { data, status } = await network({}).post(api.mlPipe.root, [response]);
        tunnelId = data?.tunnel_id;
        if (data) {
          setIsPipeSubmitting(false);
          setNextStep(next);
        }
        return;
      }

      if (next) setNextStep(next);
    } catch (err) {
      console.log("error while moving next", err);
      setIsPipeSubmitting(false);
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

  return (
    <StyledDiv>
      <Typography variant="h5" gutterBottom={1} sx={{ color: "#143467c9" }}>
        Train your AI Model
      </Typography>
      <Stepper
        steps={steps}
        isChecked={isChecked}
        nextStepId={nextStep === NO_NEXT_STEP ? steps[-1]?.id : nextStep?.id}
      />
      <FormikBase
        initialValues={{
          fileUpload: "",
          features: [],
          model: "",
          environment: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          try {
          } catch (err) {
            console.error("formik submit error", err);
          }
        }}
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
                  <Hidden show={nextStep?.name === "Training Dataset"}>
                    <Data
                      name="fileUpload"
                      setFieldValue={setFieldValue}
                      value={values.fileUpload}
                    />
                  </Hidden>
                  <Hidden show={nextStep?.name === "Features"}>
                    <Features
                      name="features"
                      setFieldValue={setFieldValue}
                      value={values.features}
                    />
                  </Hidden>
                  <Hidden show={nextStep?.name === "AI Model"}>
                    <AIModel name="model" setFieldValue={setFieldValue} value={values.model} />
                  </Hidden>
                  <Hidden show={nextStep?.name === "Environment"}>
                    <Environment
                      name="environment"
                      setFieldValue={setFieldValue}
                      value={values.environment}
                    />
                  </Hidden>
                  <Hidden show={nextStep?.name === "Train"}>
                    <Train
                      nextStep={nextStep}
                      setFieldValue={setFieldValue}
                      setNextStep={setNextStep}
                      next={getNextItem()}
                      noNextStep={NO_NEXT_STEP}
                      tunnelId={tunnelId}
                    />
                  </Hidden>
                </div>
              </Paper>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <Button variant="outlined" onClick={() => handlePrev(values)}>
                  prev
                </Button>
                <Button
                  variant="outlined"
                  disabled={isPipeSubmitting}
                  onClick={() => handleNext(values)}
                >
                  {isPipeSubmitting ? "Processing" : "next"}
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
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Index);
