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
					======================================= プライバシーポリシー
					=======================================
					最終更新日：YYYY年MM月DD日 【第1条（基本方針）】
					Warea株式会社（以下「当社」といいます）は、本アプリ「パウチケ」の利用に際し、利用者のプライバシー保護に最大限配慮します。本プライバシーポリシー（以下「本ポリシー」といいます）は、本アプリの利用において、当社が取得する情報の種類、利用目的、管理方法等について定めたものです。
					【第2条（取得する情報）】 1. 犬情報 -
					利用者が登録する犬の名前、年齢、性別、犬種、ワクチン接種情報等。
					2. ワクチン接種証明書等の情報 -
					狂犬病、混合ワクチン接種証明書、ペット同伴同意書等の画像データ。
					3. 利用者情報（任意） -
					メールアドレス、お問い合わせフォームに入力される氏名・電話番号等（利用者が任意で登録する場合）。
					【第3条（情報の利用目的）】
					当社は、取得した情報を以下の目的で利用します。 1.
					本アプリの機能提供：犬情報や証明書データの管理、ドッグラン施設への入場要件の提示。
					2.
					本アプリの品質向上、不具合対応、サポートのための情報管理。
					3.
					利用者への重要なお知らせ（規約変更、システム更新等）の通知。
					【第4条（第三者提供）】 1.
					当社は、法令に基づく場合や利用者の同意がある場合を除き、取得した情報を第三者に提供いたしません。
					2.
					ドッグラン施設への提示は、利用者自身が本アプリ画面を提示する行為であり、当社が情報を直接提供するものではありません。
					【第5条（情報の管理）】 1.
					当社は、取得した情報の漏えい、改ざん、紛失を防止するため、適切な管理措置を講じます。
					2.
					利用者が登録情報の開示、訂正、削除を希望する場合、当社は合理的な範囲で速やかに対応いたします。
					【第6条（クッキー等の利用）】 1.
					本アプリでは、利便性向上のためクッキーや類似の技術を利用する場合があります。
					2.
					利用者がこれらの技術の利用を無効化することは可能ですが、その場合、本アプリの一部機能が利用できなくなる場合があります。
					【第7条（プライバシーポリシーの変更）】 1.
					当社は、法令改正やサービス内容の変更等により、本ポリシーを予告なく変更することがあります。
					2.
					変更後の本ポリシーは、本アプリまたは当社ウェブサイトに掲載された時点から効力を生じます。利用者は本アプリの継続利用により、変更内容に同意したものとみなされます。
					【第8条（お問い合わせ）】
					本ポリシーに関するご質問や、登録情報の開示・訂正・削除等のご依頼は、下記の窓口までご連絡ください。
					Warea株式会社 Eメール：info@warea.club
					=======================================
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
		paddingBottom: 16,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	text: {
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
