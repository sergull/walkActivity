import React, { useState } from 'react';
import {
  View,
} from 'react-native';
import SignIn from "./pages/SignIn/SignIn";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LottieView from "lottie-react-native";
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import NewActivity from './pages/NewActivity';
import PastActivities from './pages/PastActivities';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlashMessage from "react-native-flash-message";
import { signOutUser } from './pages/Utilities/Utilities';
import auth from "@react-native-firebase/auth";
import Detail from './pages/Detail';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function App(){

  const [userSession, setUserSession] = React.useState();
  React.useEffect(()=>{
    auth().onAuthStateChanged(user=>setUserSession(!!user))
  },[])

  const [loaded, setLoaded] = useState(false)

  if(loaded==false){
    return(
      <View style={{flex:1, alignItems:"center",margin:0}}>
            <LottieView source={require("./assets/walking-loader.json")} autoPlay
            loop={false}
            resizeMode="contain"
            onAnimationFinish={()=>setLoaded(true)}
            speed={1.7}
            
            />
        </View>
    )
  };

  const AuthStack=()=>{
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='LoginPage' component={Login}/>
        <Stack.Screen name='SignInPage' component={SignIn}/>
      </Stack.Navigator>
    );
  } 

  const HomeStack=({navigation})=>{
    return(
      <Tab.Navigator 
      initialRouteName='ProfilePage'
              tabBarOptions={{
                  labelStyle: {fontSize:15},
                  activeTintColor: '#FF9300',
                  
              }}			
      
          >
          <Tab.Screen 
              name="ProfilePage"
              component={Profile}
              options={{
                  title: 'Profil',
                  headerTitleStyle:{fontSize:20},
                  headerTintColor: '#FF9300',
                  headerShown:false,

                  tabBarIcon: ({ focused, color }) => (
                      <Icon
                          focused={focused}
                          name="person-outline"
                          color={color}
                          size={28}
                      />
                  )


              }} 
          />
          <Tab.Screen
              name="NewActivityPage"
              component={NewActivity}
              options={{
                  title: 'Yeni Aktivite',
                  headerTitleStyle:{fontSize:20},
                  headerTintColor: '#FF9300',
                  headerShown:false,

                //   headerRight: () => (

                //     <Icon name='add-circle-outline'
                //         size={28}
                //         color='#FF9300'
                //         style={{paddingRight:10}}
                //         onPress={()=>{}}
                //     />

                // ),

                  tabBarIcon: ({ focused, color }) => (
                      <Icon
                          focused={focused}
                          name="directions-walk"
                          color={color}
                          size={30}
                      />
                  )


              }} 
          />
          <Tab.Screen
          name="PastActivities"
          component={PastActivities}
          options={{
              title: 'Geçmiş Aktiviteler',
              headerTitleStyle:{fontSize:20},
              headerTintColor: '#FF9300',

              headerRight: () => (
                  <Icon name='logout'
                      size={25}
                      style={{paddingRight:8}}
                      color='#FF9300'
                      onPress={()=>{signOutUser(); 
                  }}
              />
              ),

              tabBarIcon: ({ focused, color }) => (
                  <Icon
                      focused={focused}
                      name="settings-backup-restore"
                      color={color}
                      size={28}
                  />
              )


          }} 
          />
      </Tab.Navigator>
  )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      {userSession ? (
                    <>
        <Stack.Screen name='HomeStackPage' component={HomeStack} />
        <Stack.Screen name='DetailPage' component={Detail}/>
        </>
                ) : (
                    <>
        <Stack.Screen name='AuthPage' component={AuthStack}/>
        </>
                )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
  
}


export default App;
