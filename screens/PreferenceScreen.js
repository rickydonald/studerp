import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'

export default function PreferenceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header screenName={"Preferences"} showBackButton={true} />
      <ScrollView className="flex-1">

      </ScrollView>
    </SafeAreaView>
  )
}