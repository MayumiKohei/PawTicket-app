import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function SubscriptionScreen() {
	const navigation = useNavigation();
	const [selectedCount, setSelectedCount] = useState(1);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const PRICE_PER_PET = 500;

	// 頭数の選択肢を生成（1〜10頭）
	const petCounts = Array.from({ length: 10 }, (_, i) => i + 1);

	// 合計金額を計算
	const totalPrice = selectedCount * PRICE_PER_PET;

	// サブスクリプション処理
	const handleSubscription = async () => {
		try {
			if (Platform.OS === "ios") {
				// iOSの場合の処理
				// TODO: App Store Connect の実装
				Alert.alert("確認", "App Storeでの決済に進みます");
			} else {
				// Androidの場合の処理
				// TODO: Google Play Billing の実装
				Alert.alert("確認", "Google Playでの決済に進みます");
			}

			// 仮の成功処理
			setIsSubscribed(true);
		} catch (error) {
			Alert.alert("エラー", "サブスクリプションの登録に失敗しました");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>サブスクリプション登録</Text>

			{!isSubscribed ? (
				<>
					<Text style={styles.description}>
						登録した頭数を選択してください
					</Text>

					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={selectedCount}
							onValueChange={(itemValue) =>
								setSelectedCount(Number(itemValue))
							}
							style={styles.picker}
						>
							{petCounts.map((count) => (
								<Picker.Item
									key={count}
									label={`${count}頭`}
									value={count}
								/>
							))}
						</Picker>
					</View>

					<Text style={styles.priceText}>
						月額料金: {totalPrice.toLocaleString()}円
					</Text>

					<TouchableOpacity
						style={styles.subscribeButton}
						onPress={handleSubscription}
						activeOpacity={0.7}
					>
						<Text style={styles.buttonText}>
							{totalPrice.toLocaleString()}円で登録する
						</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					<Text style={styles.completeMessage}>
						サブスクリプションの登録が完了しました
					</Text>

					<TouchableOpacity
						style={styles.homeButton}
						onPress={() => {
							(navigation as any).navigate("DrawerScreens", {
								screen: "HomeScreen",
							});
						}}
						activeOpacity={0.7}
					>
						<Text style={styles.buttonText}>ホームに戻る</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		marginBottom: 16,
		textAlign: "center",
	},
	pickerContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		marginBottom: 24,
	},
	picker: {
		width: "100%",
	},
	priceText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 24,
	},
	subscribeButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 15,
		width: "100%",
		alignItems: "center",
	},
	homeButton: {
		backgroundColor: "#28a745",
		borderRadius: 4,
		padding: 15,
		width: "100%",
		alignItems: "center",
		marginTop: 24,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	completeMessage: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 24,
	},
});
