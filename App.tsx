import "./global.css";

import { SafeAreaView, StatusBar } from "react-native";
import Navigator from "./navigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Navigator />
      </SafeAreaView>
    </PaperProvider>
  );
}
