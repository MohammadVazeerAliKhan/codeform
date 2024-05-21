/* eslint-disable react/prop-types */

import { useState } from "react";
import { TextField, Chip, Button, Typography, Card, Box } from "@mui/material";

export default function PayConfigurationStep() {
  const [levels, setLevels] = useState([
    {
      id: 1,
      selectedPeople: ["Ravi", "Ram", "Vishal Raj", "Abhi", "Rahul Raj"],
    },
  ]);

  const handleAddNewLevel = () => {
    setLevels([...levels, { id: levels.length + 1, selectedPeople: ["Ravi"] }]);
  };

  const handleSelectedPeopleChange = (index, selectedPeople) => {
    const updatedLevels = [...levels];
    updatedLevels[index].selectedPeople = selectedPeople;
    setLevels(updatedLevels);
  };

  return (
    <Box sx={{ minWidth: 275, width: "70%", margin: "auto" }}>
      <Typography>Pay Configuration</Typography>
      {levels.map((level, index) => (
        <Card
          key={level.id}
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "none",
            gap: "4vh",
          }}
        >
          <SelectedPeopleInput
            selectedPeople={level.selectedPeople}
            onChange={(selectedPeople) =>
              handleSelectedPeopleChange(index, selectedPeople)
            }
          />
        </Card>
      ))}
      <Button
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          border: "none",
          textTransform: "none",
          backgroundColor: "#bbdefb",
          mt: 2,
        }}
        onClick={handleAddNewLevel}
      >
        Add New Level
      </Button>
    </Box>
  );
}

const SelectedPeopleInput = ({ selectedPeople, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddPerson = () => {
    if (inputValue.trim() !== "") {
      onChange([...selectedPeople, inputValue]);
      setInputValue("");
    }
  };

  const handleRemovePerson = (personToRemove) => {
    onChange(selectedPeople.filter((person) => person !== personToRemove));
  };

  return (
    <Box sx={{ border: "1px solid lightgrey", margin: "20px" }}>
      <TextField
        variant="filled"
        label="Level 1 Approvers"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddPerson();
          }
        }}
        sx={{ padding: 0, borderBottom: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          padding: 0,
          margin: 0,
        }}
      >
        {selectedPeople.map((person, index) => (
          <Chip
            key={index}
            label={person}
            onDelete={() => handleRemovePerson(person)}
            sx={{
              color: "grey",
              backgroundColor: "white",
              border: "1px solid grey",
              margin: "4px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
