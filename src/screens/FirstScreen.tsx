import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FirstScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/images/first_dog.png")}
				style={styles.image}
				resizeMode="contain"
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("HowToUse" as never)}
			>
				<Text style={styles.buttonText}>初めてご利用の方</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.secondaryButton]}
				onPress={() => {
					// こちらは将来的にアカウントサインイン画面などに遷移させる想定です
					navigation.navigate("SignInScreen" as never);
				}}
			>
				<Text style={styles.buttonText}>アカウントをお持ちの方</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	image: {
		width: 300,
		height: 200,
		marginBottom: 40,
	},
	button: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 4,
		marginBottom: 16,
		width: "80%",
		alignItems: "center",
	},
	secondaryButton: {
		backgroundColor: "#28a745",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
