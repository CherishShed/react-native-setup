import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { apiCaller } from "../lib/axios";
import { GETALLPRODUCTS } from "../api/products/GetAllProducts";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/Navigator";
import { Snackbar } from "react-native-paper";

const Products = () => {
  const [products, setProducts] = useState<string[]>([]);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [visible, setVisible] = useState({ show: false, message: "" });
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await GETALLPRODUCTS();
      if (data) {
        const res = data.data.products;
        const names = res.map((product: any) => product.name);
        setProducts(names);
      } else {
        console.log(error);
        // if (error) Alert.alert(error.message);
        setVisible({ show: true, message: error.message });
        if (error.status == 401) {
          navigate("login");
        }
      }
    };
    fetchProducts();
  }, []);
  return (
    <View className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
        ListEmptyComponent={() => <Text>No Items Found</Text>}
      />
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
  );
};

export default Products;
