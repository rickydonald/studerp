import { View, Text } from 'react-native'
import React from 'react'
import { appleSystemGray, appleSystemGray3 } from '../src/Config'

export default function HorizontalLine({ style, paddingBottom = 20, paddingVertical = 10, paddingLeft, paddingRight }) {
  return (
    <View 
    style={[{
        borderBottomColor: appleSystemGray3,
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical: paddingVertical,
        marginBottom: paddingBottom,
        marginLeft: paddingLeft,
        marginRight: paddingRight,
     }, style]}
    >
    </View>
  )
}