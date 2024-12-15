import { View, Text, Image, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/Navigator";
import { LOGIN } from "../api/auth/authentication";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    console.log("subinggg");

    const { data, error } = await LOGIN(username, password);
    if (data) {
      if (!data.user.first_name) {
        navigate("updateDetails");
      } else {
        navigate("products");
      }
    } else {
      console.log(error);
      if (error) Alert.alert(error.message);
    }
  };
  return (
    <CustomKeyBoardAvoider>
      <View className="py-10 w-full px-4 gap-y-5 ">
        <Image
          source={require("../assets/shopLogo.jpg")}
          className="h-[250px] w-[300px] rounded-2xl"
        />
        <View>
          <Text className="font-semibold text-2xl tracking-wider text-center">
            Online Marketplace for Used Goods
          </Text>
          <Text className="font-semibold text-sm text-center">
            Buy or sell used goods with trust, Chat directly with sellers,
            ensure a seamless, authentic experience
          </Text>
        </View>
        <View className="min-w-full gap-y-5 mb-12">
          <TextInput
            placeholder="Enter your username"
            textContentType="username"
            keyboardType="name-phone-pad"
            onChangeText={(t) => {
              setUsername(t);
            }}
            className="border min-w-full [h-40px] p-4  border-gray-400 rounded-lg focus:border-black"
          />

          <TextInput
            placeholder="Enter your password"
            keyboardType="visible-password"
            secureTextEntry={!showPassword}
            onChangeText={(t) => {
              setPassword(t);
            }}
            className="border min-w-full h-[40px] border-gray-400 p-4 rounded-lg focus:border-black"
          />
          <Pressable
            className="bg-black rounded-lg min-w-full p-4 "
            onPress={() => {
              signin();
            }}
          >
            <Text className="text-white text-center">Login</Text>
          </Pressable>
        </View>
        <View className="flex flex-row w-full justify-between">
          <Pressable
            onPress={() => {
              navigate("products");
            }}
            className="text-sm"
          >
            <Text>Forgot Password</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate("signup");
            }}
            className="text-sm"
          >
            <Text>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyBoardAvoider>
  );
};

export default Login;
