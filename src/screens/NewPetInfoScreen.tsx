import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function NewPetInfoScreen() {
	const navigation = useNavigation();

	// 名前・犬種
	const [petName, setPetName] = useState("");
	const [petBreed, setPetBreed] = useState("");

	// 大きさ
	const [size, setSize] = useState("");
	const [showSizePicker, setShowSizePicker] = useState(false);

	// 性別
	const [sex, setSex] = useState("");
	const [showSexPicker, setShowSexPicker] = useState(false);

	// 性格
	const [personality, setPersonality] = useState("");
	const [showPersonalityPicker, setShowPersonalityPicker] = useState(false);

	// 生年月日
	const [birthYear, setBirthYear] = useState("2023");
	const [birthMonth, setBirthMonth] = useState("01");
	const [birthDay, setBirthDay] = useState("01");
	const [showBirthPicker, setShowBirthPicker] = useState(false);

	// 写真: 最大3枚
	const [photos, setPhotos] = useState<string[]>([]);

	// エラー文言を管理するステート（各項目ごと）
	const [errorName, setErrorName] = useState("");
	const [errorBreed, setErrorBreed] = useState("");
	const [errorSize, setErrorSize] = useState("");
	const [errorSex, setErrorSex] = useState("");
	const [errorPersonality, setErrorPersonality] = useState("");
	const [errorPhotos, setErrorPhotos] = useState("");

	// 戻るボタンカスタマイズ: 入力を破棄するかどうか確認
	useEffect(() => {
		// beforeRemoveイベント: 画面を離れる前にフック
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			// デフォルトの戻る挙動を止め、ユーザーに確認
			e.preventDefault();

			Alert.alert(
				"確認",
				"入力した情報は削除されます。前の画面に戻りますか？",
				[
					{ text: "いいえ", style: "cancel" },
					{
						text: "はい",
						style: "destructive",
						onPress: () => {
							// 「はい」の場合のみ実際に戻る
							navigation.dispatch(e.data.action);
						},
					},
				]
			);
		});
		return unsubscribe;
	}, [navigation]);

	// カメラ撮影
	const handlePickPhotoFromCamera = async () => {
		const { status: cameraStatus } =
			await ImagePicker.requestCameraPermissionsAsync();
		if (cameraStatus !== "granted") {
			alert("カメラ使用の許可が必要です");
			return;
		}
		const result = await ImagePicker.launchCameraAsync({
			allowsMultipleSelection: false,
			quality: 1,
		});
		if (!result.canceled && result.assets) {
			const uri = result.assets[0].uri;
			if (photos.length < 3) {
				setPhotos([...photos, uri]);
			} else {
				alert("最大3枚まで登録できます");
			}
		}
	};

	// ライブラリから選択
	const handlePickPhotoFromLibrary = async () => {
		const { status: libraryStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (libraryStatus !== "granted") {
			alert("写真ライブラリへのアクセス許可が必要です");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images", // 新しい書き方
			allowsMultipleSelection: false,
			quality: 1,
		});
		if (!result.canceled && result.assets) {
			const uri = result.assets[0].uri;
			if (photos.length < 3) {
				setPhotos([...photos, uri]);
			} else {
				alert("最大3枚まで登録できます");
			}
		}
	};

	// 必須チェックをしてOKなら次画面(VaccinationCertificateScreen)に遷移
	const handleRegister = () => {
		let hasError = false;

		// 各項目をクリアして再チェック
		setErrorName("");
		setErrorBreed("");
		setErrorSize("");
		setErrorSex("");
		setErrorPersonality("");
		setErrorPhotos("");

		if (!petName.trim()) {
			setErrorName("名前は必須です");
			hasError = true;
		}
		if (!petBreed.trim()) {
			setErrorBreed("犬種は必須です");
			hasError = true;
		}
		if (!size) {
			setErrorSize("大きさを選択してください");
			hasError = true;
		}
		if (!sex) {
			setErrorSex("性別を選択してください");
			hasError = true;
		}
		if (!personality) {
			setErrorPersonality("性格を選択してください");
			hasError = true;
		}
		if (photos.length === 0) {
			setErrorPhotos("写真を少なくとも1枚登録してください");
			hasError = true;
		}

		if (hasError) {
			// エラーがあれば遷移せず終了
			return;
		}

		// ここまで来ればOK → 次の画面へ遷移
		navigation.navigate("VaccinationCertificateScreen" as never);
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<View style={styles.container}>
				{/* 名前 */}
				<Text style={styles.label}>名前</Text>
				<TextInput
					style={styles.input}
					value={petName}
					onChangeText={setPetName}
					placeholder="例: ポチ"
				/>
				{/* エラー表示 */}
				{errorName ? (
					<Text style={styles.errorText}>{errorName}</Text>
				) : null}

				{/* 犬種 */}
				<Text style={styles.label}>犬種</Text>
				<TextInput
					style={styles.input}
					value={petBreed}
					onChangeText={setPetBreed}
					placeholder="例: 柴犬"
				/>
				{errorBreed ? (
					<Text style={styles.errorText}>{errorBreed}</Text>
				) : null}

				{/* 大きさ */}
				<Text style={styles.label}>大きさ</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() => setShowSizePicker(!showSizePicker)}
				>
					<Text>{size || "選択してください"}</Text>
				</TouchableOpacity>
				{showSizePicker && (
					<View style={styles.pickerContainer}>
						<Picker
							style={styles.picker}
							itemStyle={styles.pickerItem}
							selectedValue={size}
							onValueChange={(val) => setSize(val)}
						>
							<Picker.Item label="小型犬" value="小型犬" />
							<Picker.Item label="中型犬" value="中型犬" />
							<Picker.Item label="大型犬" value="大型犬" />
						</Picker>
						<TouchableOpacity
							style={styles.closePickerButton}
							onPress={() => setShowSizePicker(false)}
						>
							<Text style={{ color: "#fff" }}>OK</Text>
						</TouchableOpacity>
					</View>
				)}
				{errorSize ? (
					<Text style={styles.errorText}>{errorSize}</Text>
				) : null}

				{/* 性別 */}
				<Text style={styles.label}>性別</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() => setShowSexPicker(!showSexPicker)}
				>
					<Text>{sex || "選択してください"}</Text>
				</TouchableOpacity>
				{showSexPicker && (
					<View style={styles.pickerContainer}>
						<Picker
							style={styles.picker}
							itemStyle={styles.pickerItem}
							selectedValue={sex}
							onValueChange={(val) => setSex(val)}
						>
							<Picker.Item label="オス" value="オス" />
							<Picker.Item label="メス" value="メス" />
						</Picker>
						<TouchableOpacity
							style={styles.closePickerButton}
							onPress={() => setShowSexPicker(false)}
						>
							<Text style={{ color: "#fff" }}>OK</Text>
						</TouchableOpacity>
					</View>
				)}
				{errorSex ? (
					<Text style={styles.errorText}>{errorSex}</Text>
				) : null}

				{/* 性格 */}
				<Text style={styles.label}>性格</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() =>
						setShowPersonalityPicker(!showPersonalityPicker)
					}
				>
					<Text>{personality || "選択してください"}</Text>
				</TouchableOpacity>
				{showPersonalityPicker && (
					<View style={styles.pickerContainer}>
						<Picker
							style={styles.picker}
							itemStyle={styles.pickerItem}
							selectedValue={personality}
							onValueChange={(val) => setPersonality(val)}
						>
							<Picker.Item
								label="おとなしい"
								value="おとなしい"
							/>
							<Picker.Item label="ヤンチャ" value="ヤンチャ" />
						</Picker>
						<TouchableOpacity
							style={styles.closePickerButton}
							onPress={() => setShowPersonalityPicker(false)}
						>
							<Text style={{ color: "#fff" }}>OK</Text>
						</TouchableOpacity>
					</View>
				)}
				{errorPersonality ? (
					<Text style={styles.errorText}>{errorPersonality}</Text>
				) : null}

				{/* 生年月日 */}
				<Text style={styles.label}>生年月日</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() => setShowBirthPicker(!showBirthPicker)}
				>
					<Text>
						{birthYear}年 {birthMonth}月 {birthDay}日
					</Text>
				</TouchableOpacity>
				{showBirthPicker && (
					<View>
						<View style={styles.birthRow}>
							<Picker
								style={[styles.birthPicker, styles.picker]}
								itemStyle={styles.pickerItem}
								selectedValue={birthYear}
								onValueChange={(val) => setBirthYear(val)}
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
								selectedValue={birthMonth}
								onValueChange={(val) => setBirthMonth(val)}
							>
								{Array.from({ length: 12 }, (_, i) => {
									const month = i + 1;
									return (
										<Picker.Item
											key={month}
											label={`${month}月`}
											value={String(month).padStart(
												2,
												"0"
											)}
										/>
									);
								})}
							</Picker>

							<Picker
								style={[styles.birthPicker, styles.picker]}
								itemStyle={styles.pickerItem}
								selectedValue={birthDay}
								onValueChange={(val) => setBirthDay(val)}
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
							onPress={() => setShowBirthPicker(false)}
						>
							<Text style={{ color: "#fff" }}>OK</Text>
						</TouchableOpacity>
					</View>
				)}

				{/* 写真（最大3枚） */}
				<Text style={styles.label}>写真 (最大3枚)</Text>
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
				{/* ★ 3つの枠にプレビュー */}
				<View style={styles.photoSlotContainer}>
					{[0, 1, 2].map((index) => {
						const uri = photos[index];
						if (uri) {
							return (
								<View key={index} style={styles.slotBox}>
									<Image
										source={{ uri }}
										style={styles.slotImage}
										resizeMode="cover"
									/>
								</View>
							);
						} else {
							return (
								<View
									key={index}
									style={styles.slotPlaceholderBox}
								>
									<Text style={styles.slotPlaceholderText}>
										写真{index + 1}
									</Text>
								</View>
							);
						}
					})}
				</View>
				{errorPhotos ? (
					<Text style={styles.errorText}>{errorPhotos}</Text>
				) : null}

				{/* 登録ボタン */}
				<Button title="登録" onPress={handleRegister} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 16,
	},
	container: {
		flex: 1,
		padding: 16,
	},
	label: {
		marginTop: 8,
		fontWeight: "bold",
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginBottom: 8,
		borderRadius: 4,
	},
	errorText: {
		color: "red",
		marginBottom: 8,
	},
	selectBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		borderRadius: 4,
		marginBottom: 8,
		justifyContent: "center",
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		marginBottom: 8,
		padding: 8,
	},
	picker: {
		color: "#000",
	},
	pickerItem: {
		color: "#000",
	},
	birthRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	birthPicker: {
		flex: 1,
	},
	closePickerButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 8,
		alignSelf: "flex-end",
		marginTop: 8,
	},
	// カメラ・ライブラリ ボタン横並び
	photoButtonContainer: {
		flexDirection: "row",
		marginBottom: 16,
	},
	photoButton: {
		flex: 1,
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 8,
		alignItems: "center",
	},
	photoButtonText: {
		color: "#fff",
	},
	// スロット3つ
	photoSlotContainer: {
		marginBottom: 16,
	},
	slotBox: {
		width: "100%",
		height: 200,
		backgroundColor: "#eee",
		borderRadius: 4,
		marginBottom: 8,
		overflow: "hidden",
	},
	slotImage: {
		width: "100%",
		height: "100%",
	},
	slotPlaceholderBox: {
		width: "100%",
		height: 200,
		backgroundColor: "#eee",
		borderRadius: 4,
		marginBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	slotPlaceholderText: {
		color: "#666",
		fontWeight: "bold",
	},
});
