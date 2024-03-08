// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GeolocationPage from "./screens/GeolocationPage";
import HomeScreen from "./screens/HomeScreen";
import InputReferralCodePage from "./screens/InputReferralCodePage";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LogInPage"; // Import your login screen
import ReviewLandingPage from "./screens/ReviewLandingPage";
import ReviewPage from "./screens/ReviewPage";
import SignUpScreen from "./screens/SignUpPage"; // Import your signup screen
import WelcomeScreen from "./screens/WelcomeScreen";

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
        <Stack.Screen name="GeolocationPage" component={GeolocationPage} />
        <Stack.Screen name="ReviewLandingPage" component={ReviewLandingPage} />
        <Stack.Screen
          name="InputReferralCodePage"
          component={InputReferralCodePage}
        />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
