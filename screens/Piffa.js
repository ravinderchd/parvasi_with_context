import React, {useEffect, useState} from 'react'
// import GridImageView from 'react-native-grid-image-viewer';
import GridImageViewerCaption from 'react-native-grid-image-viewer-with-caption';

import { Text, View, StyleSheet, Image, FlatList, Dimensions, ImageBackground, Pressable, ActivityIndicator} from 'react-native';
import axios from 'axios';

const Piffa = () => {
const [awardImages, setAwardImages] = useState();
const [isLoading, setIsLoading] = useState(true);
const [images, setImages] = useState();
  useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
        const results = [];

          
      
          const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Gallery_Get_Gallery_Images";

     
          const requestOne = axios.post(adUrl, {Gallery_Id: 2}); //Dashboard Ad
          axios
              .all([ requestOne])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
              
                
                     if(responseOne)
                    {
                      const resultAd = responseOne.data;
                      let ValidJson = resultAd.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                      console.log("Result AD Data====", responseOne )
                      if(status==1)
                      {
                        let newData =  Object.values(data);
                        if(newData.length>0)
                                newData.forEach(image =>{
                                    let {gallery_image, title} = image;
                                    console.log("IMAGE====\n",image);
                                    results.push({image: gallery_image, text:title})
                                })

                                console.log("ARRAY of Images===", results);
                                setImages(results);
                            //setAwardImages(newData);
                            setIsLoading(false);
                      }
                      else
                      {
                        setImages({});
                          // setAwardImages({});
                            setIsLoading(false);
                      }
                    }
                
                })
              )
              .catch(errors => {
                // react on errors.
                console.error(errors);
                setIsLoading(false);setAwardImages({});console.log("Error Occurred While Fetching News", errors.response); if (axios.isCancel(errors)) return; 
              });
        

        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[]);
  return (
      
   
        // <GridImageView data={images} />
        isLoading? <ActivityIndicator size="large"  style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></ActivityIndicator> :  images.length>0 && <GridImageViewerCaption data={images} captionColor="#fff" />
   
  
  )
}

export default Piffa
