import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { appleSystemGreen, appleSystemRed, appleSystemBlue, appleSystemGray, appleSystemOrange, appleSystemGray5, appleSystemGray3 } from '../src/Config'

export default function AttendanceCard({
    date = "Nil",
    dayOrder = "Nil",
    hour1,
    hour2,
    hour3,
    hour4,
    hour5,
    showHourMarkings = false,
    showHourStatus = false
}) {

    const hourColorLogics = (attendance) => {
        if (attendance === 2) {
            return appleSystemRed
        } else if (attendance === 1) {
            return appleSystemGreen
        } else if (attendance === 4) {
            return appleSystemBlue
        } else if (attendance === 3) {
            return appleSystemOrange
        } else {
            return appleSystemGray3
        }
    }
    const hourStatusLogic = (attendance) => {
        if (attendance === 2) {
            return "A"
        } else if (attendance === 1) {
            return "P"
        } else if (attendance === 4) {
            return "D"
        } else if (attendance === 3) {
            return "M"
        } else {
            return "-"
        }
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
            display: showHourMarkings || showHourStatus ? "flex" : "none",
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
        },
    })

    return (
        <View className="bg-white flex-row items-center justify-between">
            <View>
                <Text className="uppercase font-bold" style={{ fontSize: 14 }}>{date}</Text>
                <Text className="uppercase font-bold" style={{ fontSize: 14 }}>{dayOrder}</Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
                <View style={[{ backgroundColor: hourColorLogics(hour1) }, attendanceMicroBoxStyle.container]}>
                    <Text style={attendanceMicroBoxStyle.text}>
                        {showHourMarkings ? 1 : showHourStatus && hourStatusLogic(hour1)}
                    </Text>
                </View>
                <View style={[{ backgroundColor: hourColorLogics(hour2) }, attendanceMicroBoxStyle.container]}>
                    <Text style={attendanceMicroBoxStyle.text}>
                        {showHourMarkings ? 2 : showHourStatus && hourStatusLogic(hour2)}
                    </Text>
                </View>
                <View style={[{ backgroundColor: hourColorLogics(hour3) }, attendanceMicroBoxStyle.container]}>
                    <Text style={attendanceMicroBoxStyle.text}>
                        {showHourMarkings ? 3 : showHourStatus && hourStatusLogic(hour3)}
                    </Text>
                </View>
                <View style={[{ backgroundColor: hourColorLogics(hour4) }, attendanceMicroBoxStyle.container]}>
                    <Text style={attendanceMicroBoxStyle.text}>
                        {showHourMarkings ? 4 : showHourStatus && hourStatusLogic(hour4)}
                    </Text>
                </View>
                <View style={[{ backgroundColor: hourColorLogics(hour5) }, attendanceMicroBoxStyle.container]}>
                    <Text style={attendanceMicroBoxStyle.text}>
                        {showHourMarkings ? 5 : showHourStatus && hourStatusLogic(hour5)}
                    </Text>
                </View>
            </View>
        </View>
    )
}