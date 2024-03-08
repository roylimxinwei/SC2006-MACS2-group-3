import React, { useState } from 'react';

const CuisineSelection = ({ cuisineOptions, onNext }) => {
  const [selected, setSelected] = useState(new Array(cuisineOptions.length).fill(false));
  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelect = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);

    const newSelectedCount = newSelected.filter(item => item).length;
    setSelectedCount(newSelectedCount);
  };

  return (
    <div className="CuisineSelection">
      <h2>Select your favourite cuisines : Choose a minimum of 3</h2>
      <div className="cuisine-grid">
        {cuisineOptions.map((item, index) => (
          <div
            key={index}
            className={`cuisine-option ${selected[index] ? 'selected' : ''}`}
            onClick={() => handleSelect(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <p>Selected: {selectedCount}</p>
      <button className="next-button" disabled={selectedCount < 3} onClick={onNext}>Next</button>
    </div>
  );
};

const cuisineOptions = [
  'French',
  'Italian',
  'Japanese',
  'Chinese',
  'Vietnamese',
  'Vegetarian',
];

function PreferencePage1() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="App">
      {step === 1 && <CuisineSelection cuisineOptions={cuisineOptions} onNext={handleNext} />}
      {step === 2 && <div>Step 2</div>}
      {step === 3 && <div>Step 3</div>}
    </div>
  );
}

export default PreferencePage1;