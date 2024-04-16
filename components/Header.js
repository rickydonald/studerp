import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

export default function Header({ screenName, showBackButton = false }) {

    const navigation = useNavigation();

    return (
        <View className="flex-row items-center px-5 py-3 justify-between bg-white">
            <Text className="font-bold" style={{ fontSize: 22 }}>{screenName}</Text>
            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notify")}
                    style={{ marginRight: 10 }}
                >
                    <Icons.BellIcon
                        color={"#000"}
                        strokeWidth={1.6}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Icons.UserCircleIcon
                        color={"#000"}
                        strokeWidth={1.6}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}