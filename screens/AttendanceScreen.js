import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AttendanceCard from '../components/AttendanceCard';

import { appleSystemBlue, appleSystemFillGray10, appleSystemGrayLight6, appleSystemGreen, appleSystemRed } from '../src/Config';
import { Calendar } from 'react-native-calendars';

export default function AttendanceScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1" edges={['top']}>
      <Header screenName={"Attendance"} />
      <ScrollView className="flex-1" style={{ backgroundColor: appleSystemGrayLight6 }}>
        <View className="bg-white pb-5 flex-1">
          <View className="mt-6 flex-row items-center justify-around">
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
          <View className="bg-white p-5 m-3" style={{ borderRadius: 16 }}>
            <Text className="uppercase font-bold mb-4" style={{ fontSize: 16 }}>14 DEC 2023 | A3</Text>
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