import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { appleSystemBlue, appleSystemFillGray10, appleSystemGray3, appleSystemGreen } from '../src/Config'
import React from 'react'

export default function PaymentCard({ paymentInfo, paymentAmount, buttonText, buttonAction, isPaid }) {
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
                    <Text style={{ fontSize: 11, color: appleSystemFillGray10 }} className="font-semibold uppercase mb-1 text-center">
                        {
                            isPaid ? "PAID ON" : "DUE DATE"
                        }
                    </Text>
                    <Text style={{ fontSize: 20 }} className="font-bold text-center">22/09/2023</Text>
                </View>
                <View style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#909090',
                }}></View>
                <View>
                    <Text style={{ fontSize: 11, color: appleSystemFillGray10 }} className="font-semibold uppercase mb-1 text-center">Fine Amount</Text>
                    <Text style={{ fontSize: 20 }} className="font-bold text-center">Nil</Text>
                </View>
            </View>
            <TouchableOpacity
                className="mt-2"
                style={{ backgroundColor: !isPaid ? appleSystemBlue : appleSystemGreen, borderRadius: 8, padding: 10 }}
                onPress={buttonAction}
            >
                <Text className="text-white font-semibold text-center" style={{ fontSize: 15 }}>
                    {
                        isPaid ? 'Download Receipt' : "Pay Now" && buttonText
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
}