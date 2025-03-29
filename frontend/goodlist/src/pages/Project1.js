import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Project1() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <h2>Select a Flavor</h2>
      <Select
        value={selectedOption} // Use "value" instead of "defaultValue" to show current selection
        onChange={setSelectedOption}
        options={options}
        placeholder="Choose a flavor..."
      />

      {/* Display selected option */}
      {selectedOption && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          You selected: {selectedOption.label}
        </p>
      )}
    </div>
  );
}
