import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import {
	DrawerContentScrollView,
	DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { FontAwesome6 } from "@expo/vector-icons";

const menuItems = [
	{ name: "ホーム", screen: "HomeScreen", icon: "home" },
	{ name: "お知らせ", screen: "Notifications", icon: "bell" },
	{ name: "よくある質問", screen: "FAQ", icon: "question-circle" },
	{ name: "アプリの使い方", screen: "HowToUseFromDrawer", icon: "book" },
	{ name: "お問い合わせ", screen: "Contact", icon: "envelope" },
	{ name: "利用規約", screen: "TermsFromDrawer", icon: "file-contract" },
	{
		name: "プライバシーポリシー",
		screen: "PrivacyPolicyFromDrawer",
		icon: "shield-halved",
	},
];

export function CustomDrawerContent(
	props: Readonly<DrawerContentComponentProps>
) {
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerContainer}>
				<ScrollView style={styles.menuContainer}>
					{menuItems.map((item) => (
						<TouchableOpacity
							key={item.screen}
							style={styles.menuItem}
							onPress={() =>
								props.navigation.navigate(item.screen)
							}
						>
							<FontAwesome6
								name={item.icon as any}
								size={20}
								color="#333"
							/>
							<Text style={styles.menuText}>{item.name}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
				<View style={styles.versionContainer}>
					<Text style={styles.versionText}>バージョン 1.0.0</Text>
				</View>
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	drawerContainer: {
		flex: 1,
		paddingTop: 20,
	},
	menuContainer: {
		flex: 1,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	menuText: {
		marginLeft: 16,
		fontSize: 16,
		color: "#333",
	},
	versionContainer: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#eee",
		marginTop: "auto",
	},
	versionText: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
	},
});
