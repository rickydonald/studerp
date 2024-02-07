import { Platform, ActivityIndicator, View, Text } from 'react-native';
import "react-native-gesture-handler";
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { AuthContext } from './src/AuthContext';

import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as IconsOutline from 'react-native-heroicons/outline';
import * as IconsSolid from 'react-native-heroicons/solid';

/** Screens */
import DashboardScreen from './screens/DashboardScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import AcademicsScreen from './screens/AcademicsScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeesDueScreen from './screens/FeesDueScreen';
import PreferenceScreen from './screens/PreferenceScreen';
import NotifyScreen from './screens/NotifyScreen';
import NotSc from './screens/NotSc';
import LoginScreen from './screens/LoginScreen';
import DeveloperScreen from './screens/DeveloperScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();
const Tab = createBottomTabNavigator();
const tab_icon_color = "#000";
const tab_icon_size = 28;

const LoginStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.HomeIcon
                color={tab_icon_color}
                size={tab_icon_size}
              />
            ) : (
              <IconsOutline.HomeIcon
                color={tab_icon_color}
                size={tab_icon_size}
              />
            )
          }
        }}
        name="Dashboard" component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.IdentificationIcon color={tab_icon_color}
                size={tab_icon_size} />
            ) : (
              <IconsOutline.IdentificationIcon color={tab_icon_color}
                size={tab_icon_size} />
            )
          }
        }}
        name="Attendance" component={AttendanceScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.AcademicCapIcon color={tab_icon_color}
                size={tab_icon_size} />
            ) : (
              <IconsOutline.AcademicCapIcon color={tab_icon_color}
                size={tab_icon_size} />
            )
          }
        }}
        name="Academics" component={AcademicsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.BanknotesIcon color={tab_icon_color}
                size={tab_icon_size} />
            ) : (
              <IconsOutline.BanknotesIcon color={tab_icon_color}
                size={tab_icon_size} />
            )
          }
        }}
        name="Fees & Dues " component={FeesDueScreen}
      />
    </Tab.Navigator>
  );
}

/** Main App Function */
export default function App(Props) {

  /** Global States */
  const [userGlobalToken, setUserGlobalToken] = useState(null);
  const [userGlobalData, setUserGlobalData] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(false);

  /** App Actions */
  const [loginState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            userData: action.data,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userData: action.data,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userData: null,
    }
  );

  /** Auth Context */
  const authContext = React.useMemo(
    () => ({
      signIn: async (userProfileToken, userProfileData) => {
        // Signing in the user and storing user token and user data in Secure Store
        try {
          await SecureStore.setItemAsync(
            "userToken",
            JSON.stringify(userProfileToken)
          );
          await SecureStore.setItemAsync(
            "userData",
            JSON.stringify(userProfileData)
          );
        } catch (e) {
          console.log(e);
        }

        setUserGlobalToken(userProfileToken);
        setUserGlobalData(userProfileData);

        dispatch({
          type: "SIGN_IN",
          token: userProfileToken,
          data: userProfileData,
        });
      },
      // Sigining out user by making the Secure Store values null (token and data)
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("userData");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const bootstrapAsync = async () => {
          setIsAppLoading(true);
          let userToken;
          let userData;

          try {
            userToken = await SecureStore.getItemAsync("userToken");
            userData = await SecureStore.getItemAsync("userData");
          } catch (e) {
            console.log(e);
          }

          // CODE TO GET UPDATED DATA OF THE USER HERE AND VERIFY THE TOKEN
          setUserGlobalToken(JSON.parse(userToken));
          setUserGlobalData(JSON.parse(userData));
          setIsAppLoading(false);
          dispatch({ type: "RESTORE_TOKEN", token: userToken, data: userData });
        };

        // Background Fetch while Splash on
        await bootstrapAsync();

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"grey"} />
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 15 }}>
          Warming up...
        </Text>
      </View>
    );
  }


  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        userGlobalToken,
        userGlobalData,
        setUserGlobalData,
        isAppLoading,
      }}
    >
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                  ...TransitionPresets.SlideFromRightIOS,
                  headerTintColor: '#000',
                  headerBackTitleVisible: false
                }}
                headerMore="float"
              >
                {loginState.userToken == null ? (
                  // Logged Out Stack
                  <>
                    <Stack.Screen
                      options={{
                        animationTypeForReplace: loginState.isSignout
                          ? "pop"
                          : "push",
                        headerStyle: { height: 45 },
                        headerShown: false,
                      }}
                      name="Notify"
                      component={LoginScreen}
                    />
                    <Stack.Group
                      screenOptions={{
                        presentation: 'modal',
                        headerShown: true,
                        ...TransitionPresets.ModalSlideFromBottomIOS
                      }}
                    >
                      <Stack.Screen
                        name="Forgot Password"
                        component={ForgotPasswordScreen}
                      />
                    </Stack.Group>
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Home" component={LoginStack} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Preferences" component={PreferenceScreen} />
                    <Stack.Screen name="Notify" component={NotSc} />
                  </>
                )}
                <Stack.Screen name="Developer" component={DeveloperScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </View>
    </AuthContext.Provider>
  );
}