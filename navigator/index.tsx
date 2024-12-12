import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./Navigator";

const Navigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      primary: "skyblue",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
