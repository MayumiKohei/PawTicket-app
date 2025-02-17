import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = Readonly<{
	title?: string;
	onPressLeft?: () => void;
	onPressRight?: () => void;
}>;

// 左アイコン (bars) を返すコンポーネント
export function HeaderLeftButton({ onPressLeft }: Props) {
	return (
		<TouchableOpacity onPress={onPressLeft}>
			<FontAwesome6 name="bars" size={24} color="#333" />
		</TouchableOpacity>
	);
}

export function HeaderRightButton({ onPressRight }: Props) {
	return (
		<TouchableOpacity onPress={onPressRight}>
			<FontAwesome5 name="address-card" size={24} color="#333" />
		</TouchableOpacity>
	);
}

export function createHeaderOptions({
	title,
	onPressLeft,
	onPressRight,
}: Props) {
	return {
		headerTitle: { title },
		headerLeft: () => <HeaderLeftButton onPressLeft={onPressLeft} />,
		headerRight: () => <HeaderRightButton onPressRight={onPressRight} />,
	};
}
