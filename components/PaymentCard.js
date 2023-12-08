import { View, Text, TouchableOpacity } from 'react-native'
import { appleSystemBlue } from '../src/Config'
import React from 'react'

export default function PaymentCard({ paymentInfo, paymentAmount, buttonText, buttonAction }) {
    return (
        <View>
            <Text style={{ fontSize: 18 }} className="font-medium mb-1">{paymentInfo}</Text>
            <Text style={{ fontSize: 22 }} className="font-bold my-2">{paymentAmount}</Text>
            <TouchableOpacity
                className="p-2 mt-2"
                style={{ backgroundColor: appleSystemBlue, borderRadius: 8 }}
                onPress={buttonAction}
            >
                <Text className="text-white font-semibold text-center" style={{ fontSize: 15 }}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}