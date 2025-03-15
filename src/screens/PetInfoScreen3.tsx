import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	Alert,
	Button,
	ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function PetInfoScreen3() {
	// ワクチン接種日
	const [year, setYear] = useState("2023");
	const [month, setMonth] = useState("01");
	const [day, setDay] = useState("01");
	const [showDayPicker, setShowDayPicker] = useState(false);

	// 接種証明書の写真
	const [certPhoto, setCertPhoto] = useState<string | null>(null);

	const navigation = useNavigation();

	// カメラ撮影
	const handlePickPhotoFromCamera = async () => {
		const { status: cameraStatus } =
			await ImagePicker.requestCameraPermissionsAsync();
		if (cameraStatus !== "granted") {
			Alert.alert("エラー", "カメラ使用の許可が必要です");
			return;
		}
		const result = await ImagePicker.launchCameraAsync({
			allowsMultipleSelection: false,
			quality: 1,
		});
		if (!result.canceled && result.assets) {
			const uri = result.assets[0].uri;
			setCertPhoto(uri); // 1枚だけ表示
		}
	};

	// ライブラリから選択
	const handlePickPhotoFromLibrary = async () => {
		const { status: libraryStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (libraryStatus !== "granted") {
			Alert.alert("エラー", "写真ライブラリへのアクセス許可が必要です");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images",
			allowsMultipleSelection: false,
			quality: 1,
		});
		if (!result.canceled && result.assets) {
			const uri = result.assets[0].uri;
			setCertPhoto(uri);
		}
	};

	// 登録ボタン押下
	const handleRegister = () => {
		// 例: 必須チェック
		if (!certPhoto) {
			Alert.alert(
				"エラー",
				"狂犬病予防接種証明書の写真を登録してください。"
			);
			return;
		}
		// 正常な場合 → ここでサーバー送信等
		Alert.alert("登録完了", "狂犬病予防接種証明書を登録しました。");
		navigation.navigate("PetInfo4" as never);
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.description}>
				狂犬病予防接種証明書の写真を登録してください。{"\n"}
				※対象の愛犬のお名前、生年月日、接種日が明記された証明書を使用してください。
			</Text>

			{/* カメラ & ライブラリ ボタン */}
			<View style={styles.photoButtonContainer}>
				<TouchableOpacity
					style={[styles.photoButton, { marginRight: 8 }]}
					onPress={handlePickPhotoFromCamera}
				>
					<Text style={styles.photoButtonText}>カメラで撮影</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.photoButton}
					onPress={handlePickPhotoFromLibrary}
				>
					<Text style={styles.photoButtonText}>
						ライブラリから選択
					</Text>
				</TouchableOpacity>
			</View>

			{/* ★ プレビュー枠(1つだけ) */}
			<View style={styles.previewContainer}>
				{certPhoto ? (
					// 写真が登録されている場合
					<Image
						source={{ uri: certPhoto }}
						style={styles.previewImage}
					/>
				) : (
					// 未登録の場合のプレースホルダー
					<View style={styles.placeholderBox}>
						<Text style={styles.placeholderText}>
							狂犬病予防接種証明書
						</Text>
					</View>
				)}
			</View>

			{/* 接種日 */}
			<Text style={styles.label}>予防接種日</Text>
			<TouchableOpacity
				style={styles.selectBox}
				onPress={() => setShowDayPicker(!showDayPicker)}
			>
				<Text>
					{year}年 {month}月 {day}日
				</Text>
			</TouchableOpacity>
			{showDayPicker && (
				<View>
					<View style={styles.birthRow}>
						<Picker
							style={[styles.birthPicker, styles.picker]}
							itemStyle={styles.pickerItem}
							selectedValue={year}
							onValueChange={(val) => setYear(val)}
						>
							{Array.from({ length: 30 }, (_, i) => {
								const year = 2023 - i;
								return (
									<Picker.Item
										key={year}
										label={`${year}年`}
										value={String(year)}
									/>
								);
							})}
						</Picker>

						<Picker
							style={[styles.birthPicker, styles.picker]}
							itemStyle={styles.pickerItem}
							selectedValue={month}
							onValueChange={(val) => setMonth(val)}
						>
							{Array.from({ length: 12 }, (_, i) => {
								const month = i + 1;
								return (
									<Picker.Item
										key={month}
										label={`${month}月`}
										value={String(month).padStart(2, "0")}
									/>
								);
							})}
						</Picker>

						<Picker
							style={[styles.birthPicker, styles.picker]}
							itemStyle={styles.pickerItem}
							selectedValue={day}
							onValueChange={(val) => setDay(val)}
						>
							{Array.from({ length: 31 }, (_, i) => {
								const day = i + 1;
								return (
									<Picker.Item
										key={day}
										label={`${day}日`}
										value={String(day).padStart(2, "0")}
									/>
								);
							})}
						</Picker>
					</View>
					<TouchableOpacity
						style={styles.closePickerButton}
						onPress={() => setShowDayPicker(false)}
					>
						<Text style={{ color: "#fff" }}>OK</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* 登録ボタン */}
			<View style={{ marginTop: 16 }}>
				<Button title="登録" onPress={handleRegister} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	description: {
		marginBottom: 16,
		lineHeight: 20,
	},
	photoButtonContainer: {
		flexDirection: "row",
		marginBottom: 16,
	},
	photoButton: {
		flex: 1,
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 10,
		alignItems: "center",
	},
	photoButtonText: {
		color: "#fff",
	},
	// プレビュー枠
	previewContainer: {
		width: "100%",
		height: 200, // 指示通りheight=200
		backgroundColor: "#eee",
		borderRadius: 4,
		marginBottom: 16,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	previewImage: {
		width: "100%",
		height: "100%",
	},
	placeholderBox: {
		width: "100%",
		height: "100%",
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
	},
	placeholderText: {
		color: "#666",
		fontWeight: "bold",
	},

	label: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	selectBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 4,
		marginBottom: 16,
		justifyContent: "center",
	},
	birthRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	birthPicker: {
		flex: 1,
		color: "#000",
	},
	picker: {
		color: "#000",
	},
	pickerItem: {
		color: "#000",
	},
	closePickerButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 8,
		alignSelf: "flex-end",
		marginTop: 8,
	},
});
