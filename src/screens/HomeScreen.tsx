import React, { useLayoutEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createHeaderOptions } from "@/components/Header";

export default function HomeScreen() {
	const navigation = useNavigation();

	const handleRightPress = useCallback(() => {
		navigation.navigate("PetInfo" as never);
	}, [navigation]);

	useLayoutEffect(() => {
		navigation.setOptions(
			createHeaderOptions({
				onPressRight: handleRightPress,
			})
		);
	}, [navigation, handleRightPress]);

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>Home Screen</Text>
			</View>
		</View>
	);
}
