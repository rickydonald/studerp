import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'

export default function LeaveManagementFormScreen(props) {

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'Leave Application',
    })
  }, [])

  const data = [
    { label: "Short Leave", value: "sl" },
    { label: "Long Leave", value: "ll" },
    { label: "Medical Leave", value: "ml" },
    { label: "On Duty", value: "od" }
  ]

  return (
    <SafeAreaView className="flex-1" edges={['bottom']}>
      <Dropdown
        data={data}
      />
    </SafeAreaView>
  )
}