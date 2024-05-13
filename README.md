# Jiak! Mobile Application

## 1. Product Perspective
Jiak! is a novel mobile application that enhances the dining discovery experience. It leverages user preferences and location data to recommend restaurants involuntarily, mirroring the 'word of mouth' effect. Features include real-time notifications of nearby eateries, user-driven feedback, and social functionalities to manage dining expenses among friends.

### Features:
- **Real-time Recommendations**: Receive notifications when near restaurants that match your tastes.
- **User Feedback**: Review restaurants to improve recommendation quality for others.
- **Social Integration**: Create parties to manage and split costs of dining experiences.

## 2. Product Functions
1. **Account Registration**: Users can register and log in.
2. **Profile Management**: View and edit user profiles including food preferences.
3. **Restaurant Interaction**: View nearby recommendations, rate and review dining experiences.
4. **Social Features**:
   - Use and share referral codes for discounts.
   - Add friends and manage parties for group dining, including cost splitting.

## 3. User Classes and Characteristics
- **Local Explorers**: Discover new and trending dining spots within Singapore.
- **Food Enthusiasts**: Seek unique culinary experiences and value detailed reviews.
- **Dining Groups**: Enhance dining experiences by connecting with friends.
- **Tech-Savvy Users**: Leverage app integrations for improved dining discoveries.

## 4. Operating Environment
**Product Environment**:
- **Android**: Version 5.0 and above
- **iOS**: Version 13.4 and above

**Development Environment**:
- **Front-end**: React Native with Expo for cross-platform mobile development.
- **Back-end & Database**: Firebase for authentication, real-time database management, and secure data syncing.

## 5. Design and Implementation Constraints
1. **Google Maps API**: Limited free credits for API calls; plan to upgrade upon going live.
2. **Device Compatibility**: May not function optimally on older versions of Android or iOS.
3. **Storage**: Firebase provides up to 5GB of cloud storage, sufficient under normal usage conditions.

## 6. User Documentation
Comprehensive user manuals will be provided, detailing screens and functionalities to stakeholders.

## 7. Assumptions and Dependencies
- **Location Services**: Users must have live location turned on with a stable internet connection.
- **Google Maps API**: Dependency on this service for restaurant data, assuming accuracy.
- **User Requirements**: An email is required for signup; functionality assumes users' friends are also app users.

