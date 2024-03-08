import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";


// Define your data
const iconsData = [
  {
    id: 1,
    name: 'icon-1',
    category: 'Category 1',
    isSelected: false,
  },
  {
    id: 2,
    name: 'icon-2',
    category: 'Category 2',
    isSelected: false,
  },
  {
    id: 3,
    name: 'icon-3',
    category: 'Category 3',
    isSelected: false,
  },{
    id: 4,
    name: 'icon-4',
    category: 'Category 4',
    isSelected: false,
  },{
    id: 5,
    name: 'icon-5',
    category: 'Category 5',
    isSelected: false,
  },
];

// Define your PreferenceIcon component
const PreferenceIcon = ({ icon, onClick }) => (
  <div
    className={`preference-icon ${icon.isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <i className={icon.name} />
    <p>{icon.category}</p>
  </div>
);

// Define your PreferencesPage component
const PreferencePage = ({ navigation }) => {
  const [icons, setIcons] = useState(iconsData);

  const handleIconClick = (id) => {
    setIcons(
      icons.map((icon) =>
        icon.id === id ? { ...icon, isSelected: !icon.isSelected } : icon
      )
    );
  };

  const hasSelectedIcons = icons.some((icon) => icon.isSelected);

  return (
    <div className="preferences-page">
      <div className="preference-icons">
        {icons.map((icon) => (
          <PreferenceIcon
            key={icon.id}
            icon={icon}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>
      <button className="next-button" disabled={!hasSelectedIcons}>
        Next
      </button>
    </div>
  );
};

// Define your CSS styles
const styles =  StyleSheet.create({
  {display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
},

preferenceicons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
},

preferenceicon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
},

icon:hover {
  background-color: #f5f5f5;
},

icon.selected {
  border-color: #4caf50;
  background-color: #e8f5e9;
},

iconi {
  font-size: 36px;
},

iconp {
  font-size: 14px;
  margin-top: 10px;
},
button {
  width: 100%;
  height: 50px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
},
button:hover {
  background-color: #3e8e41;
},
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
});

export default PreferencePage