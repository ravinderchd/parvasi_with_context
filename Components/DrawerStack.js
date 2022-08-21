import React, {useContext, useState, useEffect} from 'react';
import {Alert, TouchableOpacity, Image, View, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { LoginCredentialsContext } from '../Components/LoginCredentialsContext';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
useDrawerStatus 

} from '@react-navigation/drawer';
import { CommonActions, NavigationActions } from '@react-navigation/native';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import LiveTVTabs from '../screens/LiveTVTabs';
import LiveTVTabsAnhad from '../screens/LiveTVTabsAnhad';
import Services from '../screens/Services';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import user from './../assets/user.png';
import ParvasiNewsPaper from './../screens/ParvasiNewsPaper';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import ProfileWithModal from '../screens/ProfileWithModal';

const Drawer = createDrawerNavigator();


const DrawerStack = (props) => {


console.log(props.navigation)
const rootNav = props.rootNav
  const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);

//const toggleDrawer = () => props.navigation.dispatch(DrawerActions.toggleDrawer());
const toggleDrawer = () => {
   
  console.log(props);
  props.navigation.dispatch(DrawerActions.toggleDrawer()); 

}
useEffect(() => {

      console.log("DRAETTT Running." );
    
  
  },[props]);
//     const resetAction = CommonActions.reset({
//     index: 0,
//     routes: [{ name: 'Dashboard'}]
// });
// const navigateToScreen = route => () => {
//   console.log("Navigakaakakkak", route)
//     props.navigation.dispatch(route)
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
//   };

  const {firstname, lastname, isLogged, isGuest} = storedCredentials;
 
 console.log("First name==", isLogged)


  return (
    <Drawer.Navigator 
      initialRouteName='Dashboard'
         screenOptions={{
          activeTintColor: '#ff0000',
          itemStyle: { marginVertical: 1 },
          
        }}
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              
                <View style={{flex:1, margin:10, flexDirection: 'row'}}>
                <Image source={user}></Image><Text style={{paddingTop:10, paddingLeft:10}}>Welcome { isLogged ? firstname +", "+ lastname : 'Guest'}</Text>
                </View>
              <DrawerItemList {...props}  />
             
              
              <DrawerItem 
                key={1}
                icon={({color, size}) => (<MaterialCommunityIcons name="apps" size={24} />)} 
                label="Dashboard" onPress={() =>{ props.navigation.dispatch( DrawerActions.jumpTo('Dashboard', { name: 'Satya' }));  } } 
              
              
              />
              {
                isGuest &&
              <><DrawerItem 
               key={2}
                icon={({color, size}) => (<MaterialCommunityIcons name="lock-open" size={24} />)} 
                label="Login" onPress={() => 
                     {AsyncStorage.clear();
                   setStoredCredentials(null);    
                    props.navigation.navigate('Login')
                     }}

              
              
              />
              </>}
              {
                isLogged &&
              
              <><DrawerItem 
               key={3}
                icon={({color, size}) => (<MaterialCommunityIcons name="file-edit" size={24} />)} 
                label="Profile" onPress={() =>{
                           props.navigation.navigate('Profile');
              } }/>
              <DrawerItem 
               key={4}
                icon={({color, size}) => (<MaterialCommunityIcons name="lock" size={24} />)} 
                label="Logout" onPress={() =>{
                Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    setStoredCredentials(null);
                    }},
                ],
                { cancelable: false }
              )                  
              } }/>
               
              </>
              }
             
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="Profile" component={ProfileWithModal}
            options={{
                                       
                                       unmountOnBlur:true,
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,
                                         headerShown: true,
                                                headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}>
                                     </View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {props.navigation.navigate('Dashboard')}} style={{paddingLeft:10,}}><MaterialCommunityIcons name="home" size={44} /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}
          >


          </Drawer.Screen>
          <Drawer.Screen name="ChangePassword" component={ChangePassword}
            options={{
                                       
                                       unmountOnBlur:true,
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,
                                         headerShown: true,
                                                headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}>
                                     </View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {props.navigation.navigate('Dashboard')}} style={{paddingLeft:10,}}><MaterialCommunityIcons name="home" size={44} /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}
          >


          </Drawer.Screen>
          <Drawer.Screen name="Login" component={Login} 
               key={1}
              options={{
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,}}>

          </Drawer.Screen>
          <Drawer.Screen name="Dashboard" component={Dashboard}
                                   
                                     options={{
                                       
                                       unmountOnBlur:true,
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,
                                         headerShown: true,
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
                                               <Pressable onPress={()=> {toggleDrawer()}}><Image
                                                    source={require("../assets/Group-222.png")}
                                                /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}
                                 
                              ></Drawer.Screen>
         
          <Drawer.Screen name="Services" component={Services}
            options={{
                                       
                                       unmountOnBlur:true,
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,
                                         headerShown: true,
                                                headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}>
                                     </View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {props.navigation.navigate('Dashboard')}} style={{paddingLeft:10,}}><MaterialCommunityIcons name="home" size={44} /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}
          >


          </Drawer.Screen>
          <Drawer.Screen name="ParvasiNewsPaper" component={ParvasiNewsPaper}
            options={{
                                       
                                       unmountOnBlur:true,
                                       drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => null,
                                        title: null,
                                        drawerIcon: () => null,
                                         headerShown: true,
                                                headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}>
                                     </View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {props.navigation.navigate('Dashboard')}} style={{paddingLeft:10,}}><MaterialCommunityIcons name="home" size={44} /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}
          >


          </Drawer.Screen>
          
          <Drawer.Screen name="LiveTVTabs" component={LiveTVTabs}   
           key={2}
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
                                               <Pressable onPress={()=>toggleDrawer()}><Image
                                                    source={require("../assets/Group-222.png")}
                                                /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                               
                                                
                                }}></Drawer.Screen> 
                      <Drawer.Screen name="LiveTVTabsAnhad" component={LiveTVTabsAnhad}   
                              key={6}
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
                                               <Pressable onPress={()=>toggleDrawer()}><Image
                                                    source={require("../assets/Group-222.png")}
                                                /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                               
                                                
                                }}></Drawer.Screen> 
    </Drawer.Navigator>
      
    
  )
};

export default DrawerStack;
