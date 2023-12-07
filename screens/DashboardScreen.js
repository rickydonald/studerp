import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import { LinearGradient } from 'expo-linear-gradient'
import { appleSystemGrayLight5, appleSystemGrayLight6, appleSystemGreen, appleSystemRed } from '../src/Config';


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
    <SafeAreaView className="flex-1 bg-white">
      {/* Static header */}
      <Header />
      <ScrollView className="" style={{ backgroundColor: appleSystemGrayLight6 }}>
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
        <View className="bg-white p-3 m-3 rounded-xl">
          <Text className="mb-4 font-semibold" style={{ fontSize: 20 }}>Today's Attendance</Text>
          <View className="flex-row items-center justify-between">
            <View style={[{ backgroundColor: appleSystemGreen } ,attendanceMicroBoxStyle.container]}>
              <Text style={attendanceMicroBoxStyle.text}>1</Text>
            </View>
            <View style={[{ backgroundColor: appleSystemGreen } ,attendanceMicroBoxStyle.container]}>
              <Text style={attendanceMicroBoxStyle.text}>2</Text>
            </View>
            <View style={[{ backgroundColor: appleSystemRed } ,attendanceMicroBoxStyle.container]}>
              <Text style={attendanceMicroBoxStyle.text}>3</Text>
            </View>
            <View style={[{ backgroundColor: appleSystemRed } ,attendanceMicroBoxStyle.container]}>
              <Text style={attendanceMicroBoxStyle.text}>4</Text>
            </View>
            <View style={[{ backgroundColor: appleSystemGreen } ,attendanceMicroBoxStyle.container]}>
              <Text style={attendanceMicroBoxStyle.text}>5</Text>
            </View>
          </View>
          <TouchableOpacity
              className="flex-1 mt-5"
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-center font-semibold">Show Attendance</Text>
            </TouchableOpacity>
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