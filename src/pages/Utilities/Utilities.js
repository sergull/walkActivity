import auth from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';


GoogleSignin.configure({
    //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '470344817172-og11g6pu0ct993k9crj808a1s1kn21qf.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '470344817172-obfi71h2r66sbk7gavc92tlrj98ugh6n.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});


export const CreateAccountWithEmailAndPassword = ({ email, password }) => {

    auth().createUserWithEmailAndPassword(
        email,
        password
    )
        .then(() => {
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .set({
                    //username: auth().currentUser.displayName,
                    userId: auth().currentUser.uid,
                    email: email,
                   
                })
                .then(() => {
                    console.log('User added!');
                    console.log({ username })
                });

        })

};

export const signOutUser = () => {
    return auth().signOut()
};


export const LoginAccountWithEmailAndPassword = async ({ email, password }) => {

    const { user } = auth().signInWithEmailAndPassword(
        email,
        password
    )
        .then( () => {
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .set({
                    //username: auth().currentUser.displayName,
                    userId: auth().currentUser.uid,
                    email: email,
                
                })

        })


    return user;
};

export const SignInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.log(error)
    }
}
