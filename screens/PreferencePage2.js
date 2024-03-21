import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../css/PreferencePage2_CSS';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-switch';

const PreferencePage2 = () => {
    const [restaurantRating, setRestaurantRating] = useState(3);
    const [proximity, setProximity] = useState(100);
    const [operationStatus, setOperationStatus] = useState('Open Now');
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Preferences</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant Ratings</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              value={restaurantRating}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onValueChange={(value) => setRestaurantRating(value)}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#DC4731"
            />
            <Text style={styles.sliderValue}>{restaurantRating}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proximity</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              value={proximity}
              minimumValue={0}
              maximumValue={250}
              step={10}
              onValueChange={(value) => setProximity(value)}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#DC4731"
            />
            <Text style={styles.sliderValue}>{proximity}m</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operation Status</Text>
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            activeText={'Open Now'}
            inActiveText={'Closed'}
            circleSize={20}
            barHeight={30}
            circleBorderWidth={2}
            backgroundActive={'green'}
            backgroundInactive={'#DC4731'}
            circleActiveColor={'#30a566'}
            circleInActiveColor={'#DC4731'}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            outerCircleStyle={{}} // style for outer animated circle
            switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={7} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={25}
        />
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  export default PreferencePage2;