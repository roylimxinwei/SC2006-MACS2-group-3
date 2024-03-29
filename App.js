// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {app, auth} from "./firebase.js";

import 'react-native-gesture-handler';

import DiningHistoryPage from "./screens/DiningHistoryPage";
import HomeScreen from "./screens/HomeScreen";
import InputReferralCodePage from "./screens/InputReferralCodePage";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LogInPage"; // Import your login screen
import ReviewLandingPage from "./screens/ReviewLandingPage";
import ReviewPage from "./screens/ReviewPage";
import SignUpScreen from "./screens/SignUpPage"; // Import your signup screen
import ViewProfile from "./screens/ViewProfile";
import WelcomeScreen from "./screens/WelcomeScreen";
import SelectCuisine from "./screens/SelectCuisine"
import RestaurantExperience from "./screens/RestaurantExperience"
import UserReviewScreen from "./screens/UserReviewScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LogInPage" component={LoginScreen} />
        <Stack.Screen name="SignUpPage" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ReviewPage" component={ReviewPage} />
        <Stack.Screen name="ReviewLandingPage" component={ReviewLandingPage} />
        <Stack.Screen name="UserReviewScreen" component={UserReviewScreen} />
        <Stack.Screen name="SelectCuisine" component={SelectCuisine} />
        <Stack.Screen name="RestaurantExperience" component={RestaurantExperience} />
        <Stack.Screen
          name="InputReferralCodePage"
          component={InputReferralCodePage}
        />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />

        <Stack.Screen name="DiningHistoryPage" component={DiningHistoryPage} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

