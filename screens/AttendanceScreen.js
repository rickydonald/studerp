import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function AttendanceScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>AttendanceScreen</Text>
      <Button title='Profile' onPress={() => navigation.navigate('Profile')} />
    </SafeAreaView>
  )
}