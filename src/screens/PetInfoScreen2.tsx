import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

export default function PetInfoScreen2() {
	const navigation = useNavigation();

	// Pickerの表示状態を管理
	const [showSizePicker, setShowSizePicker] = React.useState(false);
	const [showSexPicker, setShowSexPicker] = React.useState(false);
	const [showBirthPicker, setShowBirthPicker] = React.useState(false);

	// フォームの初期化を修正
	const {
		setValue,
		formState: { errors },
		watch,
	} = useForm<{
		photos?: string[];
		petName: string;
		petBreed: string;
		size: string;
		sex: string;
		birthYear: string;
		birthMonth: string;
		birthDay: string;
	}>({
		defaultValues: {
			petName: "",
			petBreed: "",
			size: "",
			sex: "",
			birthYear: "2023",
			birthMonth: "01",
			birthDay: "01",
			photos: [],
		},
	});

	// 写真の状態管理
	const photos = watch("photos");

	// カメラ撮影
	const handlePickPhotoFromCamera = async () => {
		try {
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
				if (photos && photos.length < 3) {
					setValue("photos", [...photos, uri]);
				} else {
					Alert.alert("エラー", "最大3枚まで登録できます");
				}
			}
		} catch (error) {
			console.error("カメラエラー", error);
			Alert.alert("エラー", "写真の撮影に失敗しました");
		}
	};

	// ライブラリから選択
	const handlePickPhotoFromLibrary = async () => {
		try {
			const { status: libraryStatus } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			console.log("ライブラリから選択");
			if (libraryStatus !== "granted") {
				Alert.alert(
					"エラー",
					"写真ライブラリへのアクセス許可が必要です"
				);
				return;
			}
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsMultipleSelection: false,
				quality: 1,
			});
			if (!result.canceled && result.assets) {
				const uri = result.assets[0].uri;
				if (photos && photos.length < 3) {
					setValue("photos", [...photos, uri]);
				} else {
					Alert.alert("エラー", "最大3枚まで登録できます");
				}
			}
		} catch (error) {
			console.error("ライブラリエラー", error);
			Alert.alert("エラー", "写真の選択に失敗しました");
		}
	};

	// 送信処理を修正
	const onSubmit = () => {
		navigation.navigate("PetInfo3" as never);
		console.log("送信処理");
	};

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.container}>
					{/* 名前 */}
					<Text style={styles.label}>名前</Text>
					<TextInput
						style={styles.input}
						onChangeText={(text) => setValue("petName", text)}
						placeholder="例: ポチ"
						placeholderTextColor="#999"
					/>
					{errors.petName && (
						<Text style={styles.errorText}>
							{errors.petName.message}
						</Text>
					)}

					{/* 犬種 */}
					<Text style={styles.label}>犬種</Text>
					<TextInput
						style={styles.input}
						onChangeText={(text) => setValue("petBreed", text)}
						placeholder="例: 柴犬"
						placeholderTextColor="#999"
					/>
					{errors.petBreed && (
						<Text style={styles.errorText}>
							{errors.petBreed.message}
						</Text>
					)}

					{/* 大きさ */}
					<Text style={styles.label}>大きさ</Text>
					<TouchableOpacity
						style={styles.selectBox}
						onPress={() => setShowSizePicker(true)}
					>
						<Text>{watch("size") || "選択してください"}</Text>
					</TouchableOpacity>
					{showSizePicker && (
						<View style={styles.pickerContainer}>
							<Picker
								selectedValue={watch("size")}
								onValueChange={(val) => {
									setValue("size", val);
								}}
								style={styles.picker}
								itemStyle={styles.pickerItem}
							>
								<Picker.Item
									label="選択してください"
									value=""
								/>
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
					{errors.size && (
						<Text style={styles.errorText}>
							{errors.size.message}
						</Text>
					)}

					{/* 性別 */}
					<Text style={styles.label}>性別</Text>
					<TouchableOpacity
						style={styles.selectBox}
						onPress={() => setShowSexPicker(true)}
					>
						<Text>{watch("sex") || "選択してください"}</Text>
					</TouchableOpacity>
					{showSexPicker && (
						<View style={styles.pickerContainer}>
							<Picker
								selectedValue={watch("sex")}
								onValueChange={(val) => {
									setValue("sex", val);
								}}
								style={styles.picker}
								itemStyle={styles.pickerItem}
							>
								<Picker.Item
									label="選択してください"
									value=""
								/>
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
					{errors.sex && (
						<Text style={styles.errorText}>
							{errors.sex.message}
						</Text>
					)}

					{/* 生年月日 */}
					<Text style={styles.label}>生年月日</Text>
					<TouchableOpacity
						style={styles.selectBox}
						onPress={() => setShowBirthPicker(true)}
					>
						<Text>
							{watch("birthYear")}年 {watch("birthMonth")}月{" "}
							{watch("birthDay")}日
						</Text>
					</TouchableOpacity>
					{showBirthPicker && (
						<View>
							<View style={styles.birthRow}>
								<Picker
									style={[styles.birthPicker, styles.picker]}
									itemStyle={styles.pickerItem}
									selectedValue={watch("birthYear")}
									onValueChange={(val) =>
										setValue("birthYear", val)
									}
								>
									{Array.from({ length: 30 }, (_, i) => {
										const year = 2023 - i;
										return (
											<Picker.Item
												key={year}
												label={`${year}`}
												value={String(year)}
											/>
										);
									})}
								</Picker>
								<Picker
									style={[styles.birthPicker, styles.picker]}
									itemStyle={styles.pickerItem}
									selectedValue={watch("birthMonth")}
									onValueChange={(val) =>
										setValue("birthMonth", val)
									}
								>
									{Array.from({ length: 12 }, (_, i) => {
										const month = i + 1;
										return (
											<Picker.Item
												key={month}
												label={`${month}`}
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
									selectedValue={watch("birthDay")}
									onValueChange={(val) =>
										setValue("birthDay", val)
									}
								>
									{Array.from({ length: 31 }, (_, i) => {
										const day = i + 1;
										return (
											<Picker.Item
												key={day}
												label={`${day}`}
												value={String(day).padStart(
													2,
													"0"
												)}
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
					{errors.birthYear && (
						<Text style={styles.errorText}>
							{errors.birthYear.message}
						</Text>
					)}
					{errors.birthMonth && (
						<Text style={styles.errorText}>
							{errors.birthMonth.message}
						</Text>
					)}
					{errors.birthDay && (
						<Text style={styles.errorText}>
							{errors.birthDay.message}
						</Text>
					)}

					{/* 写真（最大3枚）のエラーメッセージ */}
					{errors.photos && (
						<Text style={styles.errorText}>
							{errors.photos.message}
						</Text>
					)}

					{/* カメラ & ライブラリ ボタン */}
					<View style={styles.photoButtonContainer}>
						<TouchableOpacity
							style={[styles.photoButton, { marginRight: 8 }]}
							onPress={handlePickPhotoFromCamera}
						>
							<Text style={styles.photoButtonText}>
								カメラで撮影
							</Text>
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

					{/* 写真プレビュー枠：3つのスロット */}
					<View style={styles.photoSlotContainer}>
						{[0, 1, 2].map((index) => {
							const uri = photos?.[index];
							if (uri) {
								return (
									<View
										key={String(index)}
										style={styles.slotBox}
									>
										<Image
											source={{ uri }}
											style={styles.slotImage}
											resizeMode="cover"
										/>
										{/* 削除ボタン追加 */}
										<TouchableOpacity
											style={styles.removePhotoButton}
											onPress={() => {
												const newPhotos = [...photos];
												newPhotos.splice(index, 1);
												setValue("photos", newPhotos);
											}}
										>
											<Text
												style={styles.removePhotoText}
											>
												×
											</Text>
										</TouchableOpacity>
									</View>
								);
							} else {
								return (
									<View
										key={String(index)}
										style={styles.slotPlaceholderBox}
									>
										<Text
											style={styles.slotPlaceholderText}
										>
											写真{index + 1}
										</Text>
									</View>
								);
							}
						})}
					</View>
				</View>
			</ScrollView>

			{/* 登録ボタン */}
			<View style={styles.registerButtonContainer}>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={onSubmit}
					activeOpacity={0.7}
				>
					<Text style={styles.registerButtonText}>登録</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 16,
	},
	container: {
		flex: 1,
		padding: 16,
	},
	description: {
		marginBottom: 16,
		lineHeight: 20,
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
		paddingVertical: 8, // モバイルでの操作性向上のため少し大きく
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
		padding: 12, // モバイルでの操作性向上のため少し大きく
		borderRadius: 4,
		marginBottom: 16,
		justifyContent: "center",
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		marginBottom: 16,
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
		padding: 10, // モバイルでの操作性向上のため少し大きく
		alignSelf: "flex-end",
		marginTop: 8,
	},
	photoButtonContainer: {
		flexDirection: "row",
		marginBottom: 16,
	},
	photoButton: {
		flex: 1,
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 12, // モバイルでの操作性向上のため少し大きく
		alignItems: "center",
	},
	photoButtonText: {
		color: "#fff",
		fontWeight: "500",
	},
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
		position: "relative",
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
	removePhotoButton: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "rgba(0,0,0,0.5)",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	removePhotoText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	registerButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 15,
		alignItems: "center",
	},
	registerButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	registerButtonContainer: {
		marginTop: 16,
	},
});
