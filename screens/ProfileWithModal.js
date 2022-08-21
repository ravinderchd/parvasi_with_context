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

const ProfileWithModal = (props) => {
        const [visible, setVisible] = React.useState(false);
        const {height} =   Dimensions.get('window');
        const phoneInput = useRef()
        const emailInput = useRef();
        const passwordInput = useRef();
        const [message, setMessage] = useState();
        const [message_chng_pwd, setMessage_chng_pwd] = useState();
        
        const [messageType, setMessageType] = useState();
        const [hidePassword, setHidePassword] = useState(true);
        const mask = '+1 ([000]) [000]-[0000]';
        const [image, setImage] = useState(null);
        const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
        const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_Update_User_Profile"
       
        const [starting_Fname, setStarting_Fname] = useState();
        const [starting_Lname, setStarting_Lname] = useState();
        const [starting_Phone, setStarting_Pname] = useState();
        const [starting_Email, setStarting_Email] = useState();
        const [starting_Password, setStarting_Password] = useState();
        const [starting_Profile_object, setStarting_Profile_object] = useState({}) 
        //const [first_name, setFirstName] = useState();
         // console.log("STOREDDdddd Credentials====\n\n\n\n",password )
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
        const showModal = () =>{
          props.navigation.navigate('ChangePassword')
            //setVisible(true)
        };
 const handleProfileUpdate = (credentials, setSubmitting) =>{
        let isMounted = true;
        const {email, password, phone, first_name, last_name} = credentials;
        credentials = {...credentials, isLogged: false, otpVerified: false}
       // axios.post(url, {name: 'Ravi', email: email, password: password} ,  {headers: {Host: "demo.treblle.com"}})
       const {user_id} = storedCredentials;
       const post_obj = {First_Name: first_name, Last_Name: last_name ,Email_Id: email,  Mobile_No: phone, user_id: user_id };
       console.log("OBJECT ===", post_obj);
        axios.post(url, post_obj)
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
                    credentials['firstname'] = first_name
                    credentials['lastname'] = last_name
                    credentials['email'] = email
                    credentials['mobile'] = phone
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
            console.log("ERRORO====", err.response.data)
            setMessage(err.response.data, err.response)
            setSubmitting(false)
        })

            
    };

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
useEffect(() => {
    
      //console.log("In Profile12313213232131====", storedCredentials);
       // setTabSelected(JSON.stringify(route.params.tabType));
        AsyncStorage.getItem('loginCredentials')
        .then((value)=>{
          console.log("First name===", value.first_name)
            //console.log("Getting Login EETAILS=====\n\n\n\n", value);
            //handleMessage(message, status);
            //const {password, user_id} = storedLogin
           //setcurrentPassword(password);
            console.log("In Profile12313213232131====", value);
            value = JSON.parse(value);
            //const {email, firstname, lastname, mobile, password} = value;
            setStarting_Profile_object(value)
            console.log("STARTING PROFILE OBJEC==",typeof(starting_Profile_object))
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
             
               
                <Formik key={1} enableReinitialize={true} initialValues={{email:starting_Profile_object.email, password: starting_Profile_object.password, phone: starting_Profile_object.mobile, first_name: starting_Profile_object.firstname, last_name: starting_Profile_object.lastname}} 
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
                                editable={false}
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
                                press={showModal}
                                change={true}
                                navigation = {props.navigation}
                                />
                                
                                <MsgBox>{message}</MsgBox>
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
         <ModalPoup visible={visible}>
                        <View style={{alignItems: 'center'}}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                <Formik key={2}
                        enableReinitialize={false} 
                        initialValues={{password: '', newpassword: ''}} 
                        onSubmit={(values, {setSubmitting}, errors) => {
                            if(values.newpassword== '') {
                                setMessage_chng_pwd('Please Enter New Password')
                                // console.log('Value not entered')
                                // console.log("VERIFIED now is", IsVerified)
                                setSubmitting(false);
                                // setIsVerified(true)
                            }
                            else if(values.password == '')
                             {
                               setMessage_chng_pwd('Please Enter Old Password')
                                // console.log('Value not entered')
                                // console.log("VERIFIED now is", IsVerified)
                                setSubmitting(false);
                             }   
                            else if(values.password == values.newpassword)
                             {
                               setMessage_chng_pwd('New Password cannot be same as old password')
                                // console.log('Value not entered')
                                // console.log("VERIFIED now is", IsVerified)
                                setSubmitting(false);
                             }                               
                            else
                            {
                              const {user_id} = storedCredentials;
                              console.log("USERID===", user_id)
                               console.log("In Updating PAssword")
                              setSubmitting(true)
                               const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_ChangePassword"
                              const post_obj = {Old_Password: oldpassword, New_Password: values.newpassword , user_id: user_id };
                              console.log("Object===", post_obj)
                                    axios.post(url, post_obj)
                                    .then(response => {
                                       
                                            const result = response.data;
                                            console.log("RESPONSE FROM Change PWD==,",response)
                                            let ValidJson = result.replace('{"d":null}',"");
                                            ValidJson = JSON.parse(ValidJson);
                                            const { message, status, data} = ValidJson
                                          
                                          
                                            if(status == "1") { 
                                             
                                                credentials['user_id'] = data;
                                                setStoredCredentials(...storedCredentials, {password: newpassword});
                                                persistLogin(credentials, message, status);
                                                setSubmitting(false);   
                                                setMessage_chng_pwd('Password Changed Successfullly!!!')  
                                               
                                              
                                            }
                                            else if(status == "0")
                                            {
                                                setSubmitting(false);   
                                                setMessage_chng_pwd(message)
                                            }
                                            
                                    })
                                    .catch(err => {
                                       
                                        setMessage_chng_pwd('Network Error Occurred!!!', err)
                                        setSubmitting(false)
                                    })
                                   
                                
                            }
                           
                        } }
                        
                        >

                        {
                   
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=> (
                            <StyledFormArea>
                                
                                <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="Existing Password"
                                placeholdertextcolor="#D2D2D2"
                                onChangeText={handleChange('oldpassword')}
                                onBlur={handleBlur('oldpassword')}
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
                                onChangeText={handleChange('newpassword')}
                                onBlur={handleBlur('newpassword')}
                                value={values.newpassword}
                                isPassword ={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                                secureTextEntry = {hidePassword}
                                returnKeyType="next"
                                change={false}
                                />
                                <MsgBox>{message_chng_pwd}</MsgBox>
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
                                {/* <StyledLine/> */}
                                
                                  
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>
                            {/* <Button title='Close' onPress={() => setVisible(false)}></Button> */}
                        </View>

        {/* <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Congratulations registration was successful
        </Text> */}
      </ModalPoup>
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


const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
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
export default ProfileWithModal
