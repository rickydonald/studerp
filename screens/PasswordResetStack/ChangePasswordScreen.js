import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import OTPTextInput from "react-native-otp-textinput";
import {
  appleSystemGray,
  appleSystemRed,
  apiUrl,
  appleSystemGray2,
} from "../../src/Config";

import axios from "axios";

export default function ChangePasswordScreen({ route }) {
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: isOtpConfirmed ? "Change Password" : "Verify OTP",
    });
  }, [isOtpConfirmed]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            className="font-medium"
            style={{ fontSize: 15, color: appleSystemRed }}
          >
            Cancel
          </Text>
        </Pressable>
      ),
    });
  }, []);

  /** Password Handler */
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [button, setButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newPassword.length > 5 && newPassword === confirmNewPassword) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [newPassword, confirmNewPassword]);

  function handlePasswordChange() {
    axios({
      method: "post",
      url: `${apiUrl}/e/forgot_password/reset_password`,
      data: {
        register_number: route.params.registerNumber,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.status) {
          setLoading(true);
          Alert.alert("Success", data.message);
          navigation.navigate("Login");
        } else {
          setLoading(false);
          setErrorText(data.message);
        }
      });
  }

  /** OTP Handler */
  let otpInputRef = useRef(null);
  const [otpInput, setOtpInput] = useState("");
  const [errorText, setErrorText] = useState("Sd");

  useEffect(() => {
    if (otpInput.length === 4 && !isNaN(otpInput)) {
      setLoading(true);
      axios({
        method: "post",
        url: `${apiUrl}/e/forgot_password/verify_passcode`,
        data: {
          register_number: route.params.registerNumber,
          otp: otpInput,
        },
      })
        .then((res) => res.data)
        .then((data) => {
          if (data.status) {
            setIsOtpConfirmed(true);
            setLoading(false);
            //Alert.alert("Success", data.message)
          } else {
            setLoading(false);
            setErrorText(data.message);
          }
        });
    } else {
      setErrorText("");
    }
  }, [otpInput]);

  return (
    <SafeAreaView className="flex-1 items-center px-5">
      {loading && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 100,
            backgroundColor: appleSystemGray2,
            padding: 20,
            borderRadius: 16,
          }}
          size={"large"}
          color={"white"}
        />
      )}
      <View className="w-full flex-1" style={{ opacity: loading ? 0.3 : 1 }}>
        {isOtpConfirmed ? (
          <>
            <Text className="mb-5 text-center">
              Use strong password to protect your account, minimum of 6
              characters is required.
            </Text>
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
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize={"none"}
              autoCorrect={false}
              autoFocus={true}
              secureTextEntry={passwordVisibility ? false : true}
            />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: appleSystemGray,
                padding: 10,
                width: "100%",
                marginTop: 15,
                fontSize: 18,
                fontWeight: "500",
              }}
              placeholder="Re-enter new password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              autoCapitalize={"none"}
              autoCorrect={false}
              secureTextEntry={passwordVisibility ? false : true}
            />
            <Pressable
              className="mt-5 self-end"
              onPress={() => setPasswordVisibility(!passwordVisibility)}
            >
              <Text className="font-medium">
                {passwordVisibility ? "Hide Password" : "Show Password"}
              </Text>
            </Pressable>
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 0,
                width: "100%",
                backgroundColor: "#000",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                opacity: button ? 0.7 : 1,
              }}
              onPress={() => handlePasswordChange()}
              disabled={button}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <>
                  <Text
                    className="mr-2 font-semibold text-white"
                    style={{ fontSize: 16 }}
                  >
                    Change Password
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: appleSystemRed,
                marginTop: 30,
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {errorText}
            </Text>
          </>
        ) : (
          <>
            <Text className="mb-5 text-center">
              To reset your password, {"\n"} Enter the 4 digit OTP sent to your
              mobile number.
            </Text>
            <OTPTextInput
              inputCount={4}
              ref={otpInputRef}
              handleTextChange={setOtpInput}
              keyboardType="numeric"
              autoFocus={true}
            />
            <Text
              style={{
                color: appleSystemRed,
                marginTop: 30,
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {errorText}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
