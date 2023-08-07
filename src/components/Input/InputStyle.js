import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        // borderColor: '#3D5656',
        borderColor:'#dbdbdb',
        borderWidth: 1,
       // paddingBottom: 0,
        marginBottom: 10,
        marginLeft:10,
        marginRight:10,
        padding:8,
        borderRadius:15,
        backgroundColor:'#EAEAEA'
    },

    icon: { marginRight: 8,
    color:'#3D5656' },
    input: {
        flex: 1,
        //platforma göre 
        padding: Platform.OS == 'android' ? 0 : 5,
        // paddingVertical:0
    },

    button:{
        flexDirection: 'row'
    },
    button_text:{
        color: '#FED049', fontWeight: '700'
    }

})
