import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AttendanceCard from '../components/AttendanceCard';

import { appleSystemBlue, appleSystemFillGray10, appleSystemGrayLight6, appleSystemGreen, appleSystemRed, appleSystemGrayLight5, appleSystemGray } from '../src/Config';
import { Calendar } from 'react-native-calendars';

export default function AttendanceScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1" edges={['top']}>
      <Header screenName={"Attendance"} />
      <ScrollView className="flex-1" style={{ backgroundColor: appleSystemGrayLight6 }}>
        <View className="bg-white px-5 pb-5 flex-1">
          <View className="mt-5 flex-row items-center justify-between">
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Absent</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>2.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Medical</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>1.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>On Duty</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>3.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Remaining</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>15.0</Text>
            </View>
          </View>
          <View className="mt-4">
            <TouchableOpacity
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
            >
              <Text className="text-center font-semibold">Attendance Management</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Attendance View */}
        <View>
          <Calendar
            style={{
              height: 350
            }}
            // Specify the current date
            current={'2012-03-01'}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Mark specific dates as marked
            markedDates={{
              '2023-12-01': { selected: true, selectedColor: appleSystemRed },
              '2023-12-02': { selected: true, selectedColor: appleSystemRed },
              '2023-12-03': { selected: true, selectedColor: appleSystemBlue }
            }}
          />
          <View className="bg-white px-5 pb-5 flex-row items-center justify-between">
            <View>
              <Text className="uppercase font-bold" style={{ fontSize: 14 }}>14 Dec 23</Text>
              <View style={{ borderBottomColor: appleSystemGray, borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: .5 }}></View>
              <Text className="uppercase font-bold" style={{ fontSize: 14 }}>A3</Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
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
          <View className="bg-white px-5 pb-5 flex-row items-center justify-between">
            <View>
              <Text className="uppercase font-bold" style={{ fontSize: 14 }}>15 Dec 23</Text>
              <View style={{ borderBottomColor: appleSystemGray, borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: .5 }}></View>
              <Text className="uppercase font-bold" style={{ fontSize: 14 }}>b3</Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>I</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>II</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>III</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>IV</Text>
              </View>
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}>
                <Text style={attendanceMicroBoxStyle.text}>V</Text>
              </View>
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
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    display: "none",
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})