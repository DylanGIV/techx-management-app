import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

    
const BouncingIcon = (props : any) => {
    let arrowValue = new Animated.Value(0);
    
    const icon = props.icon;
    const size = props.size;

    const { colors } = useTheme();

    const animate = () => {
        arrowValue.setValue(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(arrowValue, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowValue, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowValue, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                })
            ])
        ).start(() => animate());
    };


    useEffect(() => {
        animate();

        return arrowValue.stopAnimation();
    }, [animate])

    const position = arrowValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 15]
      });
    return (
        <Animated.View style={{ transform: [{ translateX: position }],  }}>
            <IconButton color={colors.text} icon={icon} size={size}></IconButton>
        </Animated.View>
    );
}
export default BouncingIcon;
    
    