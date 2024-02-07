import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { appleSystemFillGray10, appleSystemGray6 } from '../src/Config'

export default function NotifyScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Notifications",
            headerTintColor: "#000",
        })
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white gap-3" edges={['bottom']}>
            <ScrollView className="p-3">
                <View style={{ backgroundColor: appleSystemGray6, borderRadius: 16 }} className="p-3">
                    <Text className="uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10, marginBottom: 8 }}>Attendance</Text>
                    <Text className="font-bold" style={{ fontSize: 18 }}>You have been marked absent on 5th Hour Today.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}