import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomKeyBoardAvoider from "../components/CustomKeyBoardAvoider";
import { formatReadableDate } from "../utils/dateFunctions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ProductCategory } from "../types/types";
import { SelectList } from "react-native-dropdown-select-list";
import { ActivityIndicator, Divider, Menu } from "react-native-paper";
import ImageUpload from "@/components/ImageUpload";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageComponent from "@/components/ImageComponent";
import useApi from "@/hooks/useApi";
import { CREATEPRODUCT } from "@/api/products/CreateProduct";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { DELETEIMAGE } from "@/api/products/DeleteImages";

const AddProduct = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //   const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [purchased, setPurhased] = useState(new Date(Date.now()).toISOString());
  const [category, setCategory] = useState<ProductCategory>("Books");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const PRESETKEY = "xsvheurd";
  const CLOUDINARYNAME = "da32ht6du";
  const [imageUrls, setImageUrls] = useState<
    { url: string; public_id: string; signature: string }[]
  >([]);
  const { callApi } = useApi();
  // const [submitting, setSubmitting] = useState(false);
  const clearData = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setPurhased(new Date(Date.now()).toISOString());
    setCategory("Books");
    setImageUrls([]);
    setPreviews([]);
  };
  const categories = [
    "Electronics",
    "Fashion",
    "Fitness",
    "HomeKitchen",
    "Books",
    "ToysGames",
    "BeautyPersonalCare",
    "SportsOutdoors",
    "Automotive",
    "ToolsHomeImprovement",
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setPurhased(date.toISOString());
    hideDatePicker();
  };
  const handleAddImage = (
    data: { url: string; public_id: string; signature: string }[]
  ) => {
    setImageUrls([...imageUrls, ...data]);
  };
  const handleAddFile = (file: string) => {
    setPreviews([...previews, file]);
    previews.push(file);
  };

  const createProduct = async () => {
    setLoading(true);
    const { data, error } = await callApi(CREATEPRODUCT, {
      name,
      price,
      description,
      purchased,
      category,
      images: imageUrls.map((img) => img.url),
      thumbnail: imageUrls[0].url,
    });
    if (data) {
      showMessage({ message: data.message, type: "success", animated: true });
      clearData();
    } else {
      if (error)
        showMessage({ message: error.message, animated: true, type: "danger" });
    }
    setLoading(false);
  };
  const handleDeleteImage = async (index: number) => {
    setImageUrls(imageUrls.filter(({}, imgIndex) => imgIndex !== index));
    setPreviews(previews.filter(({}, imgIndex) => imgIndex !== index));
    const { data, error } = await callApi(
      DELETEIMAGE,
      imageUrls[index].public_id
    );
    if (data) {
      console.log(data);
      showMessage({ message: data.message, type: "success" });
    }
    if (error) {
      console.log(error);
      showMessage({ message: (error as any).message, type: "danger" });
    }
  };
  return (
    <CustomKeyBoardAvoider>
      <View
        className="w-full px-4 gap-y-5 flex-1 justify-center"
        style={{ flex: 1 }}
      >
        <View className="flex-row gap-3">
          <ImageUpload
            handleAddFile={handleAddFile}
            handleAddImage={handleAddImage}
          />
          <FlatList
            data={previews}
            contentContainerClassName=""
            renderItem={({ item, index }) => (
              <ImageComponent
                id={index}
                item={item}
                handleDelete={handleDeleteImage}
              />
            )}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View className="w-1"></View>}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="gap-y-3">
          <TextInput
            placeholder="Product name"
            className="border w-full p-2 h-[40px] rounded-lg"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="Price"
            keyboardType="number-pad"
            className="border w-full p-2 h-[40px] rounded-lg"
            onChangeText={(text) => setPrice(parseInt(text))}
            value={price.toString()}
          />
          <View className="flex-row items-center gap-x-3">
            <Text>Purchased</Text>
            <TextInput
              className="w-[100px] h-[40px] p-2 bg-gray-100 rounded-lg"
              onPress={showDatePicker}
            >
              {formatReadableDate(purchased)}
            </TextInput>
          </View>

          <SelectList
            setSelected={(val: ProductCategory) => setCategory(val)}
            data={categories}
            placeholder="Select Category"
            save="value"
            search={false}
          />

          <TextInput
            placeholder="Description"
            className="border w-full p-2 rounded-lg"
            multiline
            numberOfLines={5}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <Pressable
            className="bg-black p-4 w-full rounded-lg"
            onPress={() => {
              createProduct();
            }}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text className="text-white text-center">Submit</Text>
            )}
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </CustomKeyBoardAvoider>
  );
};

export default AddProduct;
