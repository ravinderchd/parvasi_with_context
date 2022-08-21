import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, SafeAreaView } from "react-native";


const { width, height } = Dimensions.get("window");

const Slide = ({ item }) => {
  console.log("ITEMs receied===", item)
  return (
   
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: item.Ad_image_url }} />
   
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    
    width: width - 20,
    height: 50,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default Slide;