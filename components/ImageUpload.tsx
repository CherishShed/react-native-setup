import React from "react";

import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import axios from "axios";
import { AdvancedImage, upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [res, setRes] = useState("");
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

  const hadnleFileChange = async () => {
    try {
      console.log("trying");
      await requestMediaLibraryPermissionsAsync();
      let result = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
        base64: true,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        setStatus("uploading");
        setRes(result.assets[0].uri!);

        await upload(cld, {
          file: asset.uri,
          options: {
            upload_preset: PRESETKEY,
            unsigned: true,
          },
          callback: (error, response) => {
            if (error) {
              Alert.alert("status", error.message);
              setProgress(0);
              setStatus("error");
            }
            if (response) {
              setStatus("done");
              console.log(response);
              setRes(response.secure_url);
              console.log("succesful");
              Alert.alert("status", "Upload succesful");
              setProgress(0);
              return;
            }
          },
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("status", "Upload failed");
      setProgress(0);
      setStatus("error");
    }
  };
  return (
    <View>
      <Text>ImageUpload</Text>
      <Image
        source={{ uri: res }}
        style={{ height: 200, width: 200 }}
        width={200}
        height={200}
      />

      <Button title="Upload image" onPress={hadnleFileChange} />
      <Text>Progress: {progress}%</Text>
    </View>
  );
};

export default ImageUpload;
