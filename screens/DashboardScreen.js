import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {

  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false,
    headerStyle: {
      backgroundColor: '#A52A2A',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  });

  return (
    <SafeAreaView className="px-3 bg-white flex-1">
      <ScrollView>
        <View className="p-2 rounded-xl" style={{ backgroundColor: '#A52A2A' }}>
          <View className="flex-row items-center">
            <Image
              source={{ uri: "https://sjctni.edu/images/SPhotos/21/21pen843.jpg" }}
              width={80}
              height={80}
              className="rounded-full mr-2"
            />
            <View>
              <Text className="text-xl mb-1 font-bold text-white">Harini Ramaprasad</Text>
              <Text className="text-gray-100">M.A. English Literature</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}