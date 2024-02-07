import { View, Text, ScrollView, Switch } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import ListMenu from '../components/ListMenu'
import { appleSystemGray6 } from '../src/Config'

export default function PreferenceScreen() {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: "#000",
    })
  }, [])

  const [sendAttendanceNotification, setSendAttendanceNotification] = useState(false)
  const [sendCiaAlerts, setSendCiaAlerts] = useState(false)
  const [sendFeesAlerts, setSendFeesAlerts] = useState(false)
  const [showAttendanceMarkings, setShowAttendanceMarkings] = useState(false)

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView className="flex-1 px-4 py-5" style={{ backgroundColor: appleSystemGray6 }}>
        {/* General Settings */}
        <Text style={{ fontSize: 20, paddingLeft: 16 }} className="font-bold mb-2">General</Text>
        <ListMenu firstMenu={true} menuTitle='Register Number' vauleTitle='21UCS632' menuIcon={null} />
        <ListMenu lastMenu={true} menuTitle='Change Password' />
        {/* Notification Settings */}
        <Text style={{ fontSize: 20, paddingLeft: 16 }} className="font-bold mt-6 mb-2">Notifications</Text>
        <ListMenu firstMenu={true} menuTitle='Current Attendance Alert' menuIcon={
          <Switch
            className="mr-4"
            value={sendAttendanceNotification}
            onValueChange={(switchValue) => setSendAttendanceNotification(switchValue)}
          />
        } />
        <ListMenu middleMenu={true} met6nuTitle='Send CIA Alerts' menuIcon={
          <Switch
            className="mr-4"
            value={sendCiaAlerts}
            onValueChange={(switchValue) => setSendCiaAlerts(switchValue)}
          />
        } />
        <ListMenu lastMenu={true} menuTitle='Send Fee and Dues Alerts' menuIcon={
          <Switch
            className="mr-4"
            value={sendFeesAlerts}
            onValueChange={(switchValue) => setSendFeesAlerts(switchValue)}
          />
        } />
        <Text style={{ fontSize: 20, paddingLeft: 16 }} className="font-bold mt-6 mb-2">Preferences</Text>
        <ListMenu singleMenu={true} menuTitle='Show Attendance Markings' menuIcon={
          <Switch
            className="mr-4"
            value={showAttendanceMarkings}
            onValueChange={(switchValue) => setShowAttendanceMarkings(switchValue)}
          />
        } />
      </ScrollView>
    </SafeAreaView>
  )
}