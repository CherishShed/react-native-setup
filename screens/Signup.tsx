import { View, Text, Image, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Link, NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { SIGNUP } from "../api/auth/authentication";
import { ActivityIndicator } from "react-native-paper";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";
import { showMessage } from "react-native-flash-message";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { SignUp: register } = useAuth();
  const signUp = async () => {
    setLoading(true);
    const { data, error } = await register(username, password);
    if (data) {
      showMessage({ message: data.message, animated: true, type: "success" });
      navigate("otpScreen");
    } else {
      console.log(error);
      if (error)
        showMessage({ message: error.message, animated: true, type: "danger" });
    }
    setLoading(false);
  };
  return (
    <CustomKeyBoardAvoider>
      <View className="py-10 w-full px-4 gap-y-5 items-center">
        <Image
          source={require("../assets/shopLogo.jpg")}
          className="h-[250px] w-[300px] rounded-2xl self-center"
        />
        <View>
          <Text className="font-semibold text-2xl tracking-wider text-center">
            Online MarketPlace for Used Goods
          </Text>
          <Text className="font-semibold text-sm text-center">
            Buy or sell used goods with trust, Chat directly with sellers,
            ensure a seamless, authentic experience
          </Text>
        </View>
        <View className="min-w-full p-4 gap-y-5 mb-12">
          <TextInput
            placeholder="Enter your username"
            textContentType="username"
            onChangeText={(t) => {
              setUsername(t);
            }}
            keyboardType="name-phone-pad"
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
              signUp();
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text className="text-white text-center">Sign up</Text>
            )}
          </Pressable>
        </View>
        <View className="flex flex-row w-full justify-between">
          <Link
            href="ForgotPassword"
            action={{ target: "ForgotPassword", type: "Navigate" }}
          >
            <Text className="text-black">Forgot Password</Text>
          </Link>
          <Pressable
            onPress={() => {
              navigate("login");
            }}
            className="text-sm"
          >
            <Text>Log in</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyBoardAvoider>
  );
};

export default Signup;
