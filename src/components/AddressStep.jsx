/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Typography,
  Box,
  Card,
  TextField,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Form component has 2 input fields and will be added everytime when add or + button is clicked, also a feature to delete a particular address
const FormComponent = ({
  index,
  formData,
  onChange,
  onRemove,
  onAdd,
  showRemoveButton,
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(index, { ...formData, [name]: value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-around",
      }}
    >
      <TextField
        name="address1"
        label="Address Field 1"
        value={formData.address1}
        onChange={handleInputChange}
        fullWidth
        variant="filled"
      />
      <TextField
        name="address2"
        label="Address Field 2"
        value={formData.address2}
        onChange={handleInputChange}
        fullWidth
        variant="filled"
      />
      {showRemoveButton ? (
        <IconButton onClick={() => onRemove(index)}>
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
      ) : (
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default function AddressStep({ handleNext, handleBack }) {
  const [forms, setForms] = useState([{ address1: "", address2: "" }]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // handling event for adding or deleting form data
  const handleAddForm = () => {
    setForms([...forms, { address1: "", address2: "" }]);
  };

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleFormChange = (index, formData) => {
    const updatedForms = [...forms];
    updatedForms[index] = formData;
    setForms(updatedForms);
  };
  // Form input validation there should be atleast one address form that has 2 values added, other adddresses are optional
  const handleValidateInputFields = () => {
    if (!forms || !forms[0].address1 || !forms[0].address2) {
      setSnackbarOpen(true);
      return;
    }
    return handleNext();
  };

  return (
    <Box sx={{ minWidth: 275, width: "70%", margin: "auto" }}>
      <Card
        variant="outlined"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: "4vh",
        }}
      >
        <Typography>Address</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
          {forms.map((formData, index) => (
            <FormComponent
              key={index}
              index={index}
              formData={formData}
              onChange={handleFormChange}
              onRemove={handleRemoveForm}
              onAdd={handleAddForm}
              showRemoveButton={forms.length > 1 && index !== forms.length - 1}
            />
          ))}
        </Box>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleValidateInputFields}>
          Next
        </Button>
      </Box>
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
