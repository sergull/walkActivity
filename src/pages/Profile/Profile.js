import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Button } from 'react-native';
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Card from "../../components/Card";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';


function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

function Profile() {

    const ref = firestore().collection('newActivity');
    const user = auth().currentUser;
    const [kilo, setKilo] = useState(null);
    const [yas, setYas] = useState(null);
    const [km, setKm] = useState(0);
    const [time, setTime] = useState(0);
    const [actvity, setActvity] = useState(0);
    const [list, setList] = useState([]);
    const formatTime =  convertSecondsToHMS(time)
    


    async function sendContent() {

        if (!kilo && !yas) {
            return;
        }

        const contentObject = {
            kilo: kilo,
            yas: yas,
            email: auth().currentUser.email,
        }

        await firestore().collection("userInfo").doc(auth().currentUser.uid).set(contentObject)
            .then(() => console.log("update"))


    }


    // function fetchDataInfo(){
    //     const subscriber = firestore()
    //       .collection('userInfo')
    //       .doc(auth().currentUser.uid)
    //       .onSnapshot(documentSnapshot => {
    //         setKilo(documentSnapshot.data());
    //         setYas(documentSnapshot.data());

    //         console.log('User data: ', documentSnapshot.data());
    //       });


    //     // Stop listening for updates when no longer required
    //     return () => subscriber();
    //   };

    //   useEffect(()=>{
    //     fetchDataInfo()
    //   })


    function fetchDataInfo() {
        const subscriber = firestore()
            .collection('userInfo')
            .doc(auth().currentUser.uid)
            .get()
            .then((doc) => {
                setKilo(doc.data().kilo);
                setYas(doc.data().yas);
                console.log('Total users: ', doc.data());
            })

        // Stop listening for updates when no longer required
        return () => subscriber();
    };

    useEffect(() => {
        fetchDataInfo()
    })

    const fetchDistance = async () => {

        await ref.where('userId', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                const past = [];

                querySnapshot.forEach(documentSnapshot => {
                    //distance every activity
                    past.push(documentSnapshot.data().distance)

                });
                const sum = past.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                setKm(sum)
            })

    }

    useEffect(() => {
        fetchDistance()
    })


    const fetchTime= async () => {

        await ref.where('userId', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                const past = [];

                querySnapshot.forEach(documentSnapshot => {
                    //distance every activity
                    past.push(documentSnapshot.data().time)

                });
                const sum = past.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                setTime(sum)
            })

    }

    useEffect(() => {
        fetchTime()
    })

    const fetchActivity= async () => {

        await ref.where('userId', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                setActvity(querySnapshot.size)
              });

    }

    useEffect(() => {
        fetchActivity()
    })

    //     useEffect(()=>{
    //         firestore()
    //   .collection('userInfo')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('Total users: ', querySnapshot.size);

    //     querySnapshot.forEach(documentSnapshot => {
    //        console.log (documentSnapshot.auth().currentUser.uid.data())
    //         setKilo(documentSnapshot.data()["kilo"]);
    //         setYas(documentSnapshot.data()["yas"])
    //       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data()["kilo"]);
    //     });
    //   });
    //     },[])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar

                backgroundColor="transparent"
            />
            <LinearGradient start={{ x: 0.0, y: 0.4 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0, 1]} colors={["#FF9300", "#FF5600"]} style={{ flex: 0.28 }}
            >

                <View style={{ flexDirection: "column", flex: 1 }}>
                    <View style={{ flexDirection: "column", marginTop: hp("10%"), paddingHorizontal: wp("5%") }}>
                        <Text style={{ fontSize: 16, color: "#fff", marginBottom: 10 }}>HOŞGELDİNİZ</Text>
                        <Text style={{ color: "#fff", fontSize: 22 }}>{user.displayName ? user.displayName : user.email}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text></Text>
                        </View>
                    </View>

                </View>
            </LinearGradient>

            <View style={{ flex: 0.8, backgroundColor: "#fff", paddingHorizontal: wp("5%") }}>
                <View style={{
                    backgroundColor: "#fff", height: hp("13%"), width: "100%",
                    alignItems: "center", justifyContent: "space-around", borderRadius: 10, borderWidth: 1,
                    borderColor: "#fff", elevation: 10, shadowColor: "#000", shadowRadius: 10,
                    marginTop: -25, shadowOffset: { width: 1, height: 10 }, shadowOpacity: 0.4,
                }}>

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", margin: 5, }}>
                        <View style={{ flexDirection: "column", flex: 1, margin: 5, }}>
                            {/* <Text stylek={{ fontSize: 20, color: "#FF9300", paddingLeft: 5 }}>YAŞ</Text> */}
                            <TextInput value={yas} onChangeText={setYas} style={{ color: "#333", fontSize: 22, backgroundColor: "transparent", borderColor: "#dbdbdb", borderWidth: 1, flex: 1, height: hp("3%"), borderRadius: 5, margin: 5, padding: 5 }}
                                placeholder="Yaşınızı giriniz" placeholderTextColor="#dbdbdb" />
                        </View>
                        <View style={{ flexDirection: "column", flex: 1, margin: 5, }}>
                            {/* <Text style={{ fontSize: 20, color: "#FF9300", paddingLeft: 5 }}>KİLO</Text> */}
                            <TextInput value={kilo} onChangeText={setKilo} style={{ color: "#333", fontSize: 22, backgroundColor: "transparent", borderColor: "#dbdbdb", borderWidth: 1, flex: 1, height: hp("3%"), borderRadius: 5, margin: 5, padding: 5 }}
                                placeholder="Kilonuzu giriniz" placeholderTextColor="#dbdbdb" />
                        </View>

                    </View>
                    <Button color="#FF9300" title="Kaydet" onPress={sendContent} />
                </View>

                <ScrollView style={{ flexDirection: "column", flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, }}>
                        <Text style={{ color: "#333", fontSize: 22, }}>Özetim</Text>
                    </View>

                    <View style={{ flexDirection: "column" }}>

                        <Card text="Toplam Yapılan Mesafe (Km)" info={km.toFixed(2) }/>

                        <Card text="Toplam Aktivite Süresi (Saat)" info={formatTime} />
                        <Card text="Toplam Aktivite Sayısı" info={actvity} />
                        {/* <Card text="Toplam Adım Sayısı" info="50343" /> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    );

}

export default Profile;