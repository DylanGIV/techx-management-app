import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { Button, FAB, IconButton, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

function TopTabBar({ state, descriptors, navigation, position }) {

    const { colors } = useTheme();
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    const companies = useSelector((state : any) => state.company.companies);
    return (

            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate({ name: route.name, merge: true });
                    }
                };    

                const onLongPress = () => {
                    navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0.3)),
                });

                return (
                    <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flex: 1 }}
                    >
                    <Animated.Text style={{ opacity }}>
                        {label}
                    </Animated.Text>
                    </TouchableOpacity>
                );
                })}
                
            </View>
            
      );
}

export default TopTabBar;