import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AttendanceCard from '../components/AttendanceCard';

import { appleSystemBlue, appleSystemFillGray10, appleSystemGrayLight6, appleSystemGreen, appleSystemRed, appleSystemGrayLight5, appleSystemGray, appleSystemOrange, appleSystemGray3 } from '../src/Config';
import { Calendar } from 'react-native-calendars';
import { InformationCircleIcon } from 'react-native-heroicons/outline';

import { useBottomSheetDynamicSnapPoints, BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HorizontalLine from '../components/HorizontalLine';

export default function AttendanceScreen() {

  const navigation = useNavigation();

  const bottomSheetRef = useRef(null)
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handleOpenPress = (postId, instanceId, userId = null) => {
    bottomSheetRef.current?.present()
  }

  const handleClosePress = () => { bottomSheetRef.current.close(); setSelectedPostId(null); }
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
      />
    ),
    []
  );

  return (
    <SafeAreaView className="bg-white flex-1" edges={['top']}>
      <Header screenName={"Attendance"} />
      <ScrollView className="flex-1">
        <View className="bg-white px-5 pb-5 flex-1">
          <View className="mt-5 flex-row items-center justify-between">
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Absent</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>2.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Medical</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>1.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>On Duty</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>3.0</Text>
            </View>
            <View>
              <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Remaining</Text>
              <Text className="text-center font-bold" style={{ fontSize: 25 }}>15.0</Text>
            </View>
          </View>
          <View className="mt-4 flex-row items-stretch">
            <TouchableOpacity
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
              className="flex-1 flexprow items-center justify-center mr-2"
            >
              <Text className="text-center font-semibold">Attendance Management</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
              onPress={() => handleOpenPress()}
            >
              <InformationCircleIcon color={"#000"} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Attendance View */}
        <View>
          <Calendar
            style={{
              height: 350,
            }}
            className="mb-6"
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Mark specific dates as marked
            markedDates={{
              '2023-12-01': { selected: true, selectedColor: appleSystemRed },
              '2023-12-02': { selected: true, selectedColor: appleSystemRed },
              '2023-12-03': { selected: true, selectedColor: appleSystemBlue }
            }}
          />
          {/* Attendance Cards */}
          <AttendanceCard
            date='15 Dec 23'
            dayOrder='b3'
            hour1={'p'}
            hour2={'a'}
            hour3={'a'}
            hour4={'od'}
            hour5={'p'}
          />
          <View style={{ borderBottomColor: appleSystemGray, borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 15, marginBottom: 15 }} className="px-5"></View>
          <AttendanceCard
            date='16 Dec 23'
            dayOrder='c3'
            hour1={'p'}
            hour2={'p'}
            hour3={'p'}
            hour4={'p'}
            hour5={'p'}
          />
        </View>
      </ScrollView>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        index={0}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backgroundStyle={{ backgroundColor: 'rgb(242, 242, 247)', borderRadius: 24 }}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          style={{ flex: 1, padding: 24 }}
          onLayout={handleContentLayout}
        >
          <View className="pb-5 px-2 pt-0" style={{ marginBottom: 25 }}>
            <Text className="font-bold mb-6" style={{ fontSize: 22 }}>Color Markings</Text>
            <View className="flex-row items-center justify-between">
              <View style={{ backgroundColor: appleSystemGreen, width: 40, height: 40, borderRadius: 10 }}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Present</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={{ backgroundColor: appleSystemRed, width: 40, height: 40, borderRadius: 10 }}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Absent</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={{ backgroundColor: appleSystemBlue, width: 40, height: 40, borderRadius: 10 }}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>On Duty (OD)</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={{ backgroundColor: appleSystemOrange, width: 40, height: 40, borderRadius: 10 }}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Medical Leave (ML)</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={{ backgroundColor: appleSystemGray3, width: 40, height: 40, borderRadius: 10 }}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Not Marked</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}

const attendanceMicroBoxStyle = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    display: "none",
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})