import React, { Children, FC, ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const CustomKeyBoardAvoider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center"
      keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyBoardAvoider;
