import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function PetInfoScreen() {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<CustomButton
				title="愛犬情報、証明書の新規登録"
				color="blue"
				onPress={() => navigation.navigate("NewPetInfo" as never)}
			/>
			<CustomButton
				title="登録済みの証明書の更新、または愛犬情報の変更"
				color="blue"
				onPress={() => console.log("Pressed Green")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		gap: 100,
		justifyContent: "center",
	} as ViewStyle,
});
