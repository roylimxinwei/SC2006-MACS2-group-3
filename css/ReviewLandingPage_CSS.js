import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    ImageDesign: {
        borderRadius: 130,
        width: 300,
        height: 300,
        marginBottom: -40,
    },
    welcomeText: {
        color: "#7F2B0F",
        fontSize: 17,
        marginBottom: 20,
        marginTop: 60,
    },
    smallText: {
        color: "#7F2B0F",
        fontSize: 30,
        marginBottom: 80,
        marginTop: -80,
        textAlign: "left",
        width: "80%",
    },
    smallButton: {
        paddingVertical: 5,
        paddingHorizontal: 1,
        borderRadius: 5,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    smallButtonText: {
        color: "#9e8f8d",
        fontSize: 14,
        textDecorationLine: "underline",
        marginTop:-20,
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
});
