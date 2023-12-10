import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import { LinearGradient } from 'expo-linear-gradient'
import { appleSystemBlue, appleSystemFillGray10, appleSystemGray2, appleSystemGrayLight5, appleSystemGrayLight6, appleSystemGreen, appleSystemGreenDark, appleSystemRed, appleSystemRedDark } from '../src/Config';
import HorizontalLine from '../components/HorizontalLine';
import PaymentCard from '../components/PaymentCard';


export default function DashboardScreen() {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerStyle: {
        backgroundColor: '#A52A2A',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Static header */}
      <Header />
      <ScrollView className="flex-1" style={{ backgroundColor: appleSystemGrayLight6 }}>
        {/* Dashboard Card */}
        <View
          className="bg-white py-5 px-5 flex-1"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-bold" style={{ fontSize: 25 }}>
                Ricky Donald
              </Text>
              <Text style={{ fontSize: 18 }} className="text-gray-600 mt-3 font-semibold">
                21PEN843
              </Text>
              <Text style={{ fontSize: 18 }} className="text-gray-600 mt-2 font-semibold">
                B.Sc. Computer Science
              </Text>
            </View>
            <Image
              source={{ uri: "https://sjctni.edu/images/SPhotos/21/21ucs632.jpg" }}
              width={90}
              height={100}
              className="rounded-xl"
            />
          </View>
          <View className="pt-5 flex-row items-center justify-stretch gap-2">
            <TouchableOpacity
              className="flex-1"
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-center font-semibold">View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1"
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-center font-semibold">Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Attendance */}
        <View className="bg-white mx-3 my-6 rounded-xl">
          <View className="p-3 flex-row items-center justify-between border-b border-b-slate-300">
            <Text className="font-bold" style={{ fontSize: 22 }}>Today's Attendance</Text>
            <TouchableOpacity
              className=""
            >
              <Text style={{ color: appleSystemBlue }} className="text-center font-bold">Show in Detail</Text>
            </TouchableOpacity>
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
            {/* <TouchableOpacity
              className="mt-4"
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-center font-semibold">Show Attendance</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Payments */}
        <View className="bg-white rounded-xl mx-3 mt-0 mb-6">
          <View className="p-3 flex-row items-center justify-between border-b border-b-slate-300">
            <Text className="font-bold" style={{ fontSize: 22 }}>Fees & Dues</Text>
            <TouchableOpacity
              className=""
            >
              <Text style={{ color: appleSystemBlue }} className="text-center font-bold">Show All</Text>
            </TouchableOpacity>
          </View>
          <View className="p-3">
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
        </View>

        {/* Academics */}
        <View className="bg-white rounded-xl mx-3 mt-0 mb-6">
          <View className="p-3 flex-row items-center justify-between border-b border-b-slate-300">
            <Text className="font-bold" style={{ fontSize: 22 }}>Academics</Text>
            <TouchableOpacity
              className=""
            >
              <Text style={{ color: appleSystemBlue }} className="text-center font-bold">Show All</Text>
            </TouchableOpacity>
          </View>
          <View className="p-3 flex-row items-center justify-around">
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