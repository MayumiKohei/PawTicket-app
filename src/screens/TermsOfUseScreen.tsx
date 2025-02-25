import React, { useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TermsOfUseScreen() {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		// ヘッダーの戻るボタンを消し、スワイプで戻れないように設定
		navigation.setOptions({
			headerLeft: () => null,
			gestureEnabled: false,
		});
	}, [navigation]);

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<View style={styles.container}>
				<Text style={styles.termsText}>
					PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約
					{"\n"}
					PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約PawTicket利用規約
					{"\n"}…（長文の利用規約）
				</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate("PrivacyPolicy" as never);
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
		paddingBottom: 16,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	termsText: {
		fontSize: 16,
		lineHeight: 22,
		marginBottom: 20,
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
