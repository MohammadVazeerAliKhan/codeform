import React, { useState, memo, lazy } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, Slide } from "@mui/material";

// Lazy loading for reducing load when initial rendering
// const PayConfigurationStep = lazy(() => import("./PayConfigurationStep"));
import PayConfigurationStep from './PayConfigurationStep'
const AddressStep = lazy(() => import("./AddressStep"));
const GeneralDetailsStep = lazy(() => import("./GeneralDetailsStep"));

// Description: Stepper with 3 steps and handling navigation between the pages
const steps = ["General Details", "Address", "Pay Configuration"];

const SubmitFormStepper = memo(function SubmitFormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveStep(0);
  };

  const modalStyle = {
    position: "absolute",
    bottom: "25%",
    right: "25%",
    width: "50%",
    bgcolor: "background.paper",
    borderTop: "2px solid #000",
    transform: "translate(50%,50%)",
    boxShadow: 24,
    p: 4,
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    handleNext();

    handleOpenModal();
  };

  // Component for each step with handling events as props
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <GeneralDetailsStep handleNext={handleNext} />
          </React.Suspense>
        );
      case 1:
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <AddressStep handleNext={handleNext} handleBack={handleBack} />;
          </React.Suspense>
        );
      case 2:
        return (
          // <React.Suspense fallback={<div>Loading...</div>}>
          <PayConfigurationStep handleNext={handleNext} />
          // </React.Suspense>
        );
      default:
        return "";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: "10vh" }}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleFinish}>FINISH</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              width: "70%",
              margin: "auto",
              justifyContent: "space-between",
            }}
          >
            {activeStep === steps.length - 1 && (
              <>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button variant="contained" onClick={handleFinish}>
                  Finish
                </Button>
              </>
            )}
          </Box>
        </React.Fragment>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
      >
        <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
          <Box sx={modalStyle}>
            <img src="/finishModal.PNG" alt="FinishModal" />
            <Typography
              id="simple-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "green" }}
            >
              Congratulations
            </Typography>
            <Typography id="simple-modal-description" sx={{ mt: 2 }}>
              Invite Link Successfully Sent to Rahul Raj
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ mt: 2 }}
            >
              Okay
            </Button>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
});

export default SubmitFormStepper;
