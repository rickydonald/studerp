import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import { LinearGradient } from 'expo-linear-gradient'


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
    <SafeAreaView className="px-3 bg-white flex-1">
      {/* Static header */}
      <Header />
      <ScrollView>
        <Text className="font-bold mt-6" style={{ fontSize: 28 }}>
          <Text className="font-semibold" style={{ fontSize: 25 }}>
            Hello, {'\n'}
          </Text>
          <Text>
            Harini Ramaprasad
          </Text>
        </Text>
        <LinearGradient
          colors={['#0a9dff', '#54bbff']}
          className="mt-6 rounded-3xl"
        >
          <View className="py-4">
            <Text
              className="text-center font-medium text-white"
              style={{ fontSize: 12, marginBottom: 5 }}
            >
              ON GOING
            </Text>
            <Text
              className="text-center font-bold text-white"
              style={{ fontSize: 20 }}
            >
              M.A. English Literature
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Pressable
            className="py-4"
          >
            <Text className="text-center text-white font-bold">View Profile</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}