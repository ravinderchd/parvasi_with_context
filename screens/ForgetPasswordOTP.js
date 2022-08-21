import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect, useContext} from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native'
import { ErrorMessage, Field, Form, Formik, FormikProvider, useFormik } from "formik";
import CodeInputFields from '../Components/CodeInputFields';
import { FontAwesome5 } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';
import { InnerContainters, PageLogo, phoneNumberMask, StyledCheckBox, StyledContainer, PageTitle, devideId, devideOS, LoginHeader,  StyledFormArea,  StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink, MsgBox } from '../Components/styles';



import axios from 'axios';
import { LoginCredentialsContext } from './../Components/LoginCredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
 let newInputIndex =  0;
 const inputs = Array(4).fill('');
 
const ForgetPasswordOTP = ({navigation, route}) => {
    const {user_id, securityCode } = route.params;
    const input = useRef('');
    const [userId, setuserId] = useState();
    const [ code, setCode] = useState('');
    const [ pinReady, setPinReady] = useState('');
    const [message, setMessage] = useState();
     const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
      const [hidePassword, setHidePassword] = useState(true);
      const [hidePassword1, setHidePassword1] = useState(true);
    const [ OTP, setOTP ] = useState({0:'', 1: '', 2: '', 3: ''});

    const MAX_CODE_LNGTH = 4;


      console.log(route.params)
    const [nextInputIndex, setNextInputIndex] = useState(0);
    
  
const handleChangeText =(text,index) =>{
      console.log("INDEX===", index)
      const newOTP = {...OTP};
      newOTP[index] = text;
      setOTP(newOTP);

      const lastInputIndex = inputs.length-1
      if(!text)
       newInputIndex = index === 0 ? 0 : index - 1
       else
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
      console.log("NEW input ndex==", newInputIndex)
      setNextInputIndex(newInputIndex); 
    };
  
 useEffect(() =>{
   input.current.focus();
 },[nextInputIndex])

 const isValidObj = (obj) => {
   return Object.values(obj).every(val => {
     return val.trim();
   });
 }

 const submitOTP = (credentials, setSubmitting) =>{
   if(isValidObj(OTP))
   { // OTP is VALID
     let otpVal = '';
     Object.values(OTP).forEach(val => {
      otpVal += val.trim();
     });
     console.log("LOCAL OTP VAL ==", otpVal);
     if(String(otpVal) === String(securityCode))
      {
              setMessage('Please Wait')
              const {password} = credentials;
              const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_ChangePassword";
              //  console.log("OTP Value combined==", otpVal);
              //  console.log("CREDENTIALS RECEIVED===", credentials);
        
               obj_to_post = { user_id: user_id,  New_Password: password }
                axios.post(url,obj_to_post)
                .then(response =>{
                          console.log(response.data)
                          const result = response.data;
                          
                          let ValidJson = result.replace('{"d":null}',"");
                          ValidJson = JSON.parse(ValidJson);
                          const { message, status, data} = ValidJson  
                          setMessage(message)
                          console.log("REceived===", result)
                          if(status==1){
                            //Clear Stored Credentials if Any
                            clearLogin();
                           Alert.alert(
                            "Successfully Changed",
                            "My Alert Msg",
                            [
                              
                              { text: "OK", onPress: () => navigation.navigate('Login') }
                            ]
                          );

                           
                          }
                          else
                          {
                               setSubmitting(false)
                          }
                          
                })
                .catch(err =>
                  {
                    setMessage(err)
                  console.log("ERROR Submitting REquest",err)
                  setSubmitting(false)
                })
          }
          else
          {
             setMessage("OTP DOES NOT MATCH!! Please Ensure that you entered the OPT Received on EMAIL");
              setSubmitting(false);
     
          }
   }
   else
   {
     
     setMessage("Please Fill OPT")
     console.log("Invalid object")
      setSubmitting(false);
     
   }
  
 }

const clearLogin = () => {
        console.log("CLEARING storage");
        AsyncStorage.removeItem('loginCredentials')
        .then(()=>{
            console.log("Cleared :pgo");    
            setStoredCredentials("")
            navigation.navigate('Login')

        })
        .catch((err)=>{
            console.log("ERROR==", err)
        })
    }
 return (
 <KeyboardAvoidingWrapper>
    <StyledContainer>
        
      
     {/*
     
        Check if object has any missing value====>>
        let exists = Object.keys(person).some(key => (person[key] === ""|| person[key] === null));
     */}

        <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
          <StyledLine/>
             <MsgBox>Please Enter OTP Received on your email to reset your password</MsgBox>

                <Formik initialValues={{ password: '',  OTP}} 
                        onSubmit={(values, {setSubmitting}, errors) => {
                          console.log("OTp Combined==", OTP)
                        
                         
                            if(values.password== '') {
                                setMessage('Please Enter All The Values!!!! Thanks!!')
                                setSubmitting(false);
                             
                            }
                           
                            else
                            {
                                submitOTP(values, setSubmitting)
                                
                               
                            }
                           
                        } }>

                        {
                   
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=> (
                            
                            <StyledFormArea>
                                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', marginVertical:10, width:'100%'}}>
                                    {
                                    inputs.map((inp, index) => {
                                        return <TextInput style={styles.input}  key={index.toString()}
                                                value={OTP[index]}
                                                onChangeText={(text) => handleChangeText(text, index)}
                                                keyboardType="numeric"
                                                maxLength={1}
                                                ref = {nextInputIndex === index ? input: null}

                                        />;
                                    })
                                    }
                                        
                                    </View>
                                
                                
                                
                            
                                
                                <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="New Password"
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
                                 {/* <MyTextInput 
                                label=""
                                icon="lock"    
                                placeholder="New Password"
                                placeholdertextcolor="#D2D2D2"
                                onChangeText={handleChange('Password')}
                                onBlur={handleBlur('Password')}
                                value={values.Password}
                                isPassword ={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                                secureTextEntry = {hidePassword}
                                returnKeyType="next"
                         
                                /> */}
                                   
                                  
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
const {width} = Dimensions.get('window');
const inputWidth = Math.round(width/6);
const styles = StyleSheet.create({
  input: {
  
    borderColor: '#dddddd',
    borderWidth: 2,
    margin:2,
    width: inputWidth,
    height: inputWidth,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 23,
    backgroundColor: 'rgba(255,140,120,0.1)',
    fontSize: 25
  }
});
export default ForgetPasswordOTP;
