import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialChoice from "../../components/SocialChoice"
import { Formik } from "formik";
import * as yup from "yup";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from '../../utils/authErrorMessageParser';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { CreateAccountWithEmailAndPassword } from '../Utilities/Utilities';
import { SignInWithGoogle } from '../Utilities/Utilities';



const validationSchema = yup.object().shape({

  fullname: yup
    .string()
    .required("Lütfen isminizi giriniz."),
  email: yup
    .string()
    // .label("Email")
    .email("Lütfen geçerli bir e-mail adresi giriniz.")
    .required("Lütfen geçerli bir e-mail adresi giriniz."),
  password: yup
    .string()
    .required("Şifre boş bırakılamaz.")
    .min(8, "Şifrenizin en az 8 karakter olması gerekmektedir."),
  confirmPassword: yup
    .string()
    .required("Şifre boş bırakılamaz.")
    .label("Şifreyi Doğrula")
    .test("passwords-match", "Şifreler uyuşmalı", function (value) {
      return this.parent.password === value;
    })

})


const initialFormValues = {
  email: "",
  password: "",
  fullname: "",
  confirmPassword: ""

}



function SignIn({ navigation }) {

  const [loading, setLoading] = useState(false);


  function handleLogin() {
    navigation.goBack();
  }

  async function handleFormSubmit({ email, password }) {

    try {

      CreateAccountWithEmailAndPassword({ email, password })

      navigation.navigate('LoginPage')
    } catch (error) {
      console.log(error);
    }
    console.log(email, password);
  }


  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const { idToken } = await GoogleSignin.signIn();
  //     const googleCredentials = GoogleAuthProvider.credential(idToken);
  //     await signInWithCredential(auth, googleCredentials);
  //     navigation.navigate("HomeStackPage");
  //     // const userInfo = await GoogleSignin.signIn();
  //     // Alert(JSON.stringify({userInfo}));


  //     // Create a Google credential with the token

  //     // Sign-in the user with the credential


  //     } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }


  //};

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.image_container} >
        <Image source={require("../../assets/walking_10516518.png")} style={{ height: 180, width: 180 }} />
      </View>
      <Text style={styles.text}>KAYIT OL</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
          <>
            <Input value={values.fullname} onType={handleChange("fullname")}
              placeholder='İsminiz'
              iconName='person-outline'
              onBlur={() => setFieldTouched('fullname')} />
            {touched.fullname && errors.fullname &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', paddingLeft: 15, fontWeight: 'bold', paddingBottom: 5 }}>
                {errors.fullname}</Text>
            }
            <Input value={values.email} onType={handleChange("email")}
              placeholder='E-posta'
              iconName='alternate-email'
              onBlur={() => setFieldTouched('email')} />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', paddingLeft: 15, fontWeight: 'bold', paddingBottom: 5 }}>
                {errors.email}</Text>
            }
            <Input value={values.password} onType={handleChange("password")}
              placeholder='Şifre'
              iconName='vpn-key'
              isSecure
              onBlur={() => setFieldTouched('password')} />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', fontWeight: 'bold', paddingLeft: 15 }}>{errors.password}</Text>
            }
            <Input value={values.confirmPassword} onType={handleChange("confirmPassword")}
              placeholder='Şifrenizi tekrar giriniz'
              iconName='vpn-key'
              isSecure
              onBlur={() => setFieldTouched('confirmPassword')} />
            {touched.confirmPassword && errors.confirmPassword &&
              <Text style={{ fontSize: 13, color: '#FF9300', fontStyle: 'italic', fontWeight: 'bold', paddingLeft: 15 }}>{errors.confirmPassword}</Text>
            }
            <Button text="Kayıt Ol" onPress={handleSubmit} loading={loading} />

          </>
        )}
      </Formik>

      <View style={{ marginTop: 30, }}>
        <SocialChoice image={require("../../assets/google_logo.png")} onPress={SignInWithGoogle} text="Sign In" />

      </View>



      <View style={styles.signup_container}>
        <Text>Hesabın var mı?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signup_text}> Giriş Yap</Text>
        </TouchableOpacity>
      </View>

      <View>
      </View>
    </View>
  );
};
export default SignIn;


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