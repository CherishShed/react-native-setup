import { View, Text, PushNotification, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Profile } from "../types/types";
import { GetUser } from "../api/user/GetUserDetails";
import { showMessage } from "react-native-flash-message";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { getAuthState, updateAuthState } from "../store/AuthStore";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import {
  ActivityIndicator,
  Avatar,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const UserProfile = () => {
  const [details, setDetails] = useState<Profile | null>(null);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const { loggedIn, profile } = useSelector(getAuthState);
  const { callApi } = useApi();
  const { SignOut, GetLoggedInUser } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(loggedIn);

    const getDetails = async () => {
      setLoading(true);
      const { data, error } = await GetLoggedInUser();

      if (data) {
        setDetails(data.user);
      } else {
        console.log(error);
        if (error)
          showMessage({
            message: error.message,
            animated: true,
            type: "danger",
          });
      }
      setLoading(false);
    };
    getDetails();
  }, []);
  const logout = async () => {
    const { data, error } = await SignOut();
    console.log("in here");
    if (data) {
      showMessage({ message: data.message, animated: true, type: "success" });
      dispatch(updateAuthState({ loggedIn: false, profile: null }));
    } else {
      console.log(error);
      if (error)
        showMessage({
          message: error.message,
          animated: true,
          type: "danger",
        });
    }
  };
  return (
    <View className="flex-1 p-5 gap-y-5">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator className="self-center" color="skyblue" />
        </View>
      ) : (
        <>
          {details && (
            <>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-x-3">
                  <Avatar.Image
                    source={require("../assets/avatar.jpg")}
                    size={100}
                  ></Avatar.Image>
                  <View>
                    <Text className="font-semibold text-lg">
                      {details?.first_name} {details?.last_name}
                    </Text>
                    <Text className="font-medium text-lg">
                      {details?.username}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
          <Divider className="w-1/2 self-center border border-gray-300" />
          <View className="gap-y-3">
            <TouchableRipple
              className="text-center p-3 !rounded-2xl border transition-all border-transparent focus:border active:border-gray-300 flex-row gap-2 items-center"
              android_ripple={{ color: "rgba(0, 0, 0, .1)" }}
              onPress={() => {
                console.log("messages");
              }}
              underlayColor="rgba(0, 0, 0, .1)"
            >
              <>
                <AntDesign name="message1" size={24} color="black" />
                <Text className="text-black text-lg">Messages</Text>
              </>
            </TouchableRipple>
            <TouchableRipple
              className="text-center p-3 !rounded-2xl border transition-all border-transparent focus:border active:border-gray-300 flex-row gap-2 items-center"
              android_ripple={{ color: "rgba(0, 0, 0, .1)" }}
              onPress={() => {
                console.log("messages");
              }}
              underlayColor="rgba(0, 0, 0, .1)"
            >
              <>
                <Feather name="grid" size={24} color="black" />
                <Text className="text-black text-lg">Your listings</Text>
              </>
            </TouchableRipple>
            <TouchableRipple
              className="text-center p-3 !rounded-2xl border transition-all border-transparent focus:border active:border-gray-300 flex-row gap-2 items-center"
              android_ripple={{ color: "rgba(0, 0, 0, .1)" }}
              onPress={() => {
                logout();
              }}
              underlayColor="rgba(0, 0, 0, .1)"
            >
              <>
                <AntDesign name="logout" size={24} color="black" />
                <Text className="text-black text-lg">Log out</Text>
              </>
            </TouchableRipple>
          </View>
        </>
      )}
    </View>
  );
};

export default UserProfile;
