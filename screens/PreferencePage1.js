import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from "../config/colors";
import { useNavigation } from '@react-navigation/native';

const PreferencePage1 = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();

  const interestList = [
    { name: 'French', image: require('../assets/croissant.png') },
    { name: 'Italian', image: require('../assets/italian.png') },
    { name: 'Japanese', image: require('../assets/ramen.png') },
    { name: 'Chinese', image: require('../assets/chinese.png') },
    { name: 'Fast Food', image: require('../assets/fastfood.png') },
    { name: 'Vegetarian', image: require('../assets/salad.png') },
  ];

  const handleSelect = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select your favourite cuisines</Text>
        <Text style={styles.subtitle}>Choose a minimum of 3</Text>
      </View>
      <View style={styles.interestGrid}>
        {interestList.map((cuisine, index) => (
          <TouchableOpacity
            key={cuisine.name}
            style={[
              styles.interestIcon,
              selectedInterests.includes(cuisine.name) ? styles.selected : null,
            ]}
            onPress={() => handleSelect(cuisine.name)}
          >
            <Image source={cuisine.image} style={styles.interestImage} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        disabled={selectedInterests.length < 3}
        onPress={() => navigation.navigate('PreferencePage2')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 100,
    textAlign: 'left',
  },
  interestGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestIcon: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderCurve: true,
    backgroundColor: '#f8ceB8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selected: {
    backgroundColor: '#dc4731',
  },
  interestImage: {
    width: 50,
    height: 50,
  },
  nextButton: {
    marginTop: 70,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    top: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PreferencePage1;