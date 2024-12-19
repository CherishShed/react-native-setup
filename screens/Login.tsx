import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { LOGIN } from "../api/auth/authentication";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";
import { updateAuthState } from "../store/AuthStore";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { SignIn } = useAuth();
  const signin = async () => {
    setLoading(true);
    console.log("subinggg");

    const { data, error } = await SignIn(username, password);
    if (data) {
      dispatch(updateAuthState({ loggedIn: true, profile: data.user }));
      await AsyncStorage.setItem("loggedIn", `${true}`);
      if (!data.user.first_name) {
        navigate("updateDetails");
      } else {
        navigate("userProfile");
      }
    } else {
      console.log(error);
      if (error)
        showMessage({ message: error.message, animated: true, type: "danger" });
    }
    setLoading(false);
  };

  return (
    <CustomKeyBoardAvoider>
      <View className="py-10 w-full px-4 gap-y-5 ">
        <Image
          source={require("../assets/shopLogo.jpg")}
          className="h-[250px] w-[300px] rounded-2xl self-center"
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
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text className="text-white text-center">Login</Text>
            )}
          </Pressable>
        </View>
        <View className="flex flex-row w-full justify-between">
          <Pressable
            onPress={() => {
              dispatch(updateAuthState({ loggedIn: true, profile: null }));
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
