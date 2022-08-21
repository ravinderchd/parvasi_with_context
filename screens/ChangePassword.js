
import React, {useRef, useState, useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View,ActivityIndicator, Dimensions, Image , Pressable, StyleSheet, Text, Modal, Animated, TouchableOpacity, Button } from 'react-native';
import { ErrorMessage, Field, Form, Formik, FormikProvider, useFormik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons , Octicons, Ionicons } from '@expo/vector-icons'; 
import { InnerContainters, PageLogo, RightText, phoneNumberMask, StyledCheckBox, StyledContainer, PageTitle, devideId, devideOS, LoginHeader,  StyledFormArea,  StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink, MsgBox } from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentialsContext } from '../Components/LoginCredentialsContext';
const ChangePassword = () => {
     const [hidePassword, setHidePassword] = useState(true);
     const [hidePassword1, setHidePassword1] = useState(true);
     const [message, setMessage] = useState();
     const [starting_Profile_object, setStarting_Profile_object] = useState({}) 
     const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
useEffect(() => {

        AsyncStorage.getItem('loginCredentials')
        .then((value)=>{
         
        
            value = JSON.parse(value);
             console.log("First name===", value)
            setStarting_Profile_object(value)
 
        })
        .catch(err => {
            console.log("Error Retrieving Login Information", err)
        })
  
  },[]);
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
 const handlePasswordUpdate = (credentials, setSubmitting) =>{
        let isMounted = true;
        const {password1, password} = credentials;
        credentials = {...credentials, isLogged: false, otpVerified: false}
       // axios.post(url, {name: 'Ravi', email: email, password: password} ,  {headers: {Host: "demo.treblle.com"}})
       const {user_id} = storedCredentials;
     
      
       const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_ChangePassword"
       const post_change_pwd_obj = {Old_Password: password, New_Password: password1 , user_id: user_id };
        console.log("OBJECT ===", post_change_pwd_obj);
        axios.post(url, post_change_pwd_obj)
        .then(response =>{
            console.log(response,"\n");
                const result = response.data;
               
                let ValidJson = result.replace('{"d":null}',"");
                ValidJson = JSON.parse(ValidJson);
                const { message, status, data} = ValidJson
               
               
                if(status == "1") { 
                    console.log("DATA received==\n\n\n\n\n", data, "\t\t\t\t\t", data[0]);
                    credentials['user_id'] = user_id;
                    credentials['isLogged'] = true
                    credentials['otpVerified'] = true
                    credentials['firstname'] = starting_Profile_object.first_name
                    credentials['mobile'] = starting_Profile_object.phone
                    credentials['lastname'] =  starting_Profile_object.last_name
                     credentials['password'] = password1
                     credentials['email'] = starting_Profile_object.email
                    persistLogin(credentials, message, status);

                   setSubmitting(false);   
                     setMessage(message)
                    

                }
                else if(status == "0")
                {
                     setSubmitting(false);   
                     setMessage(message)
                }
                console.log("DATA==>>>", result);
        })
        .catch(err => {
            console.log("ERRORO====", err)
            setMessage(err, err.response)
            setSubmitting(false)
        })

            
    };
  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer style={{width: '100%', height:'100%',flex:1, flexDirection: 'column'}}>
        
        <StatusBar style='dark' />
     
        {/* <Text style={{ color: !IsVerified ? 'red' : 'green'}}>ABC</Text> */}
       
            
          <StyledLine/>
     <Formik key={2}
                        enableReinitialize={true} 
                        initialValues={{password: starting_Profile_object.password, password1: ''}} 
                        onSubmit={(values, {setSubmitting}, errors) => {
                            if(values.password1== '') {
                                setMessage('Please Enter New Password')
                                // console.log('Value not entered')
                                // console.log("VERIFIED now is", IsVerified)
                                setSubmitting(false);
                                setIsVerified(true)
                            }
                                                       
                            else
                            {
                                console.log("VALUES RECEIVEd===", values)
                                setSubmitting(true)
                                handlePasswordUpdate( values, setSubmitting)
                            }
                           
                        } }>

                        {
                   
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=> (
                            <StyledFormArea>
                                
                                <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="Existing Password"
                                placeholdertextcolor="#D2D2D2"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword ={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                                secureTextEntry = {hidePassword}
                                returnKeyType="next"
                                 change={false}
                                />
                                <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="New Password"
                                placeholdertextcolor="#D2D2D2"
                                onChangeText={handleChange('password1')}
                                onBlur={handleBlur('password1')}
                                value={values.password1}
                                isPassword ={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword1}
                                secureTextEntry = {hidePassword}
                                returnKeyType="next"
                                change={false}
                                />
                                <MsgBox>{message}</MsgBox>
                                {!isSubmitting &&
                                <StyledButton onPress={handleSubmit}>
                                    
                                    <ButtonText>Update Password</ButtonText>
                                </StyledButton>
                                    }
                                     {isSubmitting &&
                                        <StyledButton><ActivityIndicator size="large" ></ActivityIndicator></StyledButton>
                                        //disabled={true}
                                    }
                                           <ExtraView>

                                
                               
                                       
                                
                              
                                </ExtraView>
                                <StyledLine/>
                                
                                  
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>
                 </StyledContainer>
                    
    
    </KeyboardAvoidingWrapper>
  )
};

const MyTextInput = ({label, icon, isPassword, change, hidePassword, setHidePassword, press, navigation, ...props}) => {
    return (
        <View >
          
            {/* <StyledInputLable fontfamily='Roboto-Regular' adjustsFontSizeToFit   numberOfLines={0} style={{borderColor:'#ff0000'}}>{label}</StyledInputLable> */}
             <LeftIcon>
          <FontAwesome5 name={icon} size={24} color="black" />
         </LeftIcon>
         <StyledTextInput {...props}/>
             {
                 isPassword && 
                    <><RightIcon  onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? "md-eye-off" : "md-eye" } size={24}></Ionicons>
                    </RightIcon>
                    </>
             }
             
             {
                change && <RightText><Text  onPress={press}>Change Password</Text></RightText>
             }
        </View>
    )

};

export default ChangePassword
