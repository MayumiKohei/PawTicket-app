import React, { useLayoutEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { HeaderLeftButton, HeaderRightButton } from "@/components/Header";

export default function HomeScreen() {
	const navigation = useNavigation();

	const handleLeftPress = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, [navigation]);

	const handleRightPress = useCallback(() => {
		navigation.navigate("PetInfo" as never);
	}, [navigation]);

	const renderHeaderLeft = useCallback(() => {
		return <HeaderLeftButton onPressLeft={handleLeftPress} />;
	}, [handleLeftPress]);

	const renderHeaderRight = useCallback(() => {
		return <HeaderRightButton onPressRight={handleRightPress} />;
	}, [handleRightPress]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: renderHeaderLeft,
			headerRight: renderHeaderRight,
			gestureEnabled: false,
			headerTintColor: "#000",
		});
	}, [navigation, renderHeaderLeft, renderHeaderRight]);

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
