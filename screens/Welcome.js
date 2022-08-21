import React, {useState, useContext, useEffect} from 'react'

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native'

import { InnerContainters, PageLogo, StyledContainer, PageTitle, LoginHeader,  StyledFormArea,  WelcomeContainer, StyledInputLable, LeftIcon, StyledTextInput,StyledLine, StyledButton, ButtonText, RightIcon, ExtraView, ExtraText,TextLink, Avatar, SubTitle, WelcomeImage } from '../Components/styles'
import { LoginCredentialsContext } from './../Components/LoginCredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Welcome = ({navigation}) => {
 const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
  const {name, email, created } = storedCredentials;

useEffect(() => {
	console.log("I run everytime this component rerenders", storedCredentials, "ENDSSSSSS")
    const {name, email } = {storedCredentials};
});
   

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
      
        <>
        <StatusBar style='dark' />
        
        
        <InnerContainters>
           
         <WelcomeContainer >
            
                  
                   
                       
                            <StyledFormArea>
                                <View style={{justifyContent: 'center',flexDirection: 'row'}}>
                                <Avatar  resizeMode="cover" source={require('../assets/parvasi-logo.png')} />
                                </View>
                                     <PageTitle welcome={true}>Welcome! { (name)? name:'Ravi'}</PageTitle>
                                     <SubTitle welcome={true}>{(email)? email:'ravi@gmail.com'}</SubTitle>
                                
                                <StyledLine/>
                               
                                <StyledButton onPress={clearLogin}>
                                    <ButtonText>Logout</ButtonText>
                                </StyledButton>
                                
                              
                            </StyledFormArea>
                            
                      
                 
                </WelcomeContainer>

        </InnerContainters></>
   
  )
};





export default Welcome;
