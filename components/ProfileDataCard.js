import { View, Text } from 'react-native'
import React from 'react'
import { appleSystemFillGray8 } from '../src/Config'

export default function ProfileDataCard({ title, data, titleStyle, dataStyle, style, titleClassname, dataClassname, className }) {
    return (
        <View style={style} className={className}>
            <Text
                className={"uppercase font-bold " + titleClassname}
                style={[{ color: appleSystemFillGray8, fontSize: 11, marginBottom: 5 }, titleStyle]}
            >
                {title}
            </Text>
            <Text style={[{ fontSize: 18 }, dataStyle]} className={"font-bold " + dataClassname}>
                {data}
            </Text>
        </View >
    )
}