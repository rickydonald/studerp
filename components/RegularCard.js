import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { appleSystemBlue } from '../src/Config'

export default function RegularCard({ title, headerButtonText, headerButtonOnPress, buttonColor = appleSystemBlue, content, style, buttonTextStyle, className }) {
    return (
        <View className={className}>
            <View className="bg-white rounded-xl mx-3" style={style}>
                <View className="p-3 flex-row items-center justify-between border-b border-b-slate-300">
                    <Text className="font-bold" style={{ fontSize: 22 }}>
                        {title ? title : <Text>Card Title</Text>}
                    </Text>
                    <TouchableOpacity
                        className=""
                        onPress={headerButtonOnPress}
                    >
                        <Text style={[{ color: buttonColor }, buttonTextStyle]} className="text-center font-bold">
                            {headerButtonText}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="p-3">
                    {content ? content : <Text>Card Content</Text>}
                </View>
            </View>
        </View>
    )
}