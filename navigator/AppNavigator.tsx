import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "../screens/Products";
import UserProfile from "../screens/UserProfile";
import { AuthStackParamList } from "./AuthNavigator";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/AuthStore";
import UpdateDetails from "@/screens/UpdateDetails";

const Stack = createStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="userProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="updateDetails"
        component={UpdateDetails}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="products"
        component={Products}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
