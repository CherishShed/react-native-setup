import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView className="flex-1">
      <CustomKeyBoardAvoider>
        <View className="py-10 w-full px-4 gap-y-5 items-center">
          <Image
            source={require("../assets/shopLogo.jpg")}
            className="h-[250px] w-[300px] rounded-2xl"
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
          <View className="min-w-full gap-y-5 mb-12">
            <TextInput
              placeholder="Enter your email"
              textContentType="emailAddress"
              keyboardType="email-address"
              className="border min-w-full [h-40px] p-4  border-gray-400 rounded-lg focus:border-black"
            />

            <TextInput
              placeholder="Enter your password"
              keyboardType="visible-password"
              secureTextEntry={!showPassword}
              className="border min-w-full h-[40px] border-gray-400 p-4 rounded-lg focus:border-black"
            />
            <Pressable className="bg-black rounded-lg min-w-full p-4 ">
              <Text className="text-white text-center">Login</Text>
            </Pressable>
          </View>
          <View className="flex flex-row w-full justify-between">
            <Link
              href="ForgotPassword"
              action={{ target: "ForgotPassword", type: "Navigate" }}
            >
              <Text className="text-black">Forgot Password</Text>
            </Link>
            <Link href="Signup" action={{ target: "Signup", type: "Navigate" }}>
              <Text className="text-black">Signup</Text>
            </Link>
          </View>
        </View>
      </CustomKeyBoardAvoider>
    </SafeAreaView>
  );
};

export default Login;
