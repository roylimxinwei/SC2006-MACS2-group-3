import React, { useState } from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	Button
} from 'react-native';
import {styles} from '../css/InputReferralCodePage_CSS';

const InputReferralCodePage = () => {
	const [referralCode, setReferralCode] = useState('');

	const handleSubmit = () => {
		// Handle submission logic here
		console.log(`Submitting referral code: ${referralCode}`);
		
	};

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