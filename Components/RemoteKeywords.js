import  React, { memo, useCallback, useState } from 'react'
import { Alert, Text } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RemoteKeywords = memo((props) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  console.log(props)
  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
   
    const response = await fetch('http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Search_Keywords').then((data) => new Promise(res => {
      setTimeout(() => res(data), 2000)
    }))
    const items = await response.json()

    const suggestions = items.data
 
      .filter(item => item.GTA_category.toLowerCase().includes(filterToken))
      .map((item, index) => ({
        id: index,
        title: item.GTA_category,
      }))

    setRemoteDataSet(suggestions)
    setLoading(false)
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: 'Start typing est...',
        }}
         onSelectItem={item => {
            item && setSelectedItem(item.title);
            item && console.log("Selected Item==",item.title);
            item && props.onkeywordClick(item.title);
          }}
        
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#8f3c96',
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15, backgroundColor:'#dddddd' }}>No Suggestions</Text>}
      />
     {/* <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text> */}
    </>
  )
})
