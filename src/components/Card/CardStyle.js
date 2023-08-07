import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export default StyleSheet.create({
    conatiner:{
        borderWidth: 1, 
        borderColor: '#FF9300', 
        backgroundColor: 'white', 
        flexDirection: 'row',
        padding: 15, 
        borderRadius: 10, 
        shadowOffset: { width: 1, height: 10 }, 
        shadowOpacity: 0.4,
        shadowRadius: 3, 
        elevation: 10, 
        height: hp("17%"), 
        marginTop: 15,
        flexDirection:"column",
        flex:1
    },

    text:{
        fontSize: 18, 
        color: "#FF8900", 
        fontWeight: "600" 
    },
    info:{
        fontSize:25,
        textAlign:"center",
        color:"#333"
    },
    inner_container:{
        marginTop:25,
        borderWidth:5,
        borderColor:"#FF9300",
        borderRadius:50,
        paddingVertical:17,
        marginHorizontal:50,
        shadowOffset: { width: 5}, 
        shadowOpacity: 0.2,
        shadowRadius: 3, 
        elevation: 10, 
    }
});