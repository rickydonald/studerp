import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { appleSystemGray } from '../src/Config'

export default function AcademicList({
    title,
    onPress
}) {
    return (
        <TouchableOpacity
            className="items-center flex-row justify-between"
            onPress={onPress}
        >
            <Text style={{ fontSize: 17, width: '85%' }}>{title}</Text>
            <ChevronRightIcon size={28} color={appleSystemGray} />
        </TouchableOpacity>
    )
}