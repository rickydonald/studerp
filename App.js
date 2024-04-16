import { Platform, ActivityIndicator, View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import "react-native-gesture-handler";
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { AuthContext } from './src/AuthContext';

import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import { StatusBar } from 'expo-status-bar';
import ChangePasswordScreen from './screens/PasswordResetStack/ChangePasswordScreen';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const tab_icon_color = "#000";
const tab_icon_size = 26;

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FeedbackScreen from './screens/FeedbackScreen';
import { appleSystemGrayLight6 } from './src/Config';
import LeaveManagementFormScreen from './screens/LeaveManagementFormScreen';

function CustomDrawerContent(props) {

  const { userGlobalData } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 10,
          color: '#000',
        }}
      >Student ERP</Text>
      <Pressable
        style={{ padding: 10, margin: 10, borderRadius: 16, backgroundColor: appleSystemGrayLight6, marginBottom: 20 }}
        className="flex-row items-center"
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate("Profile")
        }}
      >
        <Image
          source={{ uri: `https://sjctni.edu/images/SPhotos/21/${userGlobalData.register_number}.jpg` }}
          width={70}
          height={70}
          className="rounded-full"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userGlobalData.fullname}</Text>
          <Text style={{ fontSize: 16, color: 'grey', marginTop: 3 }}>
            {userGlobalData.register_number.toUpperCase()}
          </Text>
        </View>
      </Pressable>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const LoggedInStack = () => {

  const navigation = useNavigation();
  const iconSpacing = -20;

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '82%',
          backgroundColor: '#fff',
          paddingTop: 10
        },
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        drawerInactiveTintColor: '#000',
        headerTintColor: "#000",
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notify")}
            style={{ marginRight: 10 }}
          >
            <IconsOutline.BellIcon
              color={"#000"}
              strokeWidth={1.6}
              size={26}
            />
          </TouchableOpacity>
        ),
        drawerActiveBackgroundColor: '#000',
        drawerActiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <IconsOutline.HomeIcon
              size={size}
              color={focused ? '#fff' : '#000'}
              style={{ marginRight: iconSpacing }}
            />
          )
        }}
        component={DashboardScreen}
      />
      <Drawer.Screen name='Attendance' component={AttendanceScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <IconsOutline.CalendarIcon
              size={size}
              color={focused ? '#fff' : '#000'}
              style={{ marginRight: iconSpacing }}
            />
          )
        }}
      />
      <Drawer.Screen name='Academics' component={AcademicsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <IconsOutline.IdentificationIcon
              size={size}
              color={focused ? '#fff' : '#000'}
              style={{ marginRight: iconSpacing }}
            />
          )
        }}
      />
      <Drawer.Screen name='Fees & Dues' component={FeesDueScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <IconsOutline.BanknotesIcon
              size={size}
              color={focused ? '#fff' : '#000'}
              style={{ marginRight: iconSpacing }}
            />
          )
        }}
      />
      <Drawer.Screen name="Feedback" component={FeedbackScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <IconsOutline.EnvelopeOpenIcon
              size={size}
              color={focused ? '#fff' : '#000'}
              style={{ marginRight: iconSpacing }}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

/** Main App Function */
export default function App(Props) {

  // Notification Handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '12549414-fedd-4fb1-b180-2241552cd6ed' })).data;
      console.log(token);
    } else {
      //alert('Must use physical device for Push Notifications');
    }

    return token;
  }

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
          Loading...
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
        <StatusBar style="auto" />
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
                      name="Login"
                      component={LoginScreen}
                    />
                    <Stack.Group
                      screenOptions={{
                        presentation: 'fullScreenModal',
                        headerShown: true,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                      }}
                    >
                      <Stack.Screen
                        name="Forgot Password"
                        component={ForgotPasswordScreen}
                      />
                      {/* <Stack.Screen name="OTP" component={ConfirmOTPScreen} /> */}
                      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
                    </Stack.Group>
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Dash" options={{ headerShown: false }} component={LoggedInStack} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Preferences" component={PreferenceScreen} />
                    <Stack.Screen name="Notify" component={NotifyScreen} />
                    <Stack.Screen name="Leave Management Form" component={LeaveManagementFormScreen} />
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