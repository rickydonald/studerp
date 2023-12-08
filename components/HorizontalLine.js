import { View, Text } from 'react-native'
import React from 'react'
import { appleSystemGray, appleSystemGray3 } from '../src/Config'

export default function HorizontalLine({ style = "" }) {
  return (
    <View 
    style={[{
        borderBottomColor: appleSystemGray3,
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical: 10,
        marginBottom: 20
     }, ...style]}
    >
    </View>
  )
}