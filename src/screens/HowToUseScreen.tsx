import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// ページ情報の配列
const pages = [
	{
		id: "intro",
		image: require("../../assets/images/dog1.png"),
		text: "この画面では、アプリの使い方を説明します。\nまずは基本の操作をご確認ください。",
	},
	{
		id: "features",
		image: require("../../assets/images/dog2.png"),
		text: "次に、各機能の詳細な説明を行います。\nスワイプして次のページへ進んでください。",
	},
	{
		id: "certificate",
		image: require("../../assets/images/dog3.png"),
		text: "最後に、証明書の登録方法をご案内します。\n「次へ」ボタンを押して開始してください。",
	},
];

export default function HowToUseScreen() {
	const navigation = useNavigation();
	const [currentPage, setCurrentPage] = useState(0);

	// ページ切替時に現在のページを更新
	const handleMomentumScrollEnd = (e: any) => {
		const offsetX = e.nativeEvent.contentOffset.x;
		const pageIndex = Math.round(offsetX / width);
		setCurrentPage(pageIndex);
	};

	// 「次へ」ボタン押下時の処理（例：次画面へ遷移）
	const handleNext = () => {
		navigation.navigate("TermsOfUse" as never);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={handleMomentumScrollEnd}
			>
				{pages.map((page) => (
					<View key={`page-${page.id}`} style={styles.page}>
						<Image
							source={page.image}
							style={styles.image}
							resizeMode="contain"
						/>
						<Text style={styles.text}>{page.text}</Text>
						{page.id === "certificate" && (
							<TouchableOpacity
								style={styles.nextButton}
								onPress={handleNext}
							>
								<Text style={styles.nextButtonText}>次へ</Text>
							</TouchableOpacity>
						)}
					</View>
				))}
			</ScrollView>
			<View style={styles.dotsContainer}>
				{pages.map((page) => (
					<View
						key={`dot-${page.id}`}
						style={[
							styles.dot,
							pages.findIndex((p) => p.id === page.id) ===
								currentPage && styles.activeDot,
						]}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	page: {
		width: width,
		alignItems: "center",
		padding: 20,
	},
	image: {
		width: width * 0.8,
		height: 200,
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	nextButton: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 4,
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	dotsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#ccc",
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: "#007bff",
	},
});
