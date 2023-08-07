import React, { Dispatch, SetStateAction } from "react";
import LottieView from "lottie-react-native";
import {
    View,
  } from 'react-native';
  
// interface SplashProps{
//     setIsLoading: Dispatch<SetStateAction<boolean>>;
// }


function Splash(){
    return (
        <View style={{flex:1, alignItems:"center",margin:0}}>
            <LottieView source={require("../../assets/walking-loader.json")} autoPlay
            loop={false}
            resizeMode="contain"
            onAnimationFinish={()=>setLoaded(true)}
            speed={2}
            
            />
        </View>
    );
}

export default Splash;