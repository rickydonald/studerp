import { Platform, StyleSheet } from 'react-native';
import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from './screens/DashboardScreen';
import * as IconsOutline from 'react-native-heroicons/outline';
import * as IconsSolid from 'react-native-heroicons/solid';
import AttendanceScreen from './screens/AttendanceScreen';

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();
const Tab = createBottomTabNavigator();

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
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
