// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import 'react-native-gesture-handler';

import HomeScreen from "./screens/HomeScreen";
import InputReferralCodePage from "./screens/InputReferralCodePage";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LogInPage"; // Import your login screen
import ReviewLandingPage from "./screens/ReviewLandingPage";
import ReviewPage from "./screens/ReviewPage";
import SignUpScreen from "./screens/SignUpPage"; // Import your signup screen
import WelcomeScreen from "./screens/WelcomeScreen";
import ViewProfile from "./screens/ViewProfile";
import PreferencePage1 from "./screens/PreferencePage1"
import PreferencePage2 from "./screens/PreferencePage2"

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
        <Stack.Screen name="PreferencePage1" component={PreferencePage1} />
        <Stack.Screen name="PreferencePage2" component={PreferencePage2} />
        <Stack.Screen
          name="InputReferralCodePage"
          component={InputReferralCodePage}
        />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />

        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
