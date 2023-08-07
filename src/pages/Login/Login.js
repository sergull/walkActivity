import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialChoice from "../../components/SocialChoice"
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import auth from "@react-native-firebase/auth";
import { LoginAccountWithEmailAndPassword } from '../Utilities/Utilities';
import { SignInWithGoogle } from '../Utilities/Utilities';
import firestore from '@react-native-firebase/firestore';



const validationSchema = Yup.object().shape({

  email: Yup
    .string()
    // .label("Email")
    .email("Lütfen geçerli bir e-mail adresi giriniz.")
    .required(),
  password: Yup
    .string()
    .required("Şifre boş bırakılamaz.")
    .min(8, "Şifrenizin en az 8 karakter olması gerekmektedir.")

})

const initialFormValues = {
  email: "",
  password: ""
}

function Login({ navigation }) {

  const [loading, setLoading] = useState(false);

  function handleSignUp() {
    navigation.navigate('SignInPage')
  }


  async function handleFormSubmit({email,password}) {
    try {
      setLoading(true);
      // await auth().signInWithEmailAndPassword(
      //     formValues.email,
      //     formValues.password
      // );
      LoginAccountWithEmailAndPassword({email,password})
      //navigation.navigate("HomeStackPage");
      
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }

    console.log(email,password)
  }

  // const userName = auth().currentUser.displayName;
  // const userId = auth().currentUser.uid;

  // async function toggleComplete() {
  //   await firestore()
  //     .collection('user')
  //     .doc(userId)
  //     .set({
  //       name: {userName},
  //     })
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.image_container} >
        <Image source={require("../../assets/walking_10516518.png")}
          style={{ height: 180, width: 180 }} />
      </View>
      <Text style={styles.text}>GİRİŞ YAP</Text>

      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
          <>
            <Input value={values.email} onType={handleChange("email")} placeholder='E-posta'
              iconName='alternate-email'
              onBlur={() => setFieldTouched('email')} />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', paddingLeft: 15, fontWeight: 'bold', paddingBottom: 5 }}>{errors.email}</Text>
            }
            <Input value={values.password} onType={handleChange("password")} placeholder='Şifre'
              iconName='vpn-key'
              isSecure
              onBlur={() => setFieldTouched('password')} />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', fontWeight: 'bold', paddingLeft: 15 }}>{errors.password}</Text>
            }

            <Button text="Giriş Yap" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </Formik>

      <View style={{ marginTop: 30,}}>
        <SocialChoice image={require("../../assets/google_logo.png")} onPress={SignInWithGoogle} text="Login" />
    
      </View>

      <View style={styles.signup_container}>
        <Text>Hesabın yok mu?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signup_text}> Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <View>
      </View>
    </View>
  );
};
export default Login;


const styles = StyleSheet.create({

  image_container: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    paddingTop: 50
  },

  text: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "400",
    paddingBottom: 10,
    textAlign: "center",
  },

  signup_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30
  },

  signup_text: {
    color: '#FF9300',
  }

})