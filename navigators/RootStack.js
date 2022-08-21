import React, {useContext} from 'react';
import {Text, Image, Alert, TouchableOpacity, View, Pressable} from 'react-native'
import { NavigationContainer,DrawerActions  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationActions } from '@react-navigation/native';
import  DrawerStack  from './../Components/DrawerStack';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons , Octicons, Ionicons } from '@expo/vector-icons'; 
// ALL SCREENS
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import ConfirmOTP from '../screens/ConfirmOTP';
import ResendOTP from '../screens/ResendOTP';
import ForgetPassword from '../screens/ForgetPassword';
import ForgetPasswordOTP from '../screens/ForgetPasswordOTP';

import Services from '../screens/Services';
import LiveTV from '../screens/LiveTV';
import LiveTVTabs from '../screens/LiveTVTabs';
import {LoginCredentialsContext, IsLoginVerified} from '../Components/LoginCredentialsContext';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/ProfileWithModal';

const Stack = createNativeStackNavigator();

const RootStack = ({props}) => {


    return (
         
        <LoginCredentialsContext.Consumer>
          
            {({storedCredentials }) => {
                const {otpVerified} = storedCredentials
                console.log("STORED CREDENTIALS==", storedCredentials)
                 return(
                    <NavigationContainer>
                          <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
                            {
                                  storedCredentials ? (<Stack.Screen navigation={props} name="DrawerStack" component={DrawerStack}  options={{headerShown: false}}  ></Stack.Screen>)
                              :
                              (<><Stack.Screen name="Login" component={Login} options={{ title: 'Login Into your account'}}></Stack.Screen>
                              <Stack.Screen name="LiveTV" component={LiveTV}></Stack.Screen> 
                             
                                <Stack.Screen name="LiveTVTabs" component={LiveTVTabs}   
                                    options={{ 
                                   drawerItemStyle: { display: 'none' },
                                    drawerLabel: () => null,
                                    title: null,
                                    drawerIcon: () => null,
           
                                    headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}><Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    /></View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                                    source={require("../assets/Group-222.png")}
                                                />
                                                ),
                                     headerLeft: () => (
                                               <TouchableOpacity><Image
                                                    source={require("../assets/Group-221.png")}
                                                /></TouchableOpacity>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                               
                                                
                                }}></Stack.Screen> 
                                <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} options={{ title: 'Enter OTP to Verify'}}></Stack.Screen>
                                
                                                        <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen> 
                                                        <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
                                                        <Stack.Screen name="Services" component={Services}></Stack.Screen>
                                                        <Stack.Screen name="ResendOTP" component={ResendOTP}></Stack.Screen>
                                                        <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP} options={{ title: 'Change Password'}}></Stack.Screen>
                                                        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: 'Forget Password'}}></Stack.Screen>
                                                       
                                                     
                              </>)
                                        }
                              
                                                   
                                                    
                             </Stack.Navigator>                           
                                              
                    </NavigationContainer>)
                   
                                 }
            }
        </LoginCredentialsContext.Consumer>
        
    ) ;
}

export default RootStack;