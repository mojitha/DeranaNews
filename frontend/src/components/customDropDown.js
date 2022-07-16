import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomDropDown({
  items,
  label,
  isRequired,
  dropDownId,
  onChange,
}) {
  const [value, setValue] = React.useState("");

  const handleSelectChange = (event) => {
    console.log(event.target);
    onChange(event);
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required={isRequired}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={dropDownId}
          name={dropDownId}
          value={value}
          label={label}
          onChange={(event) => handleSelectChange(event)}
        >
          {items.map((item, index) => (
            <MenuItem value={item._id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
