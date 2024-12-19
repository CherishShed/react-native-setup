import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../screens/UserProfile";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="userProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
