import colors from '../config/colors';
import {StyleSheet} from "react-native";
  
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    paddingBottom: 50,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 50,
    paddingBottom: 50,
  },
  section: {
    alignItems: 'center',
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  slider: {
    width: 300,
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
