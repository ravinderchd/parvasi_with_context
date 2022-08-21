import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Image, FlatList, Dimensions, ImageBackground, Pressable, ActivityIndicator} from 'react-native';
import axios from 'axios';

const fullwidth = Math.ceil(Dimensions.get("window").width);
const width = fullwidth/2-5;
const height = width-90;
const EnglishNewPaper = (props) => {
        const [breakingNews, setBreakingNews] =useState({});
        const [isLoadingEnglish, setIsLoadingEnglish] = useState(true);
        const [otherBreakingNew , setOtherBreakingNew] = useState();
         const def_uri = 'https://germanculture.com.ua/wp-content/uploads/2015/12/german_online_newspapers.jpg';
 useEffect(() => {
                       
        const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_English_Breaking_News";
        //News_Count
        console.log("User effect breaking news");
                axios.post(newUrl, {News_Count: 50}).then(
                (response) =>{

                    const result = response.data;
                    let ValidJson = result.replace('{"d":null}',"");
                    ValidJson = JSON.parse(ValidJson);
                    const { message, status, data} = ValidJson
                    console.log("In BREAKING NEWS==", result.status)
                    if(status==1)
                    {
                        console.log("NEWS FETCHED successfully!!!!!!!!!!\n\n\n\n")
                        setBreakingNews(data);
                        // const otherNews = breakingNews.filter((item, index) => index >=3);
                        setOtherBreakingNew(data)
                        // console.log("Other Breaking NEWS\n\n\n", otherNews)
                        setIsLoadingEnglish(false);
                    }
                   
                }
            ).catch((error) => { setIsLoadingEnglish(false);console.log("Error Occurred While Fetching Breaking News", error) })

    },[]);
    
  return (
      <View style={{flex:1,flexDirection: 'column'}}>
        <View style={{alignContent:'center', alignItems: 'center'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.heading1}>Newspaper</Text><Text style={styles.heading2}> | English</Text>
          </View>
        </View>
        { isLoadingEnglish ? <ActivityIndicator size="large"  style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></ActivityIndicator> : 
        
        (
          <>
        <View style={styles.container}>
            <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: breakingNews[0].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri: breakingNews[0].image_url ? breakingNews[0].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                      <Text style={styles.breakingnewshead}>{breakingNews[0].title}</Text>
                    </ImageBackground>
                </View>
            </Pressable>
             <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: breakingNews[1].id})}>
                <View style={styles.box2}>
                <ImageBackground source={{uri: breakingNews[1].image_url ? breakingNews[1].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                   <Text style={styles.breakingnewshead}>{breakingNews[1].title}</Text>
                </ImageBackground>
                </View>
              </Pressable>
        </View>
        <View style={styles.container}>
           <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: breakingNews[2].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri: breakingNews[2].image_url ? breakingNews[2].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                       <Text style={styles.breakingnewshead}>{breakingNews[2].title}</Text>
                    </ImageBackground>
                </View>
             </Pressable>
             <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: breakingNews[3].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri: breakingNews[3].image_url ? breakingNews[3].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                       <Text style={styles.breakingnewshead}>{breakingNews[3].title}</Text>
                    </ImageBackground>
                </View>
             </Pressable>
        </View>
        
          <FlatList contentContainerStyle={{ paddingBottom: 80 }} 
                    data = {otherBreakingNew}
                     viewabilityConfig={{
                                      itemVisiblePercentThreshold: 50
                                    }}
                    renderItem={({item, index}) =>  
                            index >3 ?
                            <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: otherBreakingNew[index].id})}>
                            <View style ={{flex:1, flexDirection:'row', height:132, marginLeft:5,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}} key={Math.random().toString()} >
                                    <ImageBackground source={{uri:item.image_url ? item.image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>
                                        {item.title}
                                        </Text>
                               
                                    </View>
                                    </ImageBackground>
                                    
                            </View></Pressable>
                            : null
                           
                    }
                    
                    // ItemSeparatorComponent = {itemSeperator}
                />
              
        
        </>
        
        )
        }
        
        <View style={ styles.bottomView} >
                    <Image source={require('./../assets/dashboard-ad.png')} style={styles.banner}></Image>
                  
 
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
      bottomView:{
 
      width: fullwidth, 
      height: 50, 
      backgroundColor: '#ffffff', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      flex:1
    },
  container: {
    paddingTop: 10,
     
    flexDirection: 'row',  
    // Try different values for justifyContent ('flex-start', 'flex-end', 'center',         'space-between', 'space-around', 'space-evenly') 
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
   

  },
  box1: {
    width: width,
    height: height,
     backgroundColor: 'steelblue',
    borderRadius:10,
    
  },
  box2: {
    width: width,
    height: height,
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box3: {
    width: width,
    height: height, 
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box4: {
    width: width,
    height: height, 
   
     borderRadius:10,
  },
    box5: {
    width: width,
    height: height, 
   
     borderRadius:10,
  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
   image: {
    flex: 1,
    justifyContent: "flex-start",
    padding:7,
    
  },
  breakingnewshead : {
    fontSize:14,
    fontWeight: "bold",
    color: 'white',
  },
  heading1: {
    fontSize:22,
    fontWeight:'700'
  },
  heading2: {
  fontSize:22,
    fontWeight:'700',
    color: 'red',
  },
  item: {
    color: 'white',
  },
});


export default EnglishNewPaper
