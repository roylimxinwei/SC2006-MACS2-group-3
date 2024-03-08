import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../config/colors";


import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-switch';


const ViewProfile = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [cuisines, setCuisine] = useState("");
    const [ratings, setRatings] = useState("");
    const [sliderRestaurantState, setRestaurantSliderState] = React.useState(1);
    const [sliderProximityState, setProximitySliderState] = React.useState(0);

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [fromRestaurantValue, setFromRestaurantValue] = useState(0);
     const [toRestaurantValue, setToRestaurantValue] = useState(0);
     const [Restaurantvalue, setRestaurantValue] = useState(0);
  
    const editProfile = () => {
      navigation.navigate("editProfile"); // Replace 'HomePage' with your home screen route name
    };
  
    return (
    <View style={styles.viewProfile}>
      <View style={styles.detailContainer}>
        <Image
          source={require("../assets/profileicon.png")}
          style={styles.ImageDesign}
        />
            <View style={styles.profileDetails}>
                <Text style={styles.username}>Wei Yang</Text>
                <TouchableOpacity >
                <Text style={styles.editProfile}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
      </View>

      <View style={styles.detailContainer}>
                <Text style={styles.headerText}>Your Preferences:</Text>
      </View>

      <View style={styles.detailContainer}>
                <Text style={styles.sectionText}>Cuisine:</Text>
      </View>

        
        <View style ={styles.ImageContainer}>
        <TouchableOpacity style={styles.TouchableImage}>
        <Image
            source={require("../assets/fastfood.png")}
            style={styles.FoodDesign}
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.TouchableImage}>
            <Image
            source={require("../assets/ramen.png")}
            style={styles.FoodDesign}
            />
             </TouchableOpacity>

      < TouchableOpacity style={styles.TouchableImage}>
            <Image
            source={require("../assets/salad.png")}
            style={styles.FoodDesign}
            />
             </TouchableOpacity>
        </View>

      <View style={styles.detailContainer}>
             <Text style={styles.sectionText}>Restaurant Ratings: {sliderRestaurantState} Stars</Text>
      </View>

      <View style={styles.slider}>
        <Slider
      style={styles.rangeSlider}
      minimumValue={1}
      maximumValue={5}
      step={1}
      value={sliderRestaurantState}
      onValueChange={(value) => setRestaurantSliderState(value)}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#DC4731"
/>
    </View>

    <View style={styles.detailContainer}>
             <Text style={styles.sectionText}>Proximity: {sliderProximityState}m</Text>
      </View>

      <View style={styles.slider}>
        <Slider
      style={styles.rangeSlider}
      minimumValue={0}
      maximumValue={250}
      step={10}
      value={sliderProximityState}
      onValueChange={(value) => setProximitySliderState(value)}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#DC4731"
/>
    </View>

    <View style={styles.detailContainer}>
             <Text style={styles.sectionText}>Operation Status:</Text>
      </View>

      <View style={styles.switch}>

      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        activeText={'Open Now'}
        inActiveText={'Closed'}
        circleSize={20}
        barHeight={30}
        circleBorderWidth={2}
        backgroundActive={'green'}
        backgroundInactive={'#DC4731'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#DC4731'}
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        outerCircleStyle={{}} // style for outer animated circle
        switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={7} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={25}
      />
    </View>

    </View>
    );
  };


  const styles = StyleSheet.create({

    viewProfile:{
        flex: 1,
        backgroundColor: colors.primary, // Replace with your desired background color

    },
    detailContainer: {
      flexDirection: "row",
      marginTop:20,
      marginLeft:50
    },

    profileDetails:{
        marginTop:30,
        marginLeft:20
    },

    username:{
      fontSize: 20  
    },

    editProfile:{
        marginTop: 5,
        fontSize: 13,
        textDecorationLine: "underline"
      },
      headerText:{
        fontSize: 25
      },
      sectionText:{
        fontSize: 18
      },
    ImageDesign:{
        width: 100,
        height: 100
    
    },
    ImageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop:10
      },
      FoodDesign: {
        width: 50,
        height: 50,
    
      },
      TouchableImage:{
        borderCurve: true,
        borderColor: colors.secondary,
        borderRadius: 4,
        padding: 5,
        borderWidth: 2.5,

      },
      slider:{
        marginLeft:40,
        marginTop:10
      },
      rangeSlider: {
        
        width: 300,
          
      },
      switch:{
        marginLeft:50,
        marginTop:10
      }

  });

  export default ViewProfile;
