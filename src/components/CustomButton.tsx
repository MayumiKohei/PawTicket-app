import { StyleSheet, TouchableOpacity, Text, ViewStyle } from "react-native";

type ButtonProps = Readonly<{
	/** ボタンに表示するテキスト */
	title: string;
	/** full = 横幅100%, half = 横幅50% */
	size?: "full" | "half";
	/** ボタンの背景色 red / blue / green */
	color?: "red" | "blue" | "green";
	/** ボタンが押された時の処理 */
	onPress: () => void;
}>;

export default function CustomButton({
	title,
	size = "full",
	color = "blue",
	onPress,
}: ButtonProps) {
	// スタイルをまとめて生成
	// 1) ベースのスタイルをコピー
	// 2) propsに応じてサイズ/カラーを上書きしていく
	const buttonStyle: ViewStyle = {
		...styles.baseButton,
		width: size === "full" ? "100%" : "50%",
		backgroundColor: getColorValue(color),
	};

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

// props.color に応じて実際の色値を返す関数
function getColorValue(color: "red" | "blue" | "green"): string {
	switch (color) {
		case "red":
			return "#f44336"; // 好みの赤色を指定
		case "blue":
			return "#2196f3"; // 好みの青色
		case "green":
			return "#4caf50"; // 好みの緑色
		default:
			return "#2196f3";
	}
}

const styles = StyleSheet.create({
	baseButton: {
		padding: 12,
		borderRadius: 8,
		// 必要に応じて影や枠線を追加
		// iOS: shadowOffset, shadowOpacity, shadowRadius
		// Android: elevation
	},
	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "600",
		fontSize: 16,
	},
});
