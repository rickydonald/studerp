import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';
import ProfileDataCard from '../components/ProfileDataCard';
import HorizontalLine from '../components/HorizontalLine';

export default function ProfileScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1">
            <Header screenName={"Profile"} />
            <ScrollView className="px-5 pt-5 bg-white">
                <ProfileDataCard
                    title={"Register Number"}
                    data={"21UCS632"}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Fullname"}
                    data={"RICKY DONALD R"}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Aadhar Number"}
                    data={"1234 5678 9012"}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Gender"}
                    data={"Male"}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"DoB"}
                    data={"28-09-2003"}
                    className={"mb-5"}
                />
            </ScrollView>
        </SafeAreaView>
    )
}