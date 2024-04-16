import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';
import ProfileDataCard from '../components/ProfileDataCard';
import HorizontalLine from '../components/HorizontalLine';
import { AuthContext } from '../src/AuthContext';

export default function ProfileScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
        });
    }, [])

    const { userGlobalData } = useContext(AuthContext);

    useEffect(() => {
        //console.log(userGlobalData)
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1" edges={['bottom']}>
            <ScrollView className="px-5 pt-5 bg-white">
                <ProfileDataCard
                    title={"Register Number"}
                    data={userGlobalData.register_number.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Fullname"}
                    data={userGlobalData.fullname.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Aadhar Number"}
                    data={userGlobalData.aadhar_number}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Gender"}
                    data={userGlobalData.gender.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Date of Birth"}
                    data={"28-02-2004"}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Father's Name"}
                    data={userGlobalData.father_name.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Mother's Name"}
                    data={userGlobalData.mother_name.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Nationality"}
                    data={userGlobalData.nationality.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Phone Number"}
                    data={userGlobalData.phone_number}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Email ID"}
                    data={userGlobalData.email}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Permanent Address"}
                    data={userGlobalData.permanent_address.toUpperCase()}
                />
                <HorizontalLine />
                <ProfileDataCard
                    title={"Present Address"}
                    data={userGlobalData.present_address.toUpperCase()}
                    className={"mb-6"}
                />
            </ScrollView>
        </SafeAreaView>
    )
}