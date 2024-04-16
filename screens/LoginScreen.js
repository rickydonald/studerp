import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { apiUrl, appleSystemGray } from '../src/Config'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../src/AuthContext'

import axios from 'axios';

export default function LoginScreen() {

  const navigation = useNavigation()

  const { signIn } = useContext(AuthContext)

  const [registerNumber, setRegisterNumber] = useState('')
  const [password, setPassword] = useState('')
  const [button, setButton] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (registerNumber.length === 8 && password.length > 5) {
      setButton(false)
    } else {
      setButton(true)
    }
  }, [registerNumber, password])

  // Function to hangle login
  function handleSignIn() {
    setLoading(true)
    setButton(true)
    axios({
      url: `${apiUrl}/e/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        register_number: registerNumber,
        password: password,
      },
    })
      .then(res => res.data)
      .then(data => {
        if (data.status) {
          signIn(data.token, data.data)
        } else {
          setLoading(false)
          setButton(false)
          Alert.alert("Error", data.message)
        }
      })
  }

  return (
    <SafeAreaView className="bg-white flex-1 px-4 relative">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center"
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
          style={[style.button, { opacity: button ? 0.7 : 1 }]}
          onPress={() => handleSignIn()}
          disabled={button}
        >
          {
            loading ?
              <ActivityIndicator color={"white"} /> :
              <Text className="text-white font-semibold" style={{ fontSize: 16 }}>Login</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity className="mt-12" onPress={() => navigation.navigate("Forgot Password")}>
          <Text className="font-medium text-center">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-5" onPress={() => navigation.navigate("Developer")}>
          <Text className="font-medium text-center">Developer Options</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  input: {
    padding: 10,
    paddingVertical: 12,
    paddingLeft: 12,
    borderColor: appleSystemGray,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: appleSystemGray,
    padding: 10,
    width: "100%",
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 0,
    alignItems: "center",
  }
})