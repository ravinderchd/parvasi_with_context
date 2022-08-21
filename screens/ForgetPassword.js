import React ,{ useState, useContext} from 'react'
import { Text, ActivityIndicator } from 'react-native';

import { View } from 'react-native'
import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';

//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { InnerContainters, PageLogo, StyledContainer,  MsgBox, StyledFormArea, StyledLine, StyledTextInput, StyledButton, ButtonText, ExtraView, ExtraText,TextLink, LeftIcon, SubTitle } from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

//API REQUESTS
import axios from 'axios';

const ForgetPassword = ({navigation}) => {
    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();
    const [responseStatus, setResponseStatus] = useState(false);
    const [randCode, setrandCode] =useState('');
    const [user_id_received, setUser_id_received] = useState('')
    const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_ForgetPassword";
   
    const handleForgetPassword = (credentials, setSubmitting) =>{
       // console.log("IN STORE --> Credentials Receivd==", credentials)
        const {email} = credentials;
        const randCode = Math.floor(1000 + Math.random() * 9000);
        setrandCode(randCode);
        const obj_to_post = {SecurityCode: randCode, Email: email }
         //console.log("OBJECT===", obj_to_post)
        axios.post(url, obj_to_post)
        .then(response =>{
            // console.log(response,"\n");
                const result = response.data;
                console.log("RESPONSE RECEIVED =====", response.data);
                let ValidJson = result.replace('{"d":null}',"");
                ValidJson = JSON.parse(ValidJson);
                
                const {message, data, status} = ValidJson
            if(status==1) {   
               setMessage( message)
                setResponseStatus(status)
              const {user_id} = data[0] // RECEIVING ARRAY
               console.log("RESPONSE RECEIVED vALID =====", ValidJson);
              setUser_id_received(user_id);
                console.log("USER ID SET is==", user_id);
            } else
            {
                  setMessage(message)
            }
        })
        .catch(err => {
            console.log("ERRORO====", err)
            setMessage('Network Error Occurred!!!', err)
            setSubmitting(false)
        })
    }
  return (
       <KeyboardAvoidingWrapper>
   <StyledContainer>
        
        {/* <StatusBar style='dark' /> */}
        {/* <LoginHeader></LoginHeader> */}
        
        <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
             <SubTitle style={{fontSize:14, marginTop:20}}>Enter your email address down inorder to recieve OTP on mail</SubTitle>
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
                                    console.log('Values RECEIVED===',values);
                                    setSubmitting(false);
                                    handleForgetPassword(values, setSubmitting)
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
                    
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {responseStatus == 1 ? <MsgBox onPress={() => navigation.navigate('ForgetPasswordOTP', {securityCode: randCode, user_id: user_id_received})}>Proceed to change password</MsgBox>: null }
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Retrieve Password</ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large"  ></ActivityIndicator>
                                </StyledButton>}
                                <View style={{marginTop:20}}>
                                 <StyledButton onPress={()=> navigation.navigate('Login')}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton></View>
                                <StyledLine/>
                                <ExtraView>

                                
                               
                                        <ExtraText></ExtraText>
                                   
                                            
                                    
                                       
                                
                              
                                </ExtraView>
                            </StyledFormArea>
                            
                        )
                    }
                </Formik>

        </InnerContainters>
    </StyledContainer></KeyboardAvoidingWrapper>
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

export default ForgetPassword
