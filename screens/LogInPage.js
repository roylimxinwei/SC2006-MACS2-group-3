import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { styles } from "../css/LogInPage_CSS";
import { auth } from "../firebase";
import { set } from "firebase/database";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text.trim());
  };

  const handlePasswordChange = (text) => {
    setPassword(text.trim());
  };

  const handleLogIn = () => {
    if (email == "" || password == "") {
      Alert.alert(
        "Log in Failed",
        "Please fill in all fields."
      );
      return;
    }

    const screenHeight = Dimensions.get("window").height;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert(
          "Log in Successfully",
          "Let's Jiak!"
        );
        navigation.navigate("HomeScreen", { userId: user.displayName });
      })
      .catch((error) => {
        // if (error.code === "auth/user-not-found") {
        //   Alert.alert(
        //     "Log in Failed",
        //     "No user found with this email address."
        //   );
        // }

        if (error.code === "auth/invalid-email") {
          Alert.alert(
            "Log in Failed",
            "No user found with this email address."
          );
        }

        if (error.code === "auth/invalid-credential") {
          Alert.alert(
            "Log in Failed",
            "The password is incorrect."
          );
        }

        if (error.code === "auth/too-many-requests") {
          Alert.alert(
            "Log in Failed",
            "Access to this account has been temporarily disabled due to many failed login attempts. Try again later."
          );
        }

        setPassword("");
        console.log(error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/jiakIcon.png")}
          style={styles.ImageDesign}
        />
        <Text style={styles.loginText}>Log in</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleLogIn} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
          <Text style={styles.signUpText}>New to Jiak? Sign up here.</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.padpad}> FOR PADDING </Text>
    </ScrollView>
  );
};

export default LoginPage;
