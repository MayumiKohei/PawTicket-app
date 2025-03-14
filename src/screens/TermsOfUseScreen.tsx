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
					======================================= 利用規約
					=======================================
					最終更新日：YYYY年MM月DD日 【第1条（目的）】
					本利用規約（以下「本規約」といいます）は、Warea株式会社（以下「当社」といいます）が提供するスマートフォンアプリ「パウチケ」（以下「本アプリ」といいます）の利用条件を定めるものです。本アプリをご利用いただく前に、本規約の内容を十分にご確認いただき、同意された場合にのみご利用ください。
					【第2条（定義）】 1.
					「利用者」とは、本アプリをインストールし、利用する個人または法人をいいます。
					2.
					「ドッグラン施設」とは、本アプリを通じ、国公立公園のドッグランに入場する際に提示する狂犬病・混合ワクチン接種証明書およびペット同伴同意書等を指します。
					3.
					「犬情報」とは、利用者が本アプリに登録する犬の名前、年齢、性別、犬種、ワクチン接種情報などの情報をいいます。
					【第3条（本アプリの概要）】 1.
					本アプリは、利用者が犬情報やワクチン接種証明書、ペット同伴同意書等を登録し、これらの情報をドッグラン施設の入場要件として提示するためのものです。
					2.
					当社は、本アプリを通じて提供される情報の正確性、最新性、有用性について保証いたしません。利用者は、登録する情報の正確性を自己の責任において管理してください。
					【第4条（利用条件）】 1.
					利用者は、本アプリを合法的な目的で利用し、著作権法その他関連法令を遵守するものとします。
					2.
					犬情報やワクチン接種証明書等の登録内容が虚偽または不正確な場合、ドッグラン施設の入場が拒否される可能性があります。
					3.
					当社は、本アプリの利用に関連して発生する利用者間、または利用者とドッグラン施設との間のトラブルや損害について、一切の責任を負いません。
					【第5条（知的財産権）】 1.
					本アプリおよびその関連ソフトウェア、デザイン、コンテンツに関する著作権、商標権その他一切の知的財産権は当社または正当な権利者に帰属します。
					2.
					利用者は、本アプリの利用目的以外での複製、転用、販売、出版などの行為を行ってはなりません。
					【第6条（禁止事項）】
					利用者は、本アプリの利用に際して、以下の行為を行ってはなりません。
					1. 虚偽の情報を登録する行為 2.
					犬情報や証明書の不正な取得、改ざん、複製 3.
					当社または第三者の権利（著作権、商標権、プライバシー権等）を侵害する行為
					4. 法令または公序良俗に反する行為 5.
					その他、当社が不適切と判断する行為
					【第7条（保証および免責事項）】 1.
					当社は、本アプリが通常の利用条件下で正常に動作することを前提として提供しておりますが、明示的な保証は限定的なものです。
					2.
					本アプリの利用に起因する直接的または間接的な損害（例：データの損失、第三者とのトラブル等）について、当社は一切責任を負いません（法令により認められる範囲を除く）。
					【第8条（利用停止・変更・終了）】 1.
					利用者が本規約に違反した場合、当社は事前通知なく本アプリの利用を停止または制限することができます。
					2.
					当社は、利用者への事前通知により、本アプリの内容を変更または提供を終了する権利を有します。
					【第9条（規約の変更）】 1.
					当社は、本規約の内容を必要に応じて変更することがあります。変更後の規約は、当社ウェブサイトまたは本アプリ上に掲載された時点から効力を生じます。
					2.
					利用者が本アプリを継続利用した場合、変更後の規約に同意したものとみなします。
					【第10条（準拠法および管轄）】 1.
					本規約の解釈および適用は日本法に準拠します。 2.
					本アプリの利用に関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
					=======================================
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
