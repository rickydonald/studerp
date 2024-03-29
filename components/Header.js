import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

export default function Header({ screenName, showBackButton = false }) {

    const navigation = useNavigation();

    return (
        <View className="flex-row items-center px-3 pb-3 justify-between bg-white">
            <TouchableOpacity
                onPress={() => {
                    showBackButton ? navigation.goBack() : navigation.navigate('Profile')
                }}
            >
                {
                    showBackButton ? (
                        <Icons.ChevronLeftIcon
                            color={"#000"}
                            strokeWidth={2}
                            size={25}
                        />
                    ) : (
                        <Image
                            source={{ uri: "https://sjctni.edu/images/SPhotos/21/21ucs632.jpg" }}
                            width={45}
                            height={45}
                            className="rounded-full mr-2"
                        />
                    )
                }
            </TouchableOpacity>
            <Text className="font-bold" style={{ fontSize: 20 }}>{screenName}</Text>
            <TouchableOpacity
                className="bg-gray-200 rounded-full"
                style={{ padding: 10 }}
                onPress={() => navigation.navigate("Notify")}
            >
                <Icons.BellIcon
                    color={"#000"}
                    strokeWidth={1.6}
                    size={27}
                />
            </TouchableOpacity>
        </View>
    )
}