import { storiesOf } from "@storybook/react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Stepper from "./Stepper";

const steps = [
  {
    name: "Basic",
    number: 1,
  },
  {
    name: "Contact",
    number: 2,
  },
  {
    name: "Education",
    number: 3,
  },
  {
    name: "Submit",
    number: 4,
  },
];

function StepperContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [nextStep, setNextStep] = useState(1);

  useEffect(() => {
    if (currentStep < steps.length) {
      setNextStep(currentStep + 1);
    } else {
      setNextStep(0);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (nextStep) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleStepClick = (step: any, index: number) => {
    setCurrentStep(step.number);
  };

  const isChecked = (step: any) =>
    currentStep !== 0 && step.number <= currentStep;

  return (
    <>
      <Stepper
        steps={steps}
        handleStepClick={handleStepClick}
        isChecked={isChecked}
        nextStep={nextStep}
      />
      <div
        className="field"
        style={{
          width: "100%",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Button
          text="Previous"
          size="md"
          elevation={0}
          color="white"
          onClick={handlePrevious}
        />
        <Button
          text="Next"
          size="md"
          elevation={0}
          color="white"
          onClick={handleNext}
        />
      </div>
    </>
  );
}

storiesOf("Components/Stepper", module).add("Demo", () => <StepperContainer />);
