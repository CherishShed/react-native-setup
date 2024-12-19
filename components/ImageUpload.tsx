import React from "react";

import { Alert, Button, Pressable, Text, View } from "react-native";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import axios from "axios";
import { AdvancedImage, upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { showMessage } from "react-native-flash-message";
import { ProgressBar } from "react-native-paper";
import useApi from "@/hooks/useApi";
import { UPLOADIMAGE } from "@/api/products/UploadImages";

const ImageUpload = ({
  handleAddImage,
  handleAddFile,
}: {
  handleAddImage: (
    data: {
      url: string;
      public_id: string;
      signature: string;
    }[]
  ) => void;
  handleAddFile: (file: string) => void;
}) => {
  const [progress, setProgress] = useState(false);
  const [status, setStatus] = useState("");
  const PRESETKEY = "xsvheurd";
  const CLOUDINARYNAME = "da32ht6du";
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARYNAME,
    },
    url: {
      secure: true,
    },
  });
  const FormData = global.FormData;
  const { callApi } = useApi();

  const hadnleFileChange = async () => {
    try {
      console.log("trying");

      await requestMediaLibraryPermissionsAsync();
      let result = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
        aspect: [1, 1],
        base64: true,
        selectionLimit: 4,
      });
      if (!result.canceled) {
        setProgress(true);
        const assets = result.assets;
        setStatus("Uploading");

        const modifiedAsset = [];
        for (const asset of assets) {
          handleAddFile(asset.uri);
          const uri = asset.uri;
          const type = asset.type;
          const name = asset.fileName;
          const source = {
            uri,
            type,
            name,
          };
          modifiedAsset.push(source);
        }
        const res = await cloudinaryUpload(modifiedAsset);
        if (res) {
          setProgress(false);
          handleAddImage(res);
        }
      }
    } catch (error) {
      console.log(error);
      showMessage({ message: "Upload failed", type: "danger" });
      setProgress(false);
      setStatus("error");
    }
  };
  const cloudinaryUpload = async (photoList: any[]) => {
    const myData: FormData | undefined = new FormData();
    for (const photo of photoList) {
      console.log("running for ", photo);
      myData.append("images", photo);
    }
    const { data, error } = await callApi(UPLOADIMAGE, myData);
    if (data) {
      console.log(data);
      setStatus("Upload Complete");
      showMessage({ message: data.message, type: "success" });

      return data.imageData;
    } else {
      if (error) {
        showMessage({ message: error.message, type: "danger" });
      }
    }
  };
  return (
    <View className="justify-center">
      <View className="gap-y-1">
        <Pressable
          className="border w-[50px] h-[50px] rounded-lg items-center self justify-center p-2"
          onPress={hadnleFileChange}
        >
          <FontAwesome5 name="images" size={30} color="black" />
        </Pressable>
        <Text className="text-xs">Add Images</Text>
        <Text
          className={`${
            progress ? "text-orange-300" : "text-green-400"
          } text-xs`}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default ImageUpload;
