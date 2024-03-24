import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    viewProfile:{
        flex: 1,
        backgroundColor: colors.primary, // Replace with your desired background color
    },
    detailContainer: {
        flexDirection: "row",
        marginTop:20,
        marginLeft:50
    },
    profileDetails:{
        marginTop:30,
        marginLeft:20
    },
    username:{
        fontSize: 20  
    },
    editProfile:{
        marginTop: 5,
        fontSize: 13,
        textDecorationLine: "underline"
    },
    headerText:{
        fontSize: 25
    },
    sectionText:{
        fontSize: 18
    },
    ImageDesign:{
        width: 100,
        height: 100
    },
    ImageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop:10
    },
    FoodDesign: {
        width: 50,
        height: 50,
    },
    TouchableImage:{
        borderCurve: true,
        borderColor: colors.secondary,
        borderRadius: 4,
        padding: 5,
        borderWidth: 2.5,
    },
    slider:{
        marginLeft:40,
        marginTop:10
    },
    rangeSlider: {     
        width: 300,           
    },
    switch:{
        marginLeft:50,
        marginTop:10,
        marginBottom: 20
    },
    button: {
        backgroundColor: "#CD5C5C",
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 5,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginTop: 30,
        marginLeft: 60,
        marginRight: 60
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    interestGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    interestIcon: {
        width: 80,
        height: 80,
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
        width: 30,
        height: 30,
    },
    interestText: {
        color: '#000',
        fontSize: 13,
        marginTop: 5,
    },
});
