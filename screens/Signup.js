import React, {useState, useContext, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View,ActivityIndicator, Dimensions } from 'react-native'
// import { Formik } from 'formik';
import { ErrorMessage, Field, Form, Formik, FormikProvider, useFormik } from "formik";
import { SimpleLineIcons , Octicons, Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { InnerContainters, PageLogo, phoneNumberMask, StyledCheckBox, StyledContainer, PageTitle, devideId, devideOS, LoginHeader,  StyledFormArea,  StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink, MsgBox } from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';
import axios from 'axios';


import { LoginCredentialsContext, IsLoginVerified } from './../Components/LoginCredentialsContext';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox  from './../Components/CheckBox';
import Login from './../screens/Login'; 

// import {fontStyles} from '../Components/fontStyles';
const Signup = ({navigation}) => {
    console.log("Navigation Received", navigation)
         const {height} =   Dimensions.get('window');
        const phoneInput = useRef()
        const emailInput = useRef();
        const passwordInput = useRef();
        const [message, setMessage] = useState();
        const [messageType, setMessageType] = useState();
        const [hidePassword, setHidePassword] = useState(true);
        const [age, setAge] = useState(false);
        const [agree, setAgree] = useState(false);

   // const url = "https://demo.treblle.com/api/v1/auth/register";
   const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_Register"
    const { storedCredentials, setStoredCredentials } = useContext(LoginCredentialsContext)
    const { IsVerified, setIsVerified } = useContext(IsLoginVerified) 


     console.log("VERIFIED======>>>>>>", IsVerified)
    const handleSignup = (credentials, setSubmitting) =>{
        let isMounted = true;
        const {email, password, mobile, firstname, lastname} = credentials;
        credentials = {...credentials, isLogged: false, otpVerified: false}
       // axios.post(url, {name: 'Ravi', email: email, password: password} ,  {headers: {Host: "demo.treblle.com"}})
       const post_obj = {First_Name: firstname, Last_Name: lastname ,Email_Id: email, Password: password, Mobile_No: mobile, Device_Token: devideId, Device_OS: devideOS };
        axios.post(url, post_obj)
        .then(response =>{
            console.log(response,"\n");
                const result = response.data;
               
                let ValidJson = result.replace('{"d":null}',"");
                ValidJson = JSON.parse(ValidJson);
                const { message, status, data} = ValidJson
               
               
                if(status == "1") { 
                    console.log("DATA received==\n\n\n\n\n", data, "\t\t\t\t\t", data[0]);
                    credentials['user_id'] = data;
                     persistLogin(credentials, message, status);
                    // (async () => {
                    //             await persistLogin(credentials, message, status);
                    //         })();
                     if(isMounted ){
                                   // persistLogin(credentials, message, status);
                                    setSubmitting(false);   
                                    AsyncStorage.setItem('user_id', JSON.stringify(data))
                                    .then(() =>{ console.log("USER id setup SUCCESSFULLY!!!!!")})
                                    .catch(() => {console.log("Error Setting userid")})
                                    // navigation.navigate('ConfirmOTP');
                                    navigation.dispatch(
                                        StackActions.replace('ConfirmOTP'),
                                        {
                                                toke: '',
                                                userid_can_be_passed_her: 'a'
                                        })
                                    }
                    

                }
                else if(status == "0")
                {
                     setSubmitting(false);   
                     setMessage(message)
                }
                console.log("DATA==", result);
        })
        .catch(err => {
            console.log("ERRORO====", err)
            setMessage('Network Error Occurred!!!', err)
            setSubmitting(false)
        })

             return () => {
                isMounted = false;
                };
    };
    const nextInput = () =>{
        console.log("Password focus()");
       phoneInput.current?.focus()
    }
const persistLogin = async  (credentials, message, status) => {
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
    const checkifcheckd = (vr='') =>{
        console.log(vr+"   CHECKED the AGE Checkbox====", age);
    }
    const handleMessage = (message, type='FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
     const mask = '+1 ([000]) [000]-[0000]';
  return (
      
    <KeyboardAvoidingWrapper>
    <StyledContainer style={{width: '100%'}}>
        
        <StatusBar style='dark' />
     
        {/* <Text style={{ color: !IsVerified ? 'red' : 'green'}}>ABC</Text> */}
        <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
          <StyledLine/>
             

                <Formik initialValues={{email:'', password: '', mobile: '', firstname: '', lastname: ''}} 
                        onSubmit={(values, {setSubmitting}, errors) => {
                            if(values.email== '' || values.mobile=='' || values.password== '') {
                                setMessage('Please Enter All The Values!!!! Thanks!!')
                                // console.log('Value not entered')
                                // console.log("VERIFIED now is", IsVerified)
                                setSubmitting(false);
                                setIsVerified(true)
                            }
                            else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                            {
                                  setMessage('Please Enter Valid Email Address')
                                  setSubmitting(false);
                            }
                            else if(!age) {
                                setMessage("Please Confirm Your Age is 18 or Above");
                                
                                 setSubmitting(false);
                            }
                            else if(!agree)
                            {
                                 setMessage("Please Agee to Terms & Conditions");
                                
                                 setSubmitting(false);
                            }
                           
                            else
                            {
                                console.log("VALUES RECEIVEd===", values)
                                setSubmitting(true)
                                handleSignup( values, setSubmitting)
                            }
                           
                        } }>

                        {
                   
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=> (
                            <StyledFormArea>
                                <MyTextInput
                                label=""
                                icon="user"   
                                placeholder="First Name"
                                placeholdertextcolor="#D2D2D2"
                                
                                maxLength = {42}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                value={values.firstname}
                                isPassword ={false}
                                 returnKeyType="next"
                                
                               
                                />
                                 <MyTextInput 
                                label=""
                                 icon="user"    
                                placeholder="Last Name"
                                placeholdertextcolor="#D2D2D2"
                               
                                maxLength = {42}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                value={values.lastname}
                                isPassword ={false}
                                 returnKeyType="next"
                                
                               
                                />
                                <MyTextInput 
                                label=""
                                icon="envelope"   
                                placeholder="Email Address"
                                placeholdertextcolor="#D2D2D2"
                                keyboardType="email-address"
                                maxLength = {92}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                isPassword ={false}
                                 returnKeyType="next"
                              
                               
                                />
                                <MyTextInput 
                                label=""
                                mask = {mask}
                                icon="phone-alt"   
                                placeholder="Phone Number"
                                placeholdertextcolor="#D2D2D2"
                                keyboardType="numeric"
                                maxLength = {10}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                value={values.mobile}
                                isPassword ={false}
                                returnKeyType="next"
                                
                               
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
                                returnKeyType="next"
                           
                                />
                               
                                            <CheckBox
                                                onPress={() => setAgree(!agree)}
                                                title="* Agree to the terms and condition"
                                                isChecked={agree}
                                            />
                                            
                                  
                                            <CheckBox 
                                                onPress={(vl) => { checkifcheckd('Before') ; setAge(!age); checkifcheckd()}}
                                                title="* I am above 18 years old"
                                                isChecked={age}
                                            />
                                            
                                  
                                  
                                <MsgBox>{message}</MsgBox>
                                {!isSubmitting &&
                                <StyledButton onPress={handleSubmit}>
                                    
                                    <ButtonText>Signup</ButtonText>
                                </StyledButton>
                                    }
                                     {isSubmitting &&
                                        <StyledButton><ActivityIndicator size="large" ></ActivityIndicator></StyledButton>
                                        //disabled={true}
                                    }
                                           <ExtraView>

                                
                               
                                        <ExtraText>Already have an Account ? </ExtraText>
                                   
                                            
                                    
                                        <TextLink onPress={() => navigation.navigate('Login')}>Login</TextLink>
                                
                              
                                </ExtraView>
                                <StyledLine/>
                                
                                  
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>
                   
        </InnerContainters>
    </StyledContainer></KeyboardAvoidingWrapper>
  )
};


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View >
          
            {/* <StyledInputLable fontfamily='Roboto-Regular' adjustsFontSizeToFit   numberOfLines={0} style={{borderColor:'#ff0000'}}>{label}</StyledInputLable> */}
             <LeftIcon>
          <FontAwesome5 name={icon} size={24} color="black" />
         </LeftIcon>
         <StyledTextInput {...props}/>
             {
                 isPassword &&
                    <RightIcon  onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? "md-eye-off" : "md-eye" } size={24}></Ionicons>
                    </RightIcon>
             }
         
          
        </View>
    )

};


export default Signup;
