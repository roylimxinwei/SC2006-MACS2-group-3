import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CuisineItem from "./CuisineItem";
import Slider from "./Slider";
import Switch from "./Switch";

const PreferencePage1 = ({ navigation }) => {
  const [cuisines, setCuisine] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSavePress = () => {
    // Save the preferences to the server or local storage
    console.log("Preferences saved:", {
      username,
      cuisines,
      ratings,
      sliderRestaurantState,
      sliderProximityState,
      isEnabled,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.viewProfile}>
      <View style={styles.detailContainer}>
        <Image
          source={require("../assets/profileicon.png")}
          style={styles.ImageDesign}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={editProfile}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.headerText}>Your Preferences:</Text>
      </View>

      <CuisineItem
        name="Cuisine"
        items={[
          { label: "Fast Food", value: "fast_food" },
          { label: "Ramen", value: "ramen" },
          { label: "Salad", value: "salad" },
        ]}
        value={cuisines}
        setValue={setCuisine}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginBottom: 20,
  },
  ImageDesign: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
  },
});

export default PreferencePage1