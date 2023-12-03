import { Platform, StyleSheet, View } from 'react-native';
import "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/DashboardScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = Platform.OS === 'ios' ? createNativeStackNavigator() : createStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='auto' />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
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
