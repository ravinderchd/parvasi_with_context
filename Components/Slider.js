
import React,{useState, useRef, useEffect} from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };
const width = Dimensions.get('window').width-20;
const Slider = (props) => {
    const state = { active:0 }
    // console.log("SLIDER PROPS==", props.navigation)
    //const [totalItems, setTotalItems] = useState();
    //totalItems = prosp.news.
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const totalItems = props.news.length;
    const [idx, setIdx] = useState(0)
    const scrollViewRef = useRef();
    const change = ({nativeEvent}) => {
        const slide = Math.ceil( nativeEvent.contenOffset.x/nativeEvent.layoutMeasureSpec.width );
        console.log("SLide ====", slide) 
    }
    const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  useEffect(() => {
   console.log("Index changed...");
   scrollViewRef.current?.scrollTo({x: width * idx, animated: true});
}, [idx])
   const  onRightArraowClick = () =>{
        idx>=4? setIdx(4): setIdx(idx+1)
        
        console.log("Right awrrow clicked  index====",idx)
        // scrollViewRef.current?.scrollTo({x: width * idx, animated: true});
    }
    const  onLeftArraowClick = () =>{
        console.log("LEFT awrrow clicked Before index====",idx)
        idx<=0? setIdx(0): setIdx(idx-1)
        const index = idx;
        console.log("LEFT awrrow clicked 123 index====",idx)
        // scrollViewRef.current?.scrollTo({x: width * idx, animated: true});
    }
const replceSpecial = (newsTitle) =>{
 
    let modifiedTitle = newsTitle.replace(/([&<>\"'])/g, match => htmlEntities[match]);
    return modifiedTitle.split(' ').slice(0, 18).join(' ')+' ....';
}
  return (
    <View style={{width:width, height: 200, marginLeft:10, marginRight:10,}}>
        <ScrollView  showsHorizontalScrollIndicator={false}
                horizontal style={{width:width,  borderColor:3, borderColor:'#ff0000' }} 
                 
                pagingEnabled
                decelerationRate="fast"
                 snapToAlignment={'center'}
                    ref={scrollViewRef}
                 onScroll={(event) => {
                                setSliderPage(event);
                            }}
        >
            {
                props.news ?
                props.news.map((news, index)=>{
                    const regex = /(<([^>]+)>)/ig;
                    const newsText = props.news[index].content
                  // const newsDescr = newsText.replace(regex, '');
                    const newsDescr = newsText
                     const img  = (props.news[index].image_url ? props.news[index].image_url : 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/58915/s960_newspapers-pile-960x640.jpg');
                        return <View key={index} style={styles.imageSliderContainer}>
                            <Pressable onPress ={() => props.navigation.navigate('EnglishNewsDetails', {newsid: props.news[index].id})}>
                                <Image source={{uri: img}} style={styles.imageStyle} />
                            </Pressable>
                            
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.title}>
                                    {
                                        
                                    //props.news[index].title.split(' ').slice(0, 18).join(' ')+' ....'
                                    replceSpecial(props.news[index].title)
                                    
                                    
                                    }
                                    </Text>
                            </View>
                                <Text style={{ textAlign:'center', width: width,alignContent: 'center'}}>{newsDescr}</Text>
                            </View>
                        ;
                }): null
            }
            
        </ScrollView>
        {/* <View style={styles.leftArrow}>
                <Icon raised name="arrow-left" size={30} color="#ddd" onPress={() => onLeftArraowClick()}  />
         </View>   
           <View style={styles.rightArrow}>
              
                    <Icon raised name="arrow-right" size={30} color="#fff"  onPress={onRightArraowClick} />
                
         </View>    */}
    </View>
  )
};

const styles = StyleSheet.create({
    imageSliderContainer: {
            flexDirection:'column',
            backgroundColor: '#fff',
            justifyContent:'flex-start',
            height:100
    },
    imageStyle: {
        width:width,height:150, resizeMode:'cover', borderRadius:14
    },
    leftArrow: {
        flex:1, flexDirection: 'column', position: 'absolute', top:'25%', margin:0,padding:0
    },
    rightArrow: {flex:1, flexDirection: 'column', position: 'absolute', top:'25%', left:'94%', margin:0,padding:0},
    title: {
        
        fontWeight:'bold',
        fontSize: 16,
        flex:1,
        flexDirection:'row',flexWrap: 'wrap',
        width: width,
        textAlign: 'center'
    }
});

export default Slider;
