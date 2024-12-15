import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";
import { AuthStackParamList } from "../navigator/Navigator";
import { UpdateUserDetails } from "../api/user/UpdateUserDetails";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatReadableDate } from "../utils/dateFunctions";

const UpdateDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDOB(date.toISOString());
    hideDatePicker();
  };

  const handleUpdate = async () => {
    setLoading(true);

    const { data, error } = await UpdateUserDetails(
      firstName,
      lastName,
      date_of_birth
    );
    if (data) {
      navigate("products");
    } else {
      console.log(error);
      if (error) Alert.alert(error.message);
    }
    setLoading(false);
  };
  return (
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
        <View className="min-w-full p-4 gap-y-5 mb-12">
          <TextInput
            placeholder="First name"
            textContentType="name"
            onChangeText={(t) => {
              setFirstName(t);
            }}
            keyboardType="default"
            className="border min-w-full [h-40px] p-4  border-gray-400 rounded-lg focus:border-black"
          />

          <TextInput
            placeholder="Last name"
            textContentType="name"
            keyboardType="default"
            onChangeText={(t) => {
              setLastName(t);
            }}
            className="border [h-40px] min-w-full max-w-[50%] p-4  border-gray-400 rounded-lg focus:border-black"
          />
          <TextInput
            placeholder="Date of birth"
            textContentType="birthdateDay"
            keyboardType="default"
            value={formatReadableDate(date_of_birth)}
            onPress={() => {
              showDatePicker();
            }}
            className="border [h-40px] min-w-full max-w-[50%] p-4  border-gray-400 rounded-lg focus:border-black"
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Pressable
            className="bg-black rounded-lg min-w-full p-4 "
            onPress={() => {
              handleUpdate();
            }}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text className="text-white text-center">Save</Text>
            )}
          </Pressable>
        </View>
      </View>
    </CustomKeyBoardAvoider>
  );
};

export default UpdateDetails;
