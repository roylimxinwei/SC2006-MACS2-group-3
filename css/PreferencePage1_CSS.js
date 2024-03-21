import {StyleSheet} from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
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
