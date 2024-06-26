import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import { appleSystemBlue, appleSystemFillGray10, appleSystemGrayLight5, appleSystemGrayLight6, appleSystemGreen, appleSystemRed } from '../src/Config';
import HorizontalLine from '../components/HorizontalLine';
import PaymentCard from '../components/PaymentCard';
import RegularCard from '../components/RegularCard';
import { AuthContext } from '../src/AuthContext';
import axios from 'axios';


export default function DashboardScreen(props) {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, []);

  const [currentHour, setCurrentHour] = useState(0);

  // Temporary Get Current Hour
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://mail.sjctni.edu:8085/atte/getcurrenthour.php`,
    })
    .then(response => response.data)
    .then(res => {
      if (res === undefined) {
        setCurrentHour(0)
      } else {
        setCurrentHour(res)
      }
    })
  }, [])

  const { signOut, userGlobalData } = useContext(AuthContext)

  const dashboardScollRef = useRef(null)
  useScrollToTop(dashboardScollRef)

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      {/* Static header */}
      {/* <Header screenName={"Dashboard"} /> */}
      <ScrollView ref={dashboardScollRef} className="flex-1" style={{ backgroundColor: appleSystemGrayLight6 }}>
        {/* Dashboard Card */}
        <View
          className="bg-white py-5 px-5 flex-1"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-bold" style={{ fontSize: 25 }}>
                { userGlobalData.fullname }
              </Text>
              <Text style={{ fontSize: 18 }} className="text-gray-600 mt-3 font-semibold">
                { userGlobalData.register_number.toUpperCase() }
              </Text>
              <Text style={{ fontSize: 18 }} className="text-gray-600 mt-2 font-semibold">
                { userGlobalData.course_name }
              </Text>
            </View>
            <Image
              source={{ uri: `https://sjctni.edu/images/SPhotos/21/${userGlobalData.register_number}.jpg` }}
              width={90}
              height={100}
              className="rounded-xl"
            />
          </View>
          <View className="pt-5 flex-row items-center justify-stretch gap-2">
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              className="flex-1"
              style={{ backgroundColor: appleSystemBlue, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-white text-center font-semibold">View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1"
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
              onPress={() => props.navigation.navigate('Preferences')}
            >
              <Text className="text-center font-semibold">Preferences</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6 flex-row items-center justify-around">
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Day Order</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>E2</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Current Hour</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>{currentHour}</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Current Shift</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>Shift {userGlobalData.shift}</Text>
            </View>
          </View>
        </View>

        {/* Today's Attendance */}
        <View className="bg-white mx-3 my-6 rounded-xl">
          <View className="p-3 flex-row items-center justify-between border-b border-b-slate-300">
            <Text className="font-bold" style={{ fontSize: 22 }}>Today's Attendance</Text>
          </View>
          <View className="p-3">
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>I</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>II</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemRed }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>III</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemRed }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>IV</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>V</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payments */}
        <RegularCard
          title={"Pending Fees & Dues"}
          className={"mb-6"}
          content={
            <View>
              <PaymentCard
                paymentInfo="College Fees S2 VI Sem APR 2024"
                paymentAmount="₹ 15,240"
                buttonText="Pay Now"
                buttonAction={() => { }}
              />
              <HorizontalLine />
              <PaymentCard
                paymentInfo="EXAM FEE S2 V SEM NOV 2023"
                paymentAmount="₹ 1,050"
                buttonText="Pay Now"
                buttonAction={() => { }}
              />
            </View>
          }
        />

        {/* Academics */}
        <RegularCard
          title={"Current Academics"}
          className={"mb-6"}
          content={
            <View>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Current CGPA</Text>
                  <Text className="text-center font-bold" style={{ fontSize: 25 }}>8.9</Text>
                </View>
                <View>
                  <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Current SGPA</Text>
                  <Text className="text-center font-bold" style={{ fontSize: 25 }}>8.6</Text>
                </View>
                <View>
                  <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>BACKLOGS</Text>
                  <Text className="text-center font-bold" style={{ fontSize: 25 }}>0</Text>
                </View>
              </View>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const attendanceMicroBoxStyle = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})