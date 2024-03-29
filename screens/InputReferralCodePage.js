import React, { useState, useEffect } from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	Button,
	Alert
} from 'react-native';
import {styles} from '../css/InputReferralCodePage_CSS';

import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

const InputReferralCodePage = (navigation) => {
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
		
		for(let i=0; i<validReferralCodes.length; i++){
			if(referralCode == validReferralCodes[i].referralCode){

				const docRef = doc(db, "users", validReferralCodes[i].userId);
				await updateDoc(docRef, {
					referralCodeUsed: true
				}).then(message =>{
					alert("Code Redeemed")
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
			<Text style={styles.welcomeText}>Enter Referral Code</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter referral code here"
				value={referralCode}
				onChangeText={setReferralCode}
			/>
			<Button 
				title="Submit" 
				onPress={handleSubmit} 
				style={styles.button} 
			/>
		</View>
	);
};

export default InputReferralCodePage;