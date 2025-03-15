import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";

// チェックボックスのための型定義
type Agreement = {
	accident: boolean;
	vaccination: boolean;
	dogrun: boolean;
	cleanup: boolean;
	rules: boolean;
	leash: boolean;
	restricted: boolean;
	cooperation: boolean;
};

export default function PetInfoScreen4() {
	const navigation = useNavigation();

	// 誓約書の同意状態を管理
	const [agreements, setAgreements] = useState<Agreement>({
		accident: false,
		vaccination: false,
		dogrun: false,
		cleanup: false,
		rules: false,
		leash: false,
		restricted: false,
		cooperation: false,
	});

	// 署名情報の状態管理
	const [signature, setSignature] = useState({
		year: "",
		month: "",
		day: "",
		name: "",
		phone: "",
		petType: "",
		companions: "",
	});

	// 送信処理
	const onSubmit = () => {
		// すべてのチェックボックスが選択されているか確認
		const allChecked = Object.values(agreements).every((value) => value);
		// 必須項目が入力されているか確認
		const allFieldsFilled = Object.values(signature).every(
			(value) => value !== ""
		);

		if (!allChecked || !allFieldsFilled) {
			Alert.alert("エラー", "すべての項目を入力・確認してください");
			return;
		}

		// 次の画面へ遷移
		navigation.navigate("PetInfo6" as never);
	};

	return (
		<>
			<ScrollView style={styles.scrollView}>
				<View style={styles.container}>
					<Text style={styles.title}>ペット同伴誓約書</Text>
					<Text style={styles.subtitle}>
						私は、ペットを同伴して入園するにあたり、次のことを遵守することを誓約いたします。
					</Text>

					<View style={styles.checkboxContainer}>
						<CheckBox
							title="ペットに関する事故やトラブルは、飼い主の自己責任として全て解決します。"
							checked={agreements.accident}
							onPress={() =>
								setAgreements({
									...agreements,
									accident: !agreements.accident,
								})
							}
						/>
						<CheckBox
							title="1年以内に感染症等の予防接種を受けています。"
							checked={agreements.vaccination}
							onPress={() =>
								setAgreements({
									...agreements,
									vaccination: !agreements.vaccination,
								})
							}
						/>
						<CheckBox
							title="ドッグランを利用する場合、狂犬病予防注射済票と三種以上の混合ワクチン接種証明書を提示することを了承します。"
							checked={agreements.dogrun}
							onPress={() =>
								setAgreements({
									...agreements,
									dogrun: !agreements.dogrun,
								})
							}
						/>
						<CheckBox
							title="ペットのうんちはお持ち帰りください。"
							checked={agreements.cleanup}
							onPress={() =>
								setAgreements({
									...agreements,
									cleanup: !agreements.cleanup,
								})
							}
						/>
						<CheckBox
							title="ドッグランのルール、係員の指示に従います。"
							checked={agreements.rules}
							onPress={() =>
								setAgreements({
									...agreements,
									rules: !agreements.rules,
								})
							}
						/>
						<CheckBox
							title="ドッグラン以外では絶対にノーリードにしません。"
							checked={agreements.leash}
							onPress={() =>
								setAgreements({
									...agreements,
									leash: !agreements.leash,
								})
							}
						/>
						<CheckBox
							title="指定された進入禁止区域には、ペットを入れません。"
							checked={agreements.restricted}
							onPress={() =>
								setAgreements({
									...agreements,
									restricted: !agreements.restricted,
								})
							}
						/>
						<CheckBox
							title="ペットのルール、マナー向上に協力します。"
							checked={agreements.cooperation}
							onPress={() =>
								setAgreements({
									...agreements,
									cooperation: !agreements.cooperation,
								})
							}
						/>
					</View>

					<Text style={styles.warningText}>
						上記のルールを守っていただけない場合はご利用をお断りし、退園していただきます。
					</Text>

					<View style={styles.signatureArea}>
						<View style={styles.dateInput}>
							<Text>ご記入日　令和</Text>
							<TextInput
								style={styles.yearInput}
								value={signature.year}
								onChangeText={(text) =>
									setSignature({ ...signature, year: text })
								}
								keyboardType="number-pad"
								maxLength={2}
							/>
							<Text>年</Text>
							<TextInput
								style={styles.monthInput}
								value={signature.month}
								onChangeText={(text) =>
									setSignature({ ...signature, month: text })
								}
								keyboardType="number-pad"
								maxLength={2}
							/>
							<Text>月</Text>
							<TextInput
								style={styles.dayInput}
								value={signature.day}
								onChangeText={(text) =>
									setSignature({ ...signature, day: text })
								}
								keyboardType="number-pad"
								maxLength={2}
							/>
							<Text>日</Text>
						</View>

						<View style={styles.inputGroup}>
							<Text>氏名（飼い主）</Text>
							<TextInput
								style={styles.textInput}
								value={signature.name}
								onChangeText={(text) =>
									setSignature({ ...signature, name: text })
								}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text>連絡先（TEL）</Text>
							<TextInput
								style={styles.textInput}
								value={signature.phone}
								onChangeText={(text) =>
									setSignature({ ...signature, phone: text })
								}
								keyboardType="phone-pad"
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text>ペットの種類（犬種等）</Text>
							<TextInput
								style={styles.textInput}
								value={signature.petType}
								onChangeText={(text) =>
									setSignature({
										...signature,
										petType: text,
									})
								}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text>同伴者</Text>
							<TextInput
								style={styles.textInput}
								value={signature.companions}
								onChangeText={(text) =>
									setSignature({
										...signature,
										companions: text,
									})
								}
								keyboardType="number-pad"
							/>
							<Text>名</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<View>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={onSubmit}
					activeOpacity={0.7}
				>
					<Text style={styles.registerButtonText}>同意して登録</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	container: {
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 24,
		textAlign: "center",
		paddingHorizontal: 16,
	},
	checkboxContainer: {
		marginBottom: 24,
	},
	warningText: {
		color: "red",
		marginBottom: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	signatureArea: {
		marginBottom: 24,
	},
	dateInput: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	yearInput: {
		borderBottomWidth: 1,
		width: 40,
		textAlign: "center",
		marginHorizontal: 8,
	},
	monthInput: {
		borderBottomWidth: 1,
		width: 40,
		textAlign: "center",
		marginHorizontal: 8,
	},
	dayInput: {
		borderBottomWidth: 1,
		width: 40,
		textAlign: "center",
		marginHorizontal: 8,
	},
	inputGroup: {
		marginBottom: 16,
	},
	textInput: {
		borderBottomWidth: 1,
		padding: 8,
		marginTop: 8,
	},
	registerButton: {
		backgroundColor: "#007bff",
		borderRadius: 4,
		padding: 15,
		alignItems: "center",
		marginBottom: 20,
	},
	registerButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
