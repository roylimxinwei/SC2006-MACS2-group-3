// SignUpPage.js

import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../css/SignUpPage_CSS"; 

// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import {createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc} from "firebase/firestore"; 

const SignUpPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if(username == "" || email == "" || password == "" || confirmPassword == ""){
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      setPassword(""); 
      setConfirmPassword("");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long and include at least one uppercase character, one lowercase character, one number, and one special character."
        );
      setPassword("");
      setConfirmPassword(""); 
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match.",
        "Re-enter your password to confirm.");
      setPassword("");
      setConfirmPassword(""); 
      return;
    }

 // Add your sign up logic here
    // For example, you can send the data to your server
    createUserWithEmailAndPassword(auth,email,password)
    .then(async userCredentials =>{
      const user = userCredentials.user;
      // alert("Account Created Successfully.")

      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 6) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      
      await setDoc(doc(db, "users", user.uid), {
        name: username,
        referralCode: result,
        referralCodeUsed: false
      });

      navigation.navigate("SelectCuisine"); 
    })
    .catch(error => {
      Alert.alert( 
        "Sign Up Failed",
        error.message
      )
      setPassword("");
      setConfirmPassword ("") ;
    })
  };

  const handleInsert = async () =>{
    await setDoc(doc(db, "cities", "ayy"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    }).catch(error => console.log(error.message))
    ;
  }

  const handleGet = async () =>{

    const docRef = doc(db, "cities", "ayy");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const handleUpdate = async () =>{
  
  const ref = doc(db, "cities", "ayy");

    await updateDoc(ref, {
      state: "singapore"
    }).then(message =>{
      alert("Success")

    }).catch(message =>{
      console.log(message)
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/jiakIcon.png")}
          style={styles.ImageDesign}
        />
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LogInPage")}>
          <Text style={styles.logInText}>Have an account? Log in instead.</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={handleInsert}>
          <Text style={styles.buttonText}>Insert Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGet}>
          <Text style={styles.buttonText}>Get Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Data</Text>
        </TouchableOpacity> */}
        <Text style={styles.pad}>for padding</Text>
      </View>
    </ScrollView>
  );
};

export default SignUpPage;
