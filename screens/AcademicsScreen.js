import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

import { appleSystemFillGray10, appleSystemGray } from '../src/Config'
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import HorizontalLine from '../components/HorizontalLine';
import VerticalLine from '../components/VerticalLine';
import AcademicList from '../components/AcademicList';

export default function AcademicsScreen() {


  const bottomSheetRefCourseSelection = useRef(null)
  const bottomSheetRefAttendanceManagement = useRef(null)

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

  const [selectedId, setSelectedId] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('')

  const handleCourseSelection = (courseId, courseName, faculty) => {
    setSelectedId(courseId);
    setSelectedCourseName(courseName);
    setSelectedFaculty(faculty);
    bottomSheetRefCourseSelection.current.present();
  }

  const DATA = [
    {
      id: '21UBC64EG02',
      title: 'GE - 2: Industry 4.0',
      faculty: 'Dr.V.MARIA ANTONIATE MARTIN'
    },
    {
      id: '21UCS63CC11',
      title: 'Software Engineering',
      faculty: 'Ms.SHERINE DOMINICK'
    },
    {
      id: '21UCS63CC12',
      title: 'Mobile Application Development using Android',
      faculty: 'Mrs.S.THULASI BHARATHI'
    },
    {
      id: '21UCS63CE01',
      title: 'Comprehensive Examination',
      faculty: null
    },
    {
      id: '21UCS63CP07',
      title: 'Software Lab - VI: Android Programming',
      faculty: 'Mrs.S.THULASI BHARATHI'
    },
    {
      id: '21UCS63ES03B',
      title: 'DSE - 3: Cloud Computing',
      faculty: 'Mr.C.MOHANRAJA'
    },
    {
      id: '21UCS63ES04B',
      title: 'DSE - 4: Artificial Intelligence and Machine Learning',
      faculty: 'Dr.J.HIRUDHAYA MARY ASHA'
    },
    {
      id: '21UCS63PW01',
      title: 'Project Work',
      faculty: 'Dr.S.SATHYAPRIYA'
    },
    {
      id: '21UCS64SE04',
      title: 'SEC - 4 (WS): E-Services and Applications',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header screenName={"Academics & COE"} />
      <View className="flex-1">
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <ScrollView className="flex-1">
              <View className="bg-white pb-5 flex-1">
                <View className="mt-5 flex-row items-center justify-between">
                  <View>
                    <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>CGPA</Text>
                    <Text className="text-center font-bold" style={{ fontSize: 25 }}>8.9</Text>
                  </View>
                  <View>
                    <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>SGPA</Text>
                    <Text className="text-center font-bold" style={{ fontSize: 25 }}>8.6</Text>
                  </View>
                  <View>
                    <Text className="text-center uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Courses Completed</Text>
                    <Text className="text-center font-bold" style={{ fontSize: 25 }}>3.0</Text>
                  </View>
                </View>
              </View>
              <View className="pt-5">
                <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 30 }}>Current Semester Courses</Text>
              </View>
            </ScrollView>
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          keyExtractor={item => item.id}
          extraData={selectedId}
          ItemSeparatorComponent={<HorizontalLine />}
          renderItem={({ item }) => {
            return (
              <AcademicList
                title={item.title}
                onPress={() => handleCourseSelection(item.id, item.title, item.faculty)}
              />
            )
          }}
        />
      </View>

      {/* Color Marking Info Bottom Sheet */}
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetRefCourseSelection}
        index={0}
        backgroundStyle={{ backgroundColor: 'rgb(242, 242, 247)', borderRadius: 24 }}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView
          style={{ padding: 18, paddingBottom: 50 }}
        >
          <Text className="font-bold mb-5" style={{ fontSize: 22, paddingLeft: 15, width: "90%" }}>
            {selectedCourseName}
          </Text>

          <View className="bg-white mb-3" style={{ borderRadius: 16, paddingRight: 15 }}>
            <View
              style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 15 }}
            >
              <Text className="uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Course Code</Text>
              <Text className="font-bold" style={{ fontSize: 16 }}>{selectedId}</Text>
            </View>
            <HorizontalLine paddingLeft={15} paddingBottom={0} paddingVertical={0} />
            <View
              style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 15 }}
            >
              <Text className="uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Course Handled By</Text>
              <Text className="font-bold" style={{ fontSize: 16 }}>
                {
                  selectedFaculty ? selectedFaculty : "Not Available"
                }
              </Text>
            </View>
          </View>


          {/* Components (Assignments) */}
          <View
            className="bg-white"
            style={{ borderRadius: 16 }}
          >
            <View className="flex-row justify-between items-center">
              <View style={{ padding: 15 }}>
                <Text className="uppercase font-semibold mb-1 text-center" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Component 1</Text>
                <Text className="font-bold text-center" style={{ fontSize: 22 }}>14.0</Text>
              </View>
              <VerticalLine />
              <View style={{ padding: 15 }}>
                <Text className="uppercase font-semibold mb-1 text-center" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Component 2</Text>
                <Text className="font-bold text-center" style={{ fontSize: 22 }}>10.0</Text>
              </View>
              <VerticalLine />
              <View style={{ padding: 15 }}>
                <Text className="uppercase font-semibold mb-1 text-center" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Component 3</Text>
                <Text className="font-bold text-center" style={{ fontSize: 22 }}>7.0</Text>
              </View>
            </View>
            <HorizontalLine paddingBottom={0} paddingVertical={0} />
            {/* Tests */}
            <View className="flex-row justify-around items-center"
              style={{ padding: 0 }}
            >
              <View style={{ padding: 15 }}>
                <Text className="uppercase font-semibold mb-1 text-center" style={{ fontSize: 11, color: appleSystemFillGray10 }}>Mid Semester</Text>
                <Text className="font-bold text-center" style={{ fontSize: 22 }}>58.0</Text>
              </View>
              <VerticalLine />
              <View style={{ padding: 15 }}>
                <Text className="uppercase font-semibold mb-1 text-center" style={{ fontSize: 11, color: appleSystemFillGray10 }}>End Semester</Text>
                <Text className="font-bold text-center" style={{ fontSize: 22 }}>54.0</Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}