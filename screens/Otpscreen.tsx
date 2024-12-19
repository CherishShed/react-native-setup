import {
  View,
  Text,
  Alert,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { OtpInput } from "react-native-otp-entry";
import { ResendOtp, VerifyOtp } from "../api/verification/OtpVerification";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";
import { Snackbar } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

const Otpscreen = () => {
  const [otp, setOtp] = useState("");
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  const handleSubmit = async () => {
    setLoading(true);
    const { data, error } = await VerifyOtp(otp);
    if (data) {
      showMessage({
        message: data.message,
        animated: true,
        type: "success",
      });
      navigate("updateDetails");
    } else {
      console.log(error);
      if (error)
        showMessage({ message: error.message, animated: true, type: "danger" });
    }
    setLoading(false);
  };
  const handleRequestOtp = async () => {
    const { data, error } = await ResendOtp();
    if (data) {
      setVisible({ show: true, message: data.message });
    } else {
      console.log(error);
      if (error) setVisible({ show: true, message: error.message });
    }
  };
  return (
    <CustomKeyBoardAvoider>
      <View className="flex-1 items-center">
        <View className="gap-y-11 p-8">
          <Image
            source={require("../assets/shopLogo.jpg")}
            className="h-[250px] w-[300px] rounded-2xl self-center"
          />
          <View className="gap-y-4">
            <OtpInput
              numberOfDigits={6}
              onTextChange={(text) => setOtp(text)}
            />
            <Pressable
              className="bg-black rounded-lg min-w-full p-4 "
              onPress={() => {
                handleSubmit();
              }}
            >
              {loading ? (
                <ActivityIndicator animating={true} color={"white"} />
              ) : (
                <Text className="text-white text-center">Verify</Text>
              )}
            </Pressable>
          </View>
          <Pressable
            disabled={isDisabled}
            onPress={() => {
              setTimer(60);
              setIsDisabled(true);
              handleRequestOtp();
            }}
          >
            <Text className={`${isDisabled ? "text-gray-400" : "text-black"}`}>
              {isDisabled ? `Request OTP in (${timer}s)` : "Resend OTP"}
            </Text>
          </Pressable>
        </View>
        <Snackbar
          visible={visible.show}
          onDismiss={() => setVisible({ show: false, message: "" })}
          className="!bg-black !text-white"
          action={{
            label: "Close",
            labelStyle: { color: "white" },
            onPress: () => {
              // Do something
            },
          }}
        >
          {visible.message}
        </Snackbar>
      </View>
    </CustomKeyBoardAvoider>
  );
};

export default Otpscreen;
