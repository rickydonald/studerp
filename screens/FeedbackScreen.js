import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { apiUrl, appleSystemBlue } from '../src/Config'
import axios from 'axios'
import { AuthContext } from '../src/AuthContext'

export default function FeedbackScreen(props) {

    const { userGlobalData } = useContext(AuthContext)

    const feedbackMaxCharacter = 369

    const [feedback, setFeedback] = useState('')
    const [button, setButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedbackCount, setFeedbackCount] = useState(0)

    useEffect(() => {
        if (feedback.length < 10) {
            setButton(false)
        } else {
            setButton(true)
        }
    }, [feedback])

    function submitFeedback() {
        if (feedback.length !== 0) {
            setLoading(true)
            setButton(false)
            axios({
                method: 'post',
                url: `${apiUrl}/i/user/feedback/create`,
                data: {
                    register_number: userGlobalData.register_number,
                    feedback: feedback,
                },
            })
                .then((response) => {
                    console.log(response.data)
                    setLoading(false)
                    setFeedback('')
                    setFeedbackCount(0)
                    setButton(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        }
    }

    return (
        <SafeAreaView className="flex-1 px-4 pt-3" edges={['bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TextInput
                    placeholder="Type your feedback here"
                    multiline
                    numberOfLines={4}
                    style={{
                        height: 250,
                        padding: 10,
                        paddingTop: 10,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontSize: 16,
                    }}
                    value={feedback}
                    onChangeText={(text) => {
                        setFeedback(text)
                        setFeedbackCount(text.length)
                    }}
                    maxLength={feedbackMaxCharacter}
                />
                <Text className="mt-3 text-right" style={{ paddingRight: 10, fontSize: 15 }}>
                    Max Character: {feedbackCount}/{feedbackMaxCharacter}
                </Text>
                <TouchableOpacity
                    className=""
                    style={{
                        backgroundColor: appleSystemBlue,
                        padding: 12,
                        borderRadius: 12,
                        marginTop: 12,
                        opacity: button ? 1 : 0.5,
                    }}
                    activeOpacity={0.6}
                    disabled={!button}
                    onPress={() => submitFeedback()}
                >
                    {
                        loading ?
                            <ActivityIndicator size="small" color="white" />
                            :
                            <Text
                                className="text-white font-semibold text-center"
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Submit
                            </Text>
                    }
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}