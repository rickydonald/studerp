import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { appleSystemBlue, appleSystemFillGray10, appleSystemGray3 } from '../src/Config'
import React from 'react'

export default function PaymentCard({ paymentInfo, paymentAmount, buttonText, buttonAction }) {
    return (
        <View>
            <Text style={{ fontSize: 18 }} className="font-medium mb-1">{paymentInfo}</Text>
            <View className="flex-row items-center justify-between my-3">
                <View>
                    <Text style={{ fontSize: 11, color: appleSystemFillGray10 }} className="font-semibold uppercase mb-1 text-center">Amount</Text>
                    <Text style={{ fontSize: 20 }} className="font-bold text-center">{paymentAmount}</Text>
                </View>
                <View style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#909090',
                }}></View>
                <View>
                    <Text style={{ fontSize: 11, color: appleSystemFillGray10 }} className="font-semibold uppercase mb-1 text-center">Due Date</Text>
                    <Text style={{ fontSize: 20 }} className="font-bold text-center">22/09/2023</Text>
                </View>
                <View style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#909090',
                }}></View>
                <View>
                    <Text style={{ fontSize: 11, color: appleSystemFillGray10 }} className="font-semibold uppercase mb-1">s</Text>
                    <Text style={{ fontSize: 20 }} className="font-bold">22</Text>
                </View>
            </View>
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