import { Platform } from 'react-native';
import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as IconsOutline from 'react-native-heroicons/outline';
import * as IconsSolid from 'react-native-heroicons/solid';

/** Screens */
import DashboardScreen from './screens/DashboardScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import AcademicsScreen from './screens/AcademicsScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
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
            name="Dashboard" component={AuthStack}
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
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}