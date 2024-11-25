import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen component={Settings} name="settings" />
        <Drawer.Screen component={Dashboard} name="dashboard" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
