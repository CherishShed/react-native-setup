import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "../screens/Products";

const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="products"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="products"
        component={Products}
        options={{ title: "Product List" }}
      />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
