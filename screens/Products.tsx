import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { GETALLPRODUCTS } from "../api/products/GetAllProducts";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { showMessage } from "react-native-flash-message";
import { updateAuthState } from "../store/AuthStore";
import { useDispatch } from "react-redux";
import useApi from "../hooks/useApi";
import { ActivityIndicator } from "react-native-paper";

const Products = () => {
  const [products, setProducts] = useState<string[]>([]);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const { callApi } = useApi();
  const [fetching, setFetching] = useState(true);
  const fetchProducts = async () => {
    setFetching(true);
    const { data, error } = await callApi(GETALLPRODUCTS);
    if (data) {
      const res = data.products;
      const names = res.map((product: any) => product.name);
      setProducts(names);
    } else {
      console.log(error);
      if (error)
        showMessage({
          message: error.message,
          animated: true,
          type: "danger",
        });
    }
    setFetching(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View className="flex-1">
      {fetching ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating={fetching} color={"black"} />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
          ListEmptyComponent={() => <Text>No Items Found</Text>}
          refreshing={fetching}
          onRefresh={fetchProducts}
        />
      )}
    </View>
  );
};

export default Products;
