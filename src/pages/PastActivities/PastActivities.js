import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PastCard from '../../components/PastCard';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';


const WeatherApp = ({ navigation }) => {

  const [distance, setDistance] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [list, setList] = useState([]);
  const ref = firestore().collection('newActivity');


  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <PastCard distance={item.distance.toFixed(2)} date={item.date} onPress={()=>{navigation.navigate('DetailPage', { item })}}/>
    </TouchableOpacity>
  );

  const fetchFeed = async () => {
    await ref.
     where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        const past = [];

        querySnapshot.forEach(documentSnapshot => {

          past.push(documentSnapshot.data())

        });
        setList(past);
        // setLoading(false);
      })

  }
  useEffect(() => {
    fetchFeed();
  })

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <FlatList data={list}
        numColumns={1}
        keyExtractor={item => item.id}
         renderItem={renderItem}
        
        >
      </FlatList>
    </SafeAreaView>
  )

};

export default WeatherApp;
