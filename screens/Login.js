import React, {useState, useContext} from 'react'
import { StyleSheet, Text, ActivityIndicator, Dimensions, StatusBar,Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native'
import { Formik } from 'formik';
import Toast from 'react-native-root-toast';
import { SimpleLineIcons , Octicons, Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from './../Components/styles';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { InnerContainters, PageLogo, StyledContainer, PageTitle,deviceHeight, LoginHeader,  MsgBox, StyledFormArea,  StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink } from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

//API REQUESTS
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { LoginCredentialsContext } from '../Components/LoginCredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './../screens/Dashboard';

// import {fontStyles} from '../Components/fontStyles';
const Login = ({navigation, route }) => {
    //const {height} =   Dimensions.get('window')-StatusBar.currentHeight ;
    const height = Platform.OS === 'android' && Platform.Version > 26 ? Dimensions.get('screen').height - StatusBar.currentHeight : Dimensions.get('window').height;
    console.log("Heigh===", height)
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [hidePassword, setHidePassword] = useState(true)
    const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
    console.log("PARAM received in Login==", route.params);
    const onSubmitHandler = () =>{

                     };
    const handleLogin = (credentials, setSubmitting) => {
         console.log("CREDENTIALS==",credentials);
        // const {username, password} = credentials;
        // console.log("CREDENTIAL username==",username)
        //const url = "https://www.mecallapi.com/api/login";
        const email = credentials.username;
        const password = credentials.password;
        console.log("EMAIL==",email);
         
        //const url  = "https://demo.treblle.com/api/v1/auth/login";
         const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_Login";
         //axios.post(url, {Email: email, Password: password},  {headers: {Host: "demo.treblle.com"}}).then(
        const login_obj = {Email: email, Password: password};
        console.log("Login Object=======", login_obj);
        axios.post(url, login_obj).then(
                (response) =>{
                    
                    const result = response.data;
                     let ValidJson = result.replace('{"d":null}',"");
                    ValidJson = JSON.parse(ValidJson);
                    const { message, status, data} = ValidJson
                    //const result = response.data;
                    //const {message, status, user} = result;
                    
                    // if(message !== 'SUCCESS') {
                    if(status != true) {
                        handleMessage(message, status);
                       
                        console.log("MESSAGE from Server--->",data);
                       
                    }else{
                          const {firstname, lastname, email, user_status, mobile, user_id} = data[0];
                          console.log("Result ====\n\n", data[0].firstname,"\n\n");
                          const isLogged = true;
                          const isGuest = false
                          const userPWd = password;
                          const credentials = { firstname, lastname, email, user_status, isLogged, isGuest, mobile , user_id, password: userPWd};
                          persistLogin(credentials, message, status)
                          console.log("AFTER LOGN")
                          
                           navigation.navigate('Dashboard', {...credentials})
                         //navigation.navigate('DrawerRoutes', {...credentials})
                          // navigation.navigate('Welcome')
                        // navigation.navigate('Signup')
                        // navigation.dispatch(
                            //StackActions.replace('Dashboard');
                        //authChanged()
                        setSubmitting(false)
                       
                    }
                     setSubmitting(false)
                }
            ).catch((error) => {
            console.log("ERROR OCCURRED", error.response.data)
            handleMessage('Network Errror'+ error );
             setSubmitting(false);
        })
    }
    const handleMessage = (message, type='FAILED') => {
        console.log(message);
        setMessage(message);
        setMessageType(type);
    }

    // const persistLogin = (credentials, message, status) => {
        
    //     const ss = JSON.stringify(credentials)
    //     console.log("Crede rec=========>>>>>", ss)
    //          AsyncStorage.setItem('loginCredentials', JSON.stringify(credentials))
    //          .then((result) => {
    //              console.log("Successfully Setip Aync")
    //              handleMessage(message, status);
    //              setStoredCredentials(credentials);
                 
    //          })
    //          .catch((error) => {
    //              console.log("Error From Persist Storage ", error)
    //              handleMessage('Persistant Login Failed')
    //          })
    // }
const persistLogin =  (credentials, message, status) => {
         AsyncStorage.setItem('loginCredentials', JSON.stringify(credentials))
        .then(()=>{
            console.log("PERSIST Login cred", credentials," STATIS===", status, "message==", message);
            //handleMessage(message, status);
            setStoredCredentials(credentials);
          
        })
        .catch(err => {
            console.log("Error Occuredd at PERSIST Login", err)
        })
    }
const continueAsGuest = () => {
    setStoredCredentials({isGuest: true});  
    persistLogin({isGuest: true}, '', '');
    navigation.navigate('Dashboard');
}
  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <StyledContainer style={{justifyContent: 'center', alignItems:'center', height:height,borderColor:'#ff0000', flex:1, flexDirection: 'row', backgroundColor:"#ffffff"}}>
        
        {/* <StatusBar style='dark' /> */}
        {/* <LoginHeader></LoginHeader> */}
        
        <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
                <View style={{flexDirection: 'row', alignItems: 'center',marginVertical:10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <Formik initialValues={{username:'', password: ''}} 
                        onSubmit={(values, {setSubmitting}) => {
                                if(values.username=='' || values.password=='') {
                                    handleMessage("Please Fill All the Fields ");
                                    Toast.show('Request failed to send.', {
                                            duration: Toast.durations.LONG,
                                            position: Toast.positions.BOTTOM,
                                            shadow: true,
                                            opacity: 0.8,
                                            backgroundColor: '#eeeeee',
                                            textColor: '#000000',
                                            
                                            });
                                    setSubmitting(false);
                                }else{
                                    console.log("In ELSE")
                                    console.log(values);
                                    handleLogin(values, setSubmitting)
                                }
                                console.log(values)
                    
                    }} >
                    {
                   
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=> (
                            <StyledFormArea>
                                <MyTextInput 
                                label=""
                                icon="envelope"   
                                placeholder="Email Address"
                                placeholdertextcolor="#D2D2D2"
                                keyboardType="email-address"
                                maxLength = {92}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                isPassword ={false}
                                />
                                <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="Password"
                                placeholdertextcolor="#D2D2D2"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword ={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                                secureTextEntry = {hidePassword}
                                />
                               <View  style={{ flexDirection:"row", justifyContent:"center", marginTop:20}}>
                                    <View>
                                        <Text  style={{justifyContent: 'flex-start',}} >Forgot your password ?</Text>
                                    </View>
                                    <View><Text>&nbsp;&nbsp;</Text></View>
                                     <View>
                                        <Text onPress={() =>navigation.navigate("ForgetPassword")} placeholder="Test" style={{justifyContent: 'flex-start', color:'red'}} >Click Here</Text>
                                    </View>
                                     
                                </View> 
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large"  ></ActivityIndicator>
                                </StyledButton>}
                                
                                <ExtraView>

                                
                               
                                        
                                   
                                 <View  style={{flexDirection: 'column', flex:1, justifyContent: 'center'}}> 
                                    <View style={{flexDirection: 'row',  justifyContent: 'center', marginBottom:10}}>
                                        <ExtraText>Dont Have an Account ?
                                        <TextLink onPress={() => navigation.navigate('Signup')}> Register</TextLink></ExtraText>
                                        </View>
                                        <View style={{flexDirection: 'row',  justifyContent: 'center'}} 
                                             >
                                         <Text style={styles.bottomViewText} onPress={ continueAsGuest} >CONTINUE AS GUEST</Text>
                                        </View>
                                </View>
                                </ExtraView>
                               
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>
                     
        </InnerContainters>
         <View style={styles.bottomView}>
                                    
          </View>
    </StyledContainer>
   </TouchableWithoutFeedback>
  );
};


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
          
            {/* <StyledInputLable fontfamily='Roboto-Regular' adjustsFontSizeToFit   numberOfLines={1}>{label}</StyledInputLable> */}
           
            <LeftIcon>
         
          <FontAwesome5 name={icon} size={24} color="black" />
         </LeftIcon>
         <StyledTextInput {...props} />
             {
                 isPassword &&
                    <RightIcon  onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? "md-eye-off" : "md-eye" } size={24}></Ionicons>
                    </RightIcon>
             }
         
          
        </View>
    )

};

const styles = StyleSheet.create({
   bottomView: {
    width: '100%',
    height: 50,
    
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  bottomViewText: {
    color: '#ff0000',
  },
})
export default Login;
