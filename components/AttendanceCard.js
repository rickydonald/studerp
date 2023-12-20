import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { appleSystemGreen, appleSystemRed, appleSystemBlue } from '../src/Config'

export default function AttendanceCard({
    date = "Nil",
    dayOrder = "Nil",
    hour1,
    hour2,
    hour3,
    hour4,
    hour5
}) {
    return (
        <View className="bg-white px-5 flex-row items-center justify-between">
            <View>
                <Text className="uppercase font-bold" style={{ fontSize: 14 }}>{ date }</Text>
                <Text className="uppercase font-bold" style={{ fontSize: 14 }}>{ dayOrder }</Text>
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