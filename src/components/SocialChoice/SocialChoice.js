import React from 'react'
import { TouchableOpacity,Text,Image } from 'react-native';
import styles from './SocailChoiceStyle';


const SocialChoice = ({image, onPress, text}) => {

    return (
        <TouchableOpacity onPress={onPress}
        style={styles.container}>

          <Image source={image}
          style={styles.image}/>

          <Text style={{padding:5, fontWeight:"600", fontSize:15, color:"#333"}}> {text} with Google</Text>

        </TouchableOpacity>
    )
}

export default SocialChoice;