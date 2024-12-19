import "./global.css";

import { SafeAreaView, StatusBar } from "react-native";
import Navigator from "./navigator";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";

export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<ActivityIndicator animating={true} color={"red"} />}
        persistor={store.PersistedStore}
      >
        <PaperProvider>
          <SafeAreaView
            className="flex-1"
            style={{
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <FlashMessage position={"bottom"} />
            <Navigator />
          </SafeAreaView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
