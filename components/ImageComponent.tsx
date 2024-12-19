import { View, Text, Pressable, Button, Image } from "react-native";
import React, { useState } from "react";
import { Menu } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

const ImageComponent = ({
  item,
  id,
  handleDelete,
}: {
  item: string;
  id: number;
  handleDelete: (index: number) => void;
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <Pressable onLongPress={() => console.log(item)} onPress={openMenu}>
        <Image
          source={{ uri: item }}
          className="h-[50px] w-[50px] rounded-lg"
        />
      </Pressable>
      <View
        style={{
          paddingTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} title="" />}
        >
          <Pressable
            className="p-2 flex-row gap-x-1"
            onPress={() => {
              handleDelete(id);
            }}
          >
            <AntDesign name="delete" size={16} color="red" />
            <Text className="text-sm text-red-500">Delete</Text>
          </Pressable>
        </Menu>
      </View>
    </>
  );
};

export default ImageComponent;
