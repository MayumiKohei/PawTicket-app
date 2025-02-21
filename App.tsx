import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import PetInfoScreen from "@/screens/PetInfoScreen";
import PetInfoScreen2 from "@/screens/PetInfoScreen2";
import PetInfoScreen3 from "@/screens/PetInfoScreen3";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="PetInfo"
					component={PetInfoScreen}
					options={{
						title: "ワクチン証明書の登録",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="PetInfo2"
					component={PetInfoScreen2}
					options={{
						title: "愛犬情報 新規登録",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="PetInfo3"
					component={PetInfoScreen3}
					options={{
						title: "ワクチン接種証明書登録",
						headerBackTitle: "戻る",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
