import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function DeveloperScreen() {

  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("OTP")}>
        <Text>Go to One Time Passcode Screen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Change Password")}>
        <Text>Go to Change password screen</Text>
      </Pressable>
    </View>
  )
}