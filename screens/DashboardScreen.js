import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import { LinearGradient } from 'expo-linear-gradient'
import { appleSystemGrayLight5, appleSystemGrayLight6 } from '../src/Config';


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
      </ScrollView>
    </SafeAreaView>
  )
}