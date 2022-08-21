import React from 'react'
import { WebView } from 'react-native-webview';
const ExternalNewsPaper = ({route}) => {
    console.log(route.params.newspaperlink);
  return (
    <WebView
        style={{ marginTop: 0, width: '100%', height:'100%' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: route.params.newspaperlink}}
      />
  )
}

export default ExternalNewsPaper
