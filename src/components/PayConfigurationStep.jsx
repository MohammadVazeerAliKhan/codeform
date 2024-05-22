/* eslint-disable react/prop-types */

import { useState } from "react";
import { TextField, Button, Typography, Chip, Card, Box } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function PayConfigurationStep() {
  const [levels, setLevels] = useState([
    {
      id: 1,
      selectedPeople: ["Ravi", "Ram", "Vishal Raj", "Abhi", "Rahul Raj"],
      chipSelected: [],
    },
  ]);

  const handleAddNewLevel = () => {
    setLevels([
      ...levels,
      { id: levels.length + 1, selectedPeople: ["Ravi"], chipSelected: [] },
    ]);
  };
  const handleChipSelectedChange = (index, chipSelected) => {
    const updatedLevels = [...levels];
    updatedLevels[index].chipSelected = chipSelected;
    setLevels(updatedLevels);
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
            chipSelected={level.chipSelected}
            onChange={(selectedPeople) =>
              handleSelectedPeopleChange(index, selectedPeople)
            }
            onChipDelete={(chipSelected) =>
              handleChipSelectedChange(index, chipSelected)
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

const SelectedPeopleInput = ({
  selectedPeople,
  onChange,
  chipSelected,
  onChipDelete,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  console.log("selectedPeople", selectedPeople);
  console.log("chipSelected", chipSelected);

  const handleAddPerson = () => {
    if (inputValue.trim() !== "") {
      onChange([...selectedPeople, inputValue]);
      setInputValue("");
    }
  };

  const handleRemovePerson = (personToRemove) => {
    console.log("handleRemovePerson function called");
    onChange([...selectedPeople, personToRemove]);
    onChipDelete(chipSelected.filter((person) => person !== personToRemove));
  };
  const handleSelectedValueChange = (e) => {
    onChipDelete([...chipSelected, e.target.value]);
    onChange(selectedPeople.filter((person) => person !== e.target.value));
    setSelectedValue(e.target.value);
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
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          value={selectedValue}
          onChange={(e) => handleSelectedValueChange(e)}
          label="Select"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {selectedPeople.map((person, index) => (
            <MenuItem key={index} value={person}>
              {person}
            </MenuItem>
          ))}
        </Select>
        {chipSelected.map((person, index) => (
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
