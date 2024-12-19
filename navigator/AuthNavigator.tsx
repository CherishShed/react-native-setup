import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import UpdateDetails from "../screens/UpdateDetails";
import Otpscreen from "../screens/Otpscreen";

export type AuthStackParamList = {
  login: undefined;
  signup: undefined;
  products: undefined;
  updateDetails: undefined;
  otpScreen: undefined;
  userProfile: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={Login} options={{ title: "" }} />
      <Stack.Screen name="signup" component={Signup} options={{ title: "" }} />

      <Stack.Screen
        name="otpScreen"
        component={Otpscreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
