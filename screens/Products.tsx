import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { apiCaller } from "../lib/axios";

const Products = () => {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("in hereee");
      const response = await apiCaller.get("products/");
      console.log(response);
      if (response.status > 199 && response.status < 300) {
        const res = await response.data.products;
        const names = res.map((product: any) => product.name);
        setProducts(names);
      }
    };
    fetchProducts();
  }, []);
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
        ListEmptyComponent={() => <Text>No Items Found</Text>}
      />
    </View>
  );
};

export default Products;
