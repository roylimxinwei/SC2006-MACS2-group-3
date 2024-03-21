import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", // Centers objects according to the secondary axis
        justifyContent: "center", // Centers the object according to main axis
        backgroundColor: colors.primary, // primary colour
    },
    ImageDesign: {
        borderRadius: 130,
        width: 250,
        height: 250,
        bottom: 50,
    },
    welcomeText: {
        color: "#7F2B0F",
        fontSize: 24,
        marginBottom: 20,
        bottom: 10,
    },
    button: {
        backgroundColor: "#CD5C5C",
        paddingVertical: 10,
        paddingHorizontal: 90,
        borderRadius: 5,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    signUpText: {
        color: "#7F2B0F",
        textDecorationLine: "underline",
        fontSize: 16,
        top: 10,
    },
});
