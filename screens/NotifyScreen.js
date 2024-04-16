import { View, Text, ScrollView, FlatList, RefreshControl, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { apiUrl, appleSystemFillGray10, appleSystemGray6 } from '../src/Config'
import NotSc from './NotSc'
import axios from 'axios'
import { AuthContext } from '../src/AuthContext'

import { momnent } from 'moment'

export default function NotifyScreen() {

    const { userGlobalData } = useContext(AuthContext)

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Notifications",
            headerTintColor: "#000",
        })
    }, [])

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    function getNotifications() {
        axios({
            method: 'get',
            url: `${apiUrl}/i/user/notifications/show?register_number=${userGlobalData.register_number}`,
        })
            .then(response => response.data)
            .then(data => {
                setNotifications(data.data)
                // console.log(data.data)
                setRefreshing(false)
                setLoading(false)
            })
    }

    useEffect(() => {
        getNotifications()
    }, [])

    // Refresh Control
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getNotifications()
    }, []);

    function routingLogics(notifyFrom) {
        if (notifyFrom === "attendance") {
            return navigation.navigate('Attendance')
        } else if (notifyFrom === "coe") {
            return navigation.navigate('Academics')
        } else if (notifyFrom === "general") {
            return null
        } else {
            return null
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white gap-3" edges={['bottom']}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ padding: 10 }}
                data={notifications}
                ListHeaderComponent={
                    loading ?
                        <ActivityIndicator /> :
                        notifications.length === 0 &&
                        <Text className="text-center mt-3">No New Notifications</Text>
                }
                renderItem={({ item }) => (
                    <Pressable
                        style={{ backgroundColor: appleSystemGray6, borderRadius: 16 }} className="p-3 mb-3"
                        onPress={() => routingLogics(item.notification_from)}
                    >
                        <Text className="uppercase font-semibold mb-1" style={{ fontSize: 11, color: appleSystemFillGray10, marginBottom: 8 }}>
                            {
                                item.notification_title
                            }
                        </Text>
                        <Text className="font-bold" style={{ fontSize: 18 }}>
                            {item.notification_description}
                        </Text>
                    </Pressable>
                )}
                keyExtractor={item => item.id}
            />
            {/* <NotSc /> */}
        </SafeAreaView>
    )
}