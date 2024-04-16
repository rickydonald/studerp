import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Switch, Pressable, FlatList, RefreshControl } from 'react-native'
import React, { useRef, useCallback, useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AttendanceCard from '../components/AttendanceCard';

import { appleSystemBlue, appleSystemFillGray10, appleSystemGreen, appleSystemRed, appleSystemGrayLight5, appleSystemGray, appleSystemOrange, appleSystemGray3, apiUrl } from '../src/Config';
import { Calendar } from 'react-native-calendars';
import { InformationCircleIcon } from 'react-native-heroicons/outline';

import { BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HorizontalLine from '../components/HorizontalLine';

import ListMenu from '../components/ListMenu';
import axios from 'axios';
import { AuthContext } from '../src/AuthContext';

import { Picker } from '@react-native-picker/picker'

export default function AttendanceScreen() {

  const navigation = useNavigation();

  const { userGlobalData } = useContext(AuthContext)

  const bottomSheetRefColorMarkings = useRef(null)
  const bottomSheetRefAttendanceManagement = useRef(null)
  const bottomSheetRefHourMarkings = useRef(null)

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

  const [attendanceData, setAttendanceData] = useState([])

  function getAttendance() {
    axios({
      method: 'get',
      url: `${apiUrl}/i/user/attendance/show?register_number=${userGlobalData.register_number}`,
      headers: {},
    })
      .then(response => response.data)
      .then(data => {
        setAttendanceData(data.data)
        // console.log(data.data)
        setRefreshing(false)
      })
  }

  useEffect(() => {
    getAttendance()
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState();

  const [showHourMarkings, setHourMarkings] = useState(false)
  const handleHourMarkings = () => setHourMarkings(!showHourMarkings)

  // Refresh Control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAttendance()
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1" edges={['bottom']}>
      {/* Attendance View */}
      <View className="pb-5 flex-1">
        <FlatList
          ListHeaderComponent={
            <View className="bg-white pb-8">
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
                  onPress={() => bottomSheetRefAttendanceManagement.current.present()}
                >
                  <Text className="text-center font-semibold">Attendance Management</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: appleSystemGrayLight5, padding: 10, borderRadius: 10 }}
                  onPress={() => bottomSheetRefColorMarkings.current.present()}
                >
                  <InformationCircleIcon color={"#000"} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 22, fontWeight: 700, marginTop: 40 }}>
                Current Semester Attendance
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={Object.entries(attendanceData)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={<HorizontalLine />}
          renderItem={({ item, index }) => {
            return (
              <AttendanceCard
                date={"15 DEC 23"}
                dayOrder={item[0][0] + "1"}
                hour1={item[1][0]}
                hour2={item[1][1]}
                hour3={item[1][2]}
                hour4={item[1][3]}
                hour5={item[1][4]}
                showHourMarkings={showHourMarkings}
              />
            )
          }}
        />
        {/* Attendance Cards */}
      </View>

      {/* Attendance Management Bottom Sheet */}
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetRefAttendanceManagement}
        index={0}
        backgroundStyle={{ backgroundColor: 'rgb(242, 242, 247)', borderRadius: 24 }}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView
          style={{ padding: 24, paddingBottom: 50 }}
        >
          <Text className="font-bold pl-4 mb- text-black mb-4" style={{ fontSize: 22 }}>Attendance Management</Text>
          <ListMenu
            menuTitle='Leave Management Form'
            firstMenu={true}
            onPressEvent={() => {
              bottomSheetRefAttendanceManagement.current.close()
              navigation.navigate('Leave Management Form')
            }}
          />
          <ListMenu
            menuTitle='Show Hour Markings'
            lastMenu={true}
            disabled={true}
            menuIcon={
              <Switch
                className="mr-4"
                value={showHourMarkings}
                onValueChange={(switchValue) => setHourMarkings(switchValue)}
              />
            }
          />
          <ListMenu
            menuTitle='Sort By'
            singleMenu={true}
            onPressEvent={() => bottomSheetRefHourMarkings.current.present()}
          />

        </BottomSheetView>
      </BottomSheetModal>

      {/* Hour marking status */}
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetRefHourMarkings}
        index={0}
        backgroundStyle={{ backgroundColor: 'rgb(242, 242, 247)', borderRadius: 24 }}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView
          style={{ padding: 18, paddingBottom: 20, }}
        >
          <Text className="font-bold mb-6 text-center" style={{ fontSize: 22 }}>Select Markings Text Type</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            style={{  }}
          >
            <Picker.Item label="Hour Number" value="hour_number" />
            <Picker.Item label="Attendance Status" value="attendance_status" />
          </Picker>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Color Marking Info Bottom Sheet */}
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetRefColorMarkings}
        index={0}
        backgroundStyle={{ backgroundColor: 'rgb(242, 242, 247)', borderRadius: 24 }}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView
          style={{ padding: 18, paddingBottom: 50 }}
        >
          <Text className="font-bold mb-6" style={{ fontSize: 22, paddingLeft: 15 }}>Color Markings</Text>
          <View className="bg-white" style={{ padding: 15, borderRadius: 16 }}>
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemGreen }, attendanceMicroBoxStyle.container]}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Present</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemRed }, attendanceMicroBoxStyle.container]}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Absent</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemBlue }, attendanceMicroBoxStyle.container]}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>On Duty (OD)</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemOrange }, attendanceMicroBoxStyle.container]}></View>
              <Text className="font-semibold" style={{ fontSize: 18 }}>Medical Leave (ML)</Text>
            </View>
            <HorizontalLine />
            <View className="flex-row items-center justify-between">
              <View style={[{ backgroundColor: appleSystemGray3 }, attendanceMicroBoxStyle.container]}></View>
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
    width: 40,
    height: 40,
    borderRadius: 10
  },
  text: {
    display: "none",
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})