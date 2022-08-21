import React ,{ useState, useContext, useEffect} from 'react'
import { Text, ActivityIndicator } from 'react-native';

import { View } from 'react-native'
import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { InnerContainters, PageLogo, StyledContainer,  MsgBox, StyledFormArea, StyledLine, StyledTextInput, StyledButton, ButtonText, ExtraView, ExtraText,TextLink, LeftIcon, SubTitle } from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

//API REQUESTS
import axios from 'axios';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ResendOTP = (props) => {
    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();
    const [userId, setuserId] = useState();
    const [currentEmail, setCurrentEmail] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [reSent, setResent] = useState(false);
 useEffect(() =>{

   
   AsyncStorage.getItem('loginCredentials').then((val) => {
      const {user_id, email} = JSON.parse(val);
      
      setCurrentEmail(email)
      setuserId(user_id);
    
     // setuserId(val);
      input.current.focus();
   }).catch((err) => {console.log("ERROR Occured getting user id", err)});
   

  
 },[])
const handleResendOtp = ({values, setSubmitting}) =>{
     const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_Resend_OTP_On_Register"
     const user_obj = {User_Id: userId}
   axios.post(url, user_obj )
      .then(response =>{
                console.log("OTP RESENT Received data===",response.data)
                const result = response.data;
                setIsLoading(true)
                let ValidJson = result.replace('{"d":null}',"");
                ValidJson = JSON.parse(ValidJson);
                const { message, status, data} = ValidJson
                setMessage(message)
                
                if(status==1){
                  setIsLoading(false);      
                  setResent(true)
                  console.log("DATA===",data)
                //     storedCredentials.otpVerified =true
                //     storedCredentials.isLogged = true
                //    setStoredCredentials({...storedCredentials});
                //    persistLogin({...storedCredentials});
                     
                   //navigation.navigate('ConfirmOTP');
                }
                else{
                   console.log("Status====0")
                   setIsLoading(false);     
                }
                
      })
      .catch(err =>{console.log("ERROR Validating OTP", err);setIsLoading(false);})
    }
  return (
   <StyledContainer>
        
        {/* <StatusBar style='dark' /> */}
        {/* <LoginHeader></LoginHeader> */}
        
        <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
             <SubTitle style={{fontSize:14,fontWeight:'normal',marginTop:20}}>Enter your email address down inorder to recieve OTP on mail</SubTitle>
          <StyledLine/>
             
               
                <Formik initialValues={{email:'',}} 
                        onSubmit={(values, {setSubmitting}) => {
                                if(values.email=='' || values.email=='') {
                                    setMessage("Please Enter Email Address!!")
                                    setSubmitting(false);
                                }
                                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                                    {
                                        setMessage('Please Enter Valid Email Address')
                                        setSubmitting(false);
                                    }
                                else{
                                    console.log(values);
                                    handleResendOtp(values, setSubmitting)
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
                                maxLength = {112}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                isPassword ={false}
                                 returnKeyType="next"
                              
                                />
                    
                                <MsgBox>{message}</MsgBox>
                                { reSent? <Pressable onPress={() => props.navigation.navigate('ReConfirmOTP')}><View  style={{alignContent:'center',alignItems:'center'}}><Text>Click To Verfy Now</Text></View></Pressable>:null}
                                {!isLoading && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Send OTP</ButtonText>
                                </StyledButton>}
                                {isLoading && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large"  ></ActivityIndicator>
                                </StyledButton>}
                                <StyledLine/>
                                <ExtraView>

                                
                               
                                        <ExtraText>Already Confirmed ?</ExtraText>
                                   
                                            
                                    
                                        <TextLink onPress={() => props.navigation.navigate('Login')}>Login</TextLink>
                                
                              
                                </ExtraView>
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>

        </InnerContainters>
    </StyledContainer>
  )
}
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

export default ResendOTP
