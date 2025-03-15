import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PetInfoScreen6() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.messageContainer}>
				<Text style={styles.completeMessage}>
					すべての登録が完了しました。{"\n"}
					証明書の確認まで今しばらくお待ちください。
				</Text>
				<Text style={styles.guidanceMessage}>
					他に登録するペットがいる場合は追加登録ボタンを、{"\n"}
					いない場合はサブスクリプション登録ボタンを押下してください
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.addButton]}
					onPress={() => navigation.navigate("PetInfo2" as never)}
					activeOpacity={0.7}
				>
					<Text style={styles.buttonText}>追加登録</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.subscriptionButton]}
					onPress={() => navigation.navigate("Subscription" as never)}
					activeOpacity={0.7}
				>
					<Text style={styles.buttonText}>
						サブスクリプション登録
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
	},
	messageContainer: {
		alignItems: "center",
		marginBottom: 40,
	},
	completeMessage: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 24,
		lineHeight: 24,
	},
	guidanceMessage: {
		fontSize: 16,
		textAlign: "center",
		lineHeight: 24,
	},
	buttonContainer: {
		gap: 16,
	},
	button: {
		borderRadius: 4,
		padding: 15,
		alignItems: "center",
	},
	addButton: {
		backgroundColor: "#007bff",
	},
	subscriptionButton: {
		backgroundColor: "#28a745",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
