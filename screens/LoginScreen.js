import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { appleSystemGray } from '../src/Config'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {

  const navigation = useNavigation()

  const [registerNumber, setRegisterNumber] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="bg-white flex-1 px-5 justify-center">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mb-3 p-3">
          <Text className="text-center mb-2 font-bold" style={{ fontSize: 24 }}>St. Joseph's College</Text>
          <Text className="text-center font-bold" style={{ fontSize: 24 }}>Student ERP</Text>
        </View>
        <TextInput
          style={style.input}
          placeholder={"Register Number"}
          autoCapitalize="none"
          className="w-full mb-3"
          value={registerNumber}
          onChangeText={setRegisterNumber}
          returnKeyType="default"
          blurOnSubmit={false}
        />
        <TextInput
          style={style.input}
          secureTextEntry={true}
          placeholder={"Password"}
          autoCapitalize="none"
          className="w-full mb-3"
          value={password}
          onChangeText={setPassword}
          returnKeyType="default"
          blurOnSubmit={false}
        />
        <TouchableOpacity
          className=""
          style={style.button}
        >
          <Text className="text-white font-semibold" style={{ fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-12" onPress={() => navigation.navigate("Forgot Password")}>
          <Text className="font-medium text-center">Forgot Password?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  input: {
    padding: 10,
    paddingVertical: 12,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: appleSystemGray,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  }
})