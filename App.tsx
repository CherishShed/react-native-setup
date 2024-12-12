import "./global.css";

import { SafeAreaView, StatusBar } from "react-native";
import Navigator from "./navigator";

export default function App() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Navigator />
    </SafeAreaView>
  );
}
