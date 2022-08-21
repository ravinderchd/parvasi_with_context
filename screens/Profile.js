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
import * as ImagePicker from 'expo-image-picker';
import { LoginCredentialsContext } from '../Components/LoginCredentialsContext';

const Profile = (props) => {
        const [visible, setVisible] = React.useState(false);
        const {height} =   Dimensions.get('window');
        const phoneInput = useRef()
        const emailInput = useRef();
        const passwordInput = useRef();
        const [message, setMessage] = useState();
        const [messageType, setMessageType] = useState();
        const [hidePassword, setHidePassword] = useState(true);
        const mask = '+1 ([000]) [000]-[0000]';
        const [image, setImage] = useState(null);
        const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
         const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx?op=User_Update_User_Profile"
          const {email, firstname, lastname, mobile, password, user_id} = storedCredentials;
         
        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
            setImage(result.uri);
            }
        };
const changePWd = () =>{
  props.navigation.navigate('ChangePassword');
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n\n\n");
}
const logout =() => {
    setStoredCredentials({});
    props.navigation.navigate('Login');
}
   const handleProfileUpdate = (credentials, setSubmitting) =>{
        let isMounted = true;
        const {email, password, mobile, firstname, lastname} = credentials;
        credentials = {...credentials, isLogged: false, otpVerified: false}
       // axios.post(url, {name: 'Ravi', email: email, password: password} ,  {headers: {Host: "demo.treblle.com"}})
       const post_obj = {First_Name: firstname, Last_Name: lastname ,Email_Id: email, Password: password, Mobile_No: mobile, user_id: devideId, Device_OS: devideOS };
        axios.post(url, post_obj)
        .then(response =>{
            console.log( "RESPOMSE from profile update==",response,"\n");
                const result = response.data;
               
                // let ValidJson = result.replace('{"d":null}',"");
                // ValidJson = JSON.parse(ValidJson);
                const { message, status, data} = result
               
               
                if(status == "1") { 
                    console.log("DATA received==\n\n\n\n\n", data, "\t\t\t\t\t", data[0]);
                   // credentials['user_id'] = data;
                     //persistLogin(credentials, message, status);
                 }
                else if(status == "0")
                {
                     setSubmitting(false);   
                     setMessage(message)
                }
                console.log("DATA==", result);
        })
        .catch(err => {
            console.log("ERRORO12222=1111111===", err.response.data)
            setMessage('Network Error Occurred!!!', err.response.data)
            setSubmitting(false)
        })

             return () => {
                isMounted = false;
                };
    };
useEffect(() => {

      console.log("In Profile====", storedCredentials);
       // setTabSelected(JSON.stringify(route.params.tabType));
        AsyncStorage.getItem('loginCredentials')
        .then((value)=>{
            console.log("Gettingaaaaa Login EETAILS=====\n\n\n\n", value);
            //handleMessage(message, status);
            //const {password, user_id} = storedLogin
           //setcurrentPassword(password);

        })
        .catch(err => {
            console.log("Error Retrieving Login Information", err)
        })
  
  },[]);
  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer style={{width: '100%', flex:1, flexDirection: 'column'}}>
        
        <StatusBar style='dark' />
     
        {/* <Text style={{ color: !IsVerified ? 'red' : 'green'}}>ABC</Text> */}
        <InnerContainters>
            <Pressable onPress={pickImage} >
            <View style={{ backgroundColor:'#ddd', borderRadius:50}}><Image  style={{ width: 100, height: 100 }} /></View>
            </Pressable>
          <StyledLine/>
             

                <Formik key={1} enableReinitialize={true} initialValues={{email:email, password: password, phone: mobile, first_name: firstname, last_name: lastname}} 
                        onSubmit={(values, {setSubmitting}, errors) => {
                            if(values.email== '' || values.phone=='' || values.password== '') {
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
                                handleProfileUpdate( values, setSubmitting)
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
                                onChangeText={handleChange('first_name')}
                                onBlur={handleBlur('first_name')}
                                value={values.first_name}
                                isPassword ={false}
                                 returnKeyType="next"
                                
                               
                                />
                                 <MyTextInput 
                                label=""
                                 icon="user"    
                                placeholder="Last Name"
                                placeholdertextcolor="#D2D2D2"
                               
                                maxLength = {42}
                                onChangeText={handleChange('last_name')}
                                onBlur={handleBlur('last_name')}
                                value={values.last_name}
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
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                isPassword ={false}
                                returnKeyType="next"
                                
                               
                                />
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
                                press={changePWd}
                                change={true}
                                />
                                
                                <MsgBox>{message}</MsgBox>
                                <Pressable onPress={logout}>
                                <Text style={{textAlign:'center', color:'#ff0000', fontSize:16, marginVertical:6}}>Logout</Text>
                                </Pressable>
                                {!isSubmitting &&
                                <StyledButton onPress={handleSubmit}>
                                    
                                    <ButtonText>Update Profile</ButtonText>
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
    
                   
               
        </InnerContainters>
        
    </StyledContainer>
                    
    
    </KeyboardAvoidingWrapper>
  )
};
const MyTextInput = ({label, icon, isPassword, change, hidePassword, setHidePassword, press, ...props}) => {
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
                change && <RightText><Text  onPress={press}>Change Password12</Text></RightText>
             }
        </View>
    )

};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default Profile
