import { View, Text, KeyboardAvoidingView, Platform, Pressable, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyIcon } from 'react-native-heroicons/solid'
import { TextInput } from 'react-native-gesture-handler'
import { ForgotPasswordEndpoints, apiUrl, appleSystemFillGray10, appleSystemGray, appleSystemGray6 } from '../src/Config'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

import axios from 'axios'

export default function ForgotPasswordScreen() {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Reset Password',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
        elevation: 0,
      },
      headerTintColor: '#161F3D',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Text className="text-blue-500 font-medium" style={{ fontSize: 15 }}>Close</Text>
        </Pressable>
      )
    });
  })

  const [registerNumber, setRegisterNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [button, setButton] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (registerNumber.length === 8 && phoneNumber.length === 10) {
      setButton(false)
    } else {
      setButton(true)
    }
  }, [registerNumber, phoneNumber])

  function handleRequest() {
    setLoading(true)
    setButton(true)
    axios({
      method: "post",
      url: `${apiUrl}/e/forgot_password/request`,
      data: {
        register_number: registerNumber,
        mobile_number: phoneNumber
      }
    })
      .then(res => res.data)
      .then(res => {
        if (res.status) {
          navigation.navigate("Change Password", {
            registerNumber: registerNumber,
          })
        } else {
          setLoading(false)
          setButton(false)
          Alert.alert("Error", "Student not found with the given register number and phone number.")
        }
      })
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center"
        keyboardVerticalOffset={100}
      >
        <ScrollView className="px-5 pb-8" contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}>
          <View
            style={{ marginBottom: 20, backgroundColor: appleSystemGray6, padding: 25, borderRadius: "100%" }}
            className="mt-16"
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
              fontWeight: "500",
            }}
            placeholder='Enter Register Number'
            maxLength={8}
            value={registerNumber}
            onChangeText={setRegisterNumber}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: appleSystemGray,
              padding: 10,
              width: "100%",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "500",
            }}
            placeholder='Enter Phone Number'
            inputMode='numeric'
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            style={{
              marginTop: 30, borderRadius: 0, width: '100%', backgroundColor: '#000', padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: button ? 0.7 : 1
            }}
            onPress={() => handleRequest()}
            disabled={button}
          >
            {
              loading ?
                <ActivityIndicator color={"white"} /> :
                <>
                  <Text className="text-white font-semibold mr-2" style={{ fontSize: 16 }}>
                    Reset Password
                  </Text>
                  <ChevronRightIcon strokeWidth={2.2} color={"#fff"} width={20} height={20} />
                </>
            }
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}