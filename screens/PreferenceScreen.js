import { View, Text, ScrollView, Switch, Platform } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import ListMenu from '../components/ListMenu'
import { appleSystemGray6, appleSystemRed } from '../src/Config'
import { ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline'
import { AuthContext } from '../src/AuthContext'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


export default function PreferenceScreen() {

  const { signOut, userGlobalData } = useContext(AuthContext)

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

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '12549414-fedd-4fb1-b180-2241552cd6ed' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView className="px-4" style={{ backgroundColor: appleSystemGray6, paddingTop: 10 }}>
        {/* General Settings */}
        <Text style={{ fontSize: 20, paddingLeft: 16 }} className="font-bold mb-2">General</Text>
        <ListMenu firstMenu={true} menuTitle='Register Number' vauleTitle={userGlobalData.register_number.toUpperCase()} menuIcon={null} />
        <ListMenu lastMenu={true} menuTitle='Change Password' />
        <ListMenu
          singleMenu={true}
          menuTitle='Developer'
          menuSpacing={{ marginTop: 10 }}
          onPressEvent={() => navigation.navigate("Developer")}
        />
        {/* Notification Settings */}
        <Text style={{ fontSize: 20, paddingLeft: 16 }} className="font-bold mt-6 mb-2">Notifications</Text>
        <ListMenu 
          singleMenu={true}
          menuTitle='Send Push Notifications'
          menuSpacing={{ marginBottom: 10 }}
          onPressEvent={() => registerForPushNotificationsAsync()}
        />
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
        <ListMenu firstMenu={true} menuTitle='Show Attendance Markings' menuIcon={
          <Switch
            className="mr-4"
            value={showAttendanceMarkings}
            onValueChange={(switchValue) => setShowAttendanceMarkings(switchValue)}
          />
        } />
        <ListMenu
          lastMenu={true}
          menuTitle='Logout'
          menuIcon={<ArrowLeftOnRectangleIcon size={26} color={appleSystemRed} />}
          titleStyle={{ color: appleSystemRed }}
          onPressEvent={() => signOut()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}