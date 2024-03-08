import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import colors from '../config/colors';

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
      <Button title="Submit" onPress={handleSubmit} buttonColor={colors.primary} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  welcomeText: {
    color: '#7F2B0F',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default InputReferralCodePage;