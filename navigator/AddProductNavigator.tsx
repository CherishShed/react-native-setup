import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddProduct from "../screens/AddProduct";

const Stack = createStackNavigator();

const AddProductNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="addProduct"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="addProduct"
        component={AddProduct}
        options={{ title: "Product List" }}
      />
    </Stack.Navigator>
  );
};

export default AddProductNavigator;
