import "react-native-reanimated";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FirstScreen from "@/screens/FirstScreen";
import HowToUseScreen from "@/screens/HowToUseScreen";
import TermsOfUseScreen from "@/screens/TermsOfUseScreen";
import PrivacyPolicyScreen from "@/screens/PrivacyPolicyScreen";
import HomeScreen from "@/screens/HomeScreen";
import PetInfoScreen from "@/screens/PetInfoScreen";
import PetInfoScreen2 from "@/screens/PetInfoScreen2";
import PetInfoScreen3 from "@/screens/PetInfoScreen3";
import PetInfoScreen4 from "@/screens/PetInfoScreen4";
import PetInfoScreen5 from "@/screens/PetInfoScreen5";
import PetInfoScreen6 from "@/screens/PetInfoScreen6";
import SubscriptionScreen from "@/screens/SubscriptionScreen";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import NotificationsScreen from "@/screens/NotificationsScreen";
import FAQScreen from "@/screens/FAQScreen";
import ContactScreen from "@/screens/ContactScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigationで管理する画面をまとめたコンポーネント
function DrawerScreens() {
	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			screenOptions={{
				drawerStyle: {
					width: "80%",
				},
			}}
		>
			<Drawer.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ title: "ホーム" }}
			/>
			<Drawer.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{ title: "お知らせ" }}
			/>
			<Drawer.Screen
				name="FAQ"
				component={FAQScreen}
				options={{ title: "よくある質問" }}
			/>
			<Drawer.Screen
				name="HowToUseFromDrawer"
				component={HowToUseScreen}
				options={{ title: "アプリの使い方" }}
			/>
			<Drawer.Screen
				name="Contact"
				component={ContactScreen}
				options={{ title: "お問い合わせ" }}
			/>
			<Drawer.Screen
				name="TermsFromDrawer"
				component={TermsOfUseScreen}
				options={{ title: "利用規約" }}
			/>
			<Drawer.Screen
				name="PrivacyPolicyFromDrawer"
				component={PrivacyPolicyScreen}
				options={{ title: "プライバシーポリシー" }}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="First">
				<Stack.Screen
					name="DrawerScreens"
					component={DrawerScreens}
					options={{ headerShown: false }}
				/>
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
						title: "狂犬病予防接種証明書登録",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="PetInfo4"
					component={PetInfoScreen4}
					options={{
						title: "混合ワクチン接種証明書登録",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="PetInfo5"
					component={PetInfoScreen5}
					options={{
						title: "ペット同伴誓約書",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="PetInfo6"
					component={PetInfoScreen6}
					options={{
						title: "登録完了",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="Subscription"
					component={SubscriptionScreen}
					options={{
						title: "サブスクリプション登録",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="First"
					component={FirstScreen}
					options={{
						title: "PawTicketへようこそ",
					}}
				/>
				<Stack.Screen
					name="HowToUse"
					component={HowToUseScreen}
					options={{
						title: "このアプリの使い方",
						headerBackTitle: "戻る",
					}}
				/>
				<Stack.Screen
					name="TermsOfUse"
					component={TermsOfUseScreen}
					options={{
						title: "利用規約",
					}}
				/>
				<Stack.Screen
					name="PrivacyPolicy"
					component={PrivacyPolicyScreen}
					options={{
						title: "プライバシーポリシー",
						headerLeft: () => null,
						gestureEnabled: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
