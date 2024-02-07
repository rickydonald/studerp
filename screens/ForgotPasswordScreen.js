import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyIcon } from 'react-native-heroicons/solid'
import { TextInput } from 'react-native-gesture-handler'
import { appleSystemFillGray10, appleSystemGray, appleSystemGray6 } from '../src/Config'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { ChevronRightIcon } from 'react-native-heroicons/outline'

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 bg-white" edges={["bottom"]}>
      <View className="flex-1 justify-center items-center">
        <View
          style={{ marginBottom: 20, backgroundColor: appleSystemGray6, padding: 25, borderRadius: "100%" }}
        >
          <KeyIcon color={appleSystemFillGray10} width={80} height={80} />
        </View>
        <Text className="font-bold mb-3" style={{ fontSize: 24 }}>Forgot Password</Text>
        <Text className="text-center text-gray-500 mb-5" style={{ fontSize: 15 }}>
          Enter your register number and phone number to reset your password.
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: appleSystemGray,
            padding: 10,
            width: "100%",
            marginTop: 20,
            fontSize: 18,
            fontWeight: "600",
          }}
          placeholder='Enter Register Number'
          maxLength={8}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: appleSystemGray,
            padding: 10,
            width: "100%",
            marginTop: 20,
            fontSize: 18,
            fontWeight: "600",
          }}
          placeholder='Enter Phone Number'
          inputMode='numeric'
          maxLength={10}
        />
        <TouchableOpacity
          style={{
            marginTop: 40, borderRadius: 0, width: '100%', backgroundColor: '#000', padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text className="text-center text-white font-semibold mr-2" style={{ fontSize: 16 }}>
            Reset Password
          </Text>
          <ChevronRightIcon strokeWidth={2.2} color={"#fff"} width={20} height={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}