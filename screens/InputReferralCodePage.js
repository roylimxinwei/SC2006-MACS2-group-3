import React, { useState, useEffect } from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	Button,
	Alert,
	TouchableOpacity
} from 'react-native';
import {styles} from '../css/InputReferralCodePage_CSS';

import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

const InputReferralCodePage = ({route, navigation}) => {
	const [referralCode, setReferralCode] = useState('');
	const [validReferralCodes, setValidReferralCodes] = useState([]);

	const fetchData = async () =>{

		let user = auth.currentUser;
		const codes = [];
		const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
		console.log(doc.data())
		console.log(doc.id)
		if(doc.data().referralCodeUsed == false && user.uid != doc.id){
			codes.push({
			referralCode: doc.data().referralCode,
			userId: doc.id
		})
		}
		
	  })

	  setValidReferralCodes(codes)

	}

	const handleSubmit = async () => {
		// Handle submission logic here
		console.log(`Submitting referral code: ${referralCode}`);
		let valid = false;

		if (referralCode.length === 0) {
			Alert.alert('Error', 'Please enter a referral code before submitting.');
			return;
		}
		
		for(let i=0; i<validReferralCodes.length; i++){
			if(referralCode == validReferralCodes[i].referralCode){

				const docRef = doc(db, "users", validReferralCodes[i].userId);
				await updateDoc(docRef, {
					referralCodeUsed: true
				}).then(message =>{
					Alert.alert(
						"Code Redeemed", // Title of the alert
						"Show this pop-up to the cashier to redeem your discount", // Message of the alert
						[
							{ text: "Code Shown", onPress: () => console.log('Code shown') }
							// You can add a function to handle the press event here
						]
						);
					navigation.navigate('ReviewLandingPage' , route.params )
				  });

			 valid = true;
				
			}
		}

		if(!valid){
			Alert.alert(
				'Invalid Referral Code',
				'Please enter a valid referral code', // <- this part is optional, you can pass an empty string
				[
				  {text: 'Ok'
				}		  
				],
				{cancelable: true},
			  );
		}
		
	};

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.welcomeText}>Enter Your Friend's Eater Code</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter eater code here"
				value={referralCode}
				onChangeText={(text) => {setReferralCode(text.trim())}}
			/>
			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default InputReferralCodePage;