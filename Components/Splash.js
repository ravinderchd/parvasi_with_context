import React, {useEffect, useState} from 'react'
import {Text, SafeAreaView, StyleSheet, View, Image, Pressable } from 'react-native';
import App from '../App';
import axios from 'axios';
const Splash = (props) => {
    var timer1 ;
    const [isAdloaded, setIsAdLoaded] = useState(false);
    const [adData, setAdData] = useState('');
useEffect(() => {
        console.log("In splash......")
        timer1 = setTimeout(() => {
            //setIsAdLoaded(true)
            props.navigation.navigate()
        }, 20000);

         let unmounted = false;
    let source = axios.CancelToken.source();  

 
       const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          
          const requestOne = axios.post(adUrl, {Ad_Position_Id: 3, timeout: 60 , cancelToken: source.token});
          axios.all([requestOne]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
              
                if (!unmounted) {
                     
                   console.log("AAAAA ==== >>>>>>>> ", responseOne);

                   if(responseOne)
                    {
                      const resultAd = responseOne.data;
                      let ValidJson = resultAd.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                     console.log("Result AD Data====", data)
                      if(status==1)
                      {
                        let newData =  Object.values(data);
                         //console.log("AD Data\n\n\n",newData);
                          setAdData(newData);
                         console.log("AD DATA LEngth========\n\n\n",newData.Ad_image_url);
                          
                          // setNews(data);
                          // setIsLoading(false);
                      }
                      else
                      {
                           setAdData({});
                          // setIsLoading(false);
                      }
                    }
                }
               
              })).catch(error => {
                console.log(error);
                //setIsLoading(false);setNews({});
                if (axios.isCancel(error)) return;
              })


        return () => {
        clearTimeout(timer1);
      };
    },[])
const gotoMainScreeen = () =>{
    clearTimeout(timer1);
    setIsAdLoaded(true);
}
    
    // if(!isAdloaded ){
            return (
                
                <SafeAreaView  style={styles.container}>
                    <View style={{flex:1, flexDirection: 'column',justifyContent: 'center'}}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../assets/splash_ad.jpg')} style={{resizeMode: "contain",}}></Image>
                        </View> 
                        <Pressable onPress={gotoMainScreeen}><View  style={{backgroundColor:'#f00', height:50, margin:10, padding:5, flexDirection:'column',borderRadius:10, alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={styles.text}>Skip To Main Screen</Text></View></Pressable>
                    </View>
                </SafeAreaView >
            )
            //}
            // else
            //   return (<App/>)

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  }
});
export default Splash
