import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../css/PreferencePage1_CSS';


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

export default PreferencePage1;