import { View, Text, TouchableOpacity } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import React from "react";

const ListMenu = ({
    singleMenu = false,
    firstMenu = false,
    lastMenu = false,
    middleMenu = false,
    menuTitle = "Menu",
    onPressEvent,
    titleStyle,
    menuSpacing,
    menuClass,
    menuIcon = <Icons.ChevronRightIcon color={"#252525"} size={28} />,
    disabled = false
}) => {
    return (
        <>
            {singleMenu && (
                <TouchableOpacity
                    onPress={onPressEvent}
                    activeOpacity={0.4}
                    style={menuSpacing}
                    className={menuClass}
                    disabled={disabled}
                >
                    <View className="bg-white py-4 flex-row justify-between items-center rounded-xl">
                        <Text style={titleStyle} className="pl-4 font-medium text-base">
                            {menuTitle}
                        </Text>
                        <View className="mr-2">{menuIcon}</View>
                    </View>
                </TouchableOpacity>
            )}
            {firstMenu && (
                <>
                    <TouchableOpacity
                        onPress={onPressEvent}
                        activeOpacity={0.4}
                        style={menuSpacing}
                        disabled={disabled}
                    >
                        <View className="bg-white py-4 flex-row justify-between items-center rounded-t-xl">
                            <Text style={titleStyle} className="pl-4 font-medium text-base">
                                {menuTitle}
                            </Text>
                            <View className="mr-2">{menuIcon}</View>
                        </View>
                    </TouchableOpacity>
                    <View className="border-t border-gray-200 ml-4"></View>
                </>
            )}
            {middleMenu && (
                <>
                    <TouchableOpacity
                        onPress={onPressEvent}
                        activeOpacity={0.4}
                        style={menuSpacing}
                        disabled={disabled}
                    >
                        <View className="bg-white py-4 flex-row justify-between items-center">
                            <Text style={titleStyle} className="pl-4 font-medium text-base">
                                {menuTitle}
                            </Text>
                            <View className="mr-2">{menuIcon}</View>
                        </View>
                    </TouchableOpacity>
                    <View className="border-t border-gray-200 ml-4"></View>
                </>
            )}
            {lastMenu && (
                <>
                    <TouchableOpacity
                        onPress={onPressEvent}
                        activeOpacity={0.4}
                        style={menuSpacing}
                        disabled={disabled}
                    >
                        <View className="bg-white py-4 flex-row justify-between items-center rounded-b-xl">
                            <Text style={titleStyle} className="pl-4 font-medium text-base">
                                {menuTitle}
                            </Text>
                            <View className="mr-2">{menuIcon}</View>
                        </View>
                    </TouchableOpacity>
                </>
            )}
        </>
    );
};

export default ListMenu;