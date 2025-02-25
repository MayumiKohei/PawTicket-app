import React, { useLayoutEffect } from "react";
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PrivacyPolicyScreen() {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => null, // 戻るボタンを非表示
			gestureEnabled: false, // スワイプで戻る動作を無効化
		});
	}, [navigation]);

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<View style={styles.container}>
				<Text style={styles.text}>
					PawTicketプライバシーポリシー
					{"\n\n"}
					PawTicketプライバシーポリシー PawTicketプライバシーポリシー
					PawTicketプライバシーポリシー
					{"\n\n"}
					（長文のプライバシーポリシーをここに記述）
					{"\n\n"}
					PawTicketプライバシーポリシー PawTicketプライバシーポリシー
					PawTicketプライバシーポリシー
					{"\n\n"}…{/* 以下省略 */}
				</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						(navigation as any).navigate("DrawerScreens", {
							screen: "HomeScreen",
						});
					}}
				>
					<Text style={styles.buttonText}>同意する</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		padding: 20,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	text: {
		fontSize: 16,
		lineHeight: 22,
	},
	button: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 4,
		width: "80%",
		alignSelf: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
