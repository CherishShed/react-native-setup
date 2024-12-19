import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfile from "../screens/UserProfile";
import AppNavigator from "./AppNavigator";
import ProfileNavigator from "./ProfileNavigator";
import ProductNavigator from "./ProductNavigator";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddProductNavigator from "./AddProductNavigator";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export type TabScreens = {
  homeNavigator: undefined;
};
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#999999",
        tabBarInactiveBackgroundColor: "black",
        tabBarActiveBackgroundColor: "black",
        animation: "shift",
        tabBarPosition: "bottom",
      }}
    >
      <Tab.Screen
        name="profileNavigator"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
        component={ProfileNavigator}
      />
      <Tab.Screen
        name="productNavigator"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-shopping-cart"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
        component={ProductNavigator}
      />
      <Tab.Screen
        name="AddProductNavigator"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="cart-plus"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
        component={AddProductNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
