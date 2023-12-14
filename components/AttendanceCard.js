import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { appleSystemGreen, appleSystemRed, appleSystemBlue } from '../src/Config'

export default function AttendanceCard() {
    return (
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