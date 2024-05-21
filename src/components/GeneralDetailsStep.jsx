import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Card,
  Snackbar,
  LinearProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// General Details Step has 2 sections in it each taking inputs name and dob, email and mobile using progress bar and perform event handling and input validations before proceeding to the next steps in each step

function getSteps() {
  return ["Step 1", "Step 2"];
}

// eslint-disable-next-line react/prop-types
export default function GeneralDetailsStep({ handleNext }) {
  const [progress, setProgress] = React.useState(50);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const steps = getSteps();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);

  const validateMobileNumber = (input) => {
    // Check if the input contains only numeric characters and has a length of 10
    return /^\d{10}$/.test(input);
  };

  const handleMobileNumberChange = (newValue) => {
    setMobileNumber(newValue);
    // Validate mobile number format
    setMobileNumberError(!validateMobileNumber(newValue));
  };

  const validateEmail = (input) => {
    // Regular expression pattern for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const handleEmailChange = (newValue) => {
    setEmail(newValue);
    // Validate email format
    setEmailError(!validateEmail(newValue));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleNextTab = () => {
    if (activeStep === 0 && (!name || !dob)) {
      setSnackbarOpen(true);
      return false;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    return true;
  };

  const handleProgress = () => {
    if (progress > 100) {
      if (
        activeStep === 1 &&
        (!email || !mobileNumber || emailError || mobileNumberError)
      ) {
        setSnackbarOpen(true);
        return;
      } else {
        return handleNext();
      }
    }
    const success = handleNextTab();
    if (success) {
      setProgress(150);
    }
  };

  const handleBackProgress = () => {
    if (progress > 100) {
      setProgress(50);
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <LinearProgress variant="determinate" value={progress} />
      <Card sx={{ paddingBottom: "6vh" }}>
        <Container maxWidth="sm">
          <Box>
            {activeStep === steps.length ? null : (
              <Box sx={{ marginTop: "8vh" }}>
                {activeStep === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      gap: "30px",
                    }}
                  >
                    <TextField
                      label="Name"
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      variant="filled"
                      required
                    />
                    <TextField
                      label="Date of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      required
                      fullWidth
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      error={emailError}
                      helperText={emailError ? "Invalid email format" : ""}
                      required
                      variant="filled"
                    />
                    <TextField
                      label="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => handleMobileNumberChange(e.target.value)}
                      error={mobileNumberError}
                      helperText={
                        mobileNumberError ? "Invalid mobile number" : ""
                      }
                      required
                      variant="filled"
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleBackProgress}
          disabled={progress === 50}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleProgress}>
          Next
        </Button>
      </Box>
      {/* Notifying user when validation events do not pass the conditions  */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Please add valid input data before proceeding!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
