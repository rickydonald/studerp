import { Platform } from 'react-native';
import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';

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

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.HomeIcon />
            ) : (
              <IconsOutline.HomeIcon />
            )
          }
        }}
        name="Dashboard" component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.IdentificationIcon />
            ) : (
              <IconsOutline.IdentificationIcon />
            )
          }
        }}
        name="Attendance" component={AttendanceScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.AcademicCapIcon />
            ) : (
              <IconsOutline.AcademicCapIcon />
            )
          }
        }}
        name="Academics" component={AcademicsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <IconsSolid.BanknotesIcon />
            ) : (
              <IconsOutline.BanknotesIcon />
            )
          }
        }}
        name="Fees & Dues " component={FeesDueScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                ...TransitionPresets.SlideFromRightIOS,
              }}
              headerMore="float"
            >
              <Stack.Screen name="Home" component={LoginStack} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}