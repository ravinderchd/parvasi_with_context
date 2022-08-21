import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, Keyboard, ActivityIndicator  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CodeInputFields from '../Components/CodeInputFields';
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';
import { InnerContainters, PageLogo, StyledContainer, PageTitle, MyTextInput, LoginHeader,  MsgBox, StyledFormArea,  StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink, TopHalf, InfoText } 
from './../Components/styles'
import { LoginCredentialsContext } from './../Components/LoginCredentialsContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
// import DrawerStack from '../Components/DrawerStack';

 let newInputIndex =  0;
 const inputs = Array(4).fill('');
 
const ConfirmOTP = ({navigation}) => {
    
    const [userId, setuserId] = useState();
    const [currentEmail, setCurrentEmail] = useState()
    const [ code, setCode] = useState('');
    const [ pinReady, setPinReady] = useState('');
    const [message, setMessage] = useState();
    const [ OTP, setOTP ] = useState({0:'', 1: '', 2: '', 3: ''});
    const { storedCredentials, setStoredCredentials } = useContext(LoginCredentialsContext)
    const MAX_CODE_LNGTH = 4;
  
    const input = useRef('nextInputIndex');
     const [nextInputIndex, setNextInputIndex] = useState(0);
     const [isLoading, setIsLoading] = useState(false);
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
 
 useEffect(()=>{
    console.log("In first time use effects");
    setOTP('')
 },[])
 useEffect(() =>{
  //  console.log("Credentials receveide inn OTP Component==", loginCredentials);
 
    // const {user_id} = loginCredentials
   
    // console.log("userid recevied in OTP>> Confirm OTP is===", user_id)
   
   AsyncStorage.getItem('loginCredentials').then((val) => {
      const {user_id, email} = JSON.parse(val);
      
      setCurrentEmail(email)
      setuserId(user_id);
    
     // setuserId(val);
      input.current.focus();
   }).catch((err) => {console.log("ERROR Occured getting user id", err)});
   

  
 },[nextInputIndex])

const persistLogin = async  (credentials, message, status) => {
         AsyncStorage.setItem('loginCredentials', JSON.stringify(credentials))
        .then(()=>{
            console.log("PERSIST Login cred", credentials," STATIS===", status, "message==", message);
            //handleMessage(message, status);
            
        })
        .catch(err => {
            console.log("Error Occuredd at PERSIST Login", err)
        })
    }
 const isValidObj = (obj) => {
   return Object.values(obj).every(val => {
     return val.trim();
   });
 }
 const submitOTP = () =>{
   if(isValidObj(OTP))
   {
     let otpVal = '';
     Object.values(OTP).forEach(val => {
      otpVal += val.trim();
     })
     
    
     //USER ID is setup using usestate===>>>>userId
     const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/User_Check_OTP_For_Login";
     console.log("OTP Value combined000000==", otpVal);
     const obj = {user_id: userId, OTP: otpVal};
     console.log(obj);
      axios.post(url, obj )
      .then(response =>{
        console.log(response.data)
                const result = response.data;
                setIsLoading(true)
                let ValidJson = result.replace('{"d":null}',"");
                ValidJson = JSON.parse(ValidJson);
                const { message, status, data} = ValidJson
                setMessage(message)
                console.log("AAAAAAAAAA")
                if(status==1){
                  setIsLoading(false);       
                    storedCredentials.otpVerified =true
                    storedCredentials.isLogged = true
                   setStoredCredentials({...storedCredentials});
                   persistLogin({...storedCredentials});
                   console.log("Credentials====", storedCredentials)         
                   navigation.navigate('Dashboard');
                }
                else{
                  console.log("Status====0")
                   setIsLoading(false);     
                }
                
      })
      .catch(err =>{console.log("ERROR Validating OTP", err);setIsLoading(false);})
   }
   else
   {
      setMessage('Please Make Sure you Enter Complete OPT');
     console.log("Invalid object")
   }
   Keyboard.dismiss();
 }
 return (
 <KeyboardAvoidingWrapper >
  <StyledContainer>
    <InnerContainters>
       <StatusBar style='dark' />
          <InnerContainters>
            <PageLogo resizeMode="cover" source={require('./../assets/parvasi-logo.png')} />
          <StyledLine/>
            <PageTitle style={{fontSize:25, marginTop:10}}>Account Verification</PageTitle>
            <InfoText style={{marginTop:30}}>Please verify your email using the link sent to {currentEmail} </InfoText>
            <View style={{flex:1, flexDirection: 'row', marginVertical:10}}>
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
            <MsgBox>{message}</MsgBox>
            <View style={{flex:1, flexDirection: 'row'}}>
               
                   {isLoading && 
                   <StyledButton><ActivityIndicator size="large" ></ActivityIndicator></StyledButton>}
                    {!isLoading &&
                   <StyledButton style={{width:'90%'}} onPress={submitOTP}><ButtonText>Verify</ButtonText></StyledButton>}
            
            </View>
             
            <InfoText>Did Not Receive Code? </InfoText>
            <TextLink onPress={() => navigation.navigate('ResendOTP')}>Resend</TextLink>
        
                      </InnerContainters>
   </InnerContainters>
   </StyledContainer>
   </KeyboardAvoidingWrapper>
  
 )
}
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
})
export default ConfirmOTP
