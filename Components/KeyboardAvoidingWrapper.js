import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
  return (
      <KeyboardAvoidingView  styles={styles.container}>
       <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
       </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    behavior: "padding",
    keyboardVerticalOffset: 500,
    
  },
  
});
export default KeyboardAvoidingWrapper
