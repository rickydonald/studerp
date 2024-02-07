import { View, Text, TouchableOpacity } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import React from "react";
import { appleSystemFillGray10 } from "../src/Config";

const ListMenu = ({
    singleMenu = false,
    firstMenu = false,
    lastMenu = false,
    middleMenu = false,
    menuTitle = "Menu",
    vauleTitle = "",
    onPressEvent,
    titleStyle,
    menuSpacing,
    menuClass,
    menuIcon = <Icons.ChevronRightIcon color={appleSystemFillGray10} size={26} />,
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
                        <View className="flex-row items-center">
                            <Text style={{ fontSize: 16, color: appleSystemFillGray10 }} className="font-medium">{vauleTitle}</Text>
                            <View className="mr-2">{menuIcon}</View>
                        </View>
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
                            <View className="flex-row items-center">
                                <Text style={{ fontSize: 16, color: appleSystemFillGray10 }} className="font-medium">{vauleTitle}</Text>
                                <View className="mr-2">{menuIcon}</View>
                            </View>
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
                            <View className="flex-row items-center">
                                <Text style={{ fontSize: 16, color: appleSystemFillGray10 }} className="font-medium">{vauleTitle}</Text>
                                <View className="mr-2">{menuIcon}</View>
                            </View>
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
                            <View className="flex-row items-center">
                                <Text style={{ fontSize: 16, color: appleSystemFillGray10 }} className="font-medium">{vauleTitle}</Text>
                                <View className="mr-2">{menuIcon}</View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            )}
        </>
    );
};

export default ListMenu;