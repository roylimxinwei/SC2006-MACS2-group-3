// SignUpPage.js

import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if(username == null || email == null || password == null || confirmPassword == null){
      alert("Please fill in all fields.");
      return;
    }

    // Add your sign up logic here
    // For example, you can send the data to your server
    createUserWithEmailAndPassword(auth,email,password)
    .then(userCredentials =>{
      const user = userCredentials.user;
      alert("Account Created Successfully.")
      navigation.navigate("LogInPage"); 

    })
    .catch(error => console.log(error.message))


    navigation.navigate("PreferencePage1"); // Replace 'HomePage' with your home screen route name
  };

  const handleInsert = async () =>{
    await setDoc(doc(db, "cities", "ayy"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    }).catch(error => console.log(error.message))
    ;

    const docRef = doc(db, "cities", "ayy");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
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

      <TouchableOpacity style={styles.button} onPress={handleInsert}>
        <Text style={styles.buttonText}>Insert Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGet}>
        <Text style={styles.buttonText}>Get Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;
