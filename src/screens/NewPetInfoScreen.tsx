import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function NewPetInfoScreen() {
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

	// カメラ
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

	// ライブラリ
	const handlePickPhotoFromLibrary = async () => {
		const { status: libraryStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (libraryStatus !== "granted") {
			alert("写真ライブラリへのアクセス許可が必要です");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

	// 登録
	const handleRegister = () => {
		const data = {
			petName,
			petBreed,
			size,
			sex,
			personality,
			birthYear,
			birthMonth,
			birthDay,
			photos,
		};
		console.log("Register data:", data);
		// TODO: サーバー送信 / ストレージ保存 等
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

				{/* 犬種 */}
				<Text style={styles.label}>犬種</Text>
				<TextInput
					style={styles.input}
					value={petBreed}
					onChangeText={setPetBreed}
					placeholder="例: 柴犬"
				/>

				{/* 大きさ */}
				<Text style={styles.label}>大きさ</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() => setShowSizePicker(!showSizePicker)}
				>
					<Text>{size}</Text>
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
						{/* OKボタン: これを押すまで閉じない */}
						<TouchableOpacity
							style={styles.closePickerButton}
							onPress={() => setShowSizePicker(false)}
						>
							<Text style={{ color: "#fff" }}>OK</Text>
						</TouchableOpacity>
					</View>
				)}

				{/* 性別 */}
				<Text style={styles.label}>性別</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() => setShowSexPicker(!showSexPicker)}
				>
					<Text>{sex}</Text>
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

				{/* 性格 */}
				<Text style={styles.label}>性格</Text>
				<TouchableOpacity
					style={styles.selectBox}
					onPress={() =>
						setShowPersonalityPicker(!showPersonalityPicker)
					}
				>
					<Text>{personality}</Text>
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
				<View style={styles.photoContainer}>
					{photos.map((uri) => (
						<View key={uri} style={styles.photoBox}>
							{/* 実際の画像を表示 */}
							<Image
								source={{ uri }}
								style={styles.photo}
								resizeMode="cover"
							/>
						</View>
					))}
				</View>

				{/* カメラ */}
				<TouchableOpacity
					style={styles.photoButton}
					onPress={handlePickPhotoFromCamera}
				>
					<Text style={styles.photoButtonText}>カメラで撮影</Text>
				</TouchableOpacity>

				{/* ライブラリ */}
				<TouchableOpacity
					style={styles.photoButton}
					onPress={handlePickPhotoFromLibrary}
				>
					<Text style={styles.photoButtonText}>
						ライブラリから選択
					</Text>
				</TouchableOpacity>

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
	photoContainer: {
		flexDirection: "row",
		marginBottom: 8,
		flexWrap: "wrap", // 複数行に折り返し
	},
	photoBox: {
		width: 80,
		height: 80,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 8,
		marginBottom: 8,
		borderRadius: 4,
		overflow: "hidden",
	},
	photo: {
		width: "100%",
		height: "100%",
	},
	photoButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	photoButtonText: {
		color: "#fff",
	},
});
