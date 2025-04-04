import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useCartContext } from "../context/CartContext";
import React from "react";
import localimages from "../localimages";
import Icon from "react-native-vector-icons/Ionicons";



const CartScreen = () => {
  const { cartItems, removeFromCart } = useCartContext();

  const renderCartItem = ({ item }) => {
    const imageSource = localimages[item.image] || { uri: item.image };

    return (
      <View style={styles.card}>
        <View>
          <Image source={imageSource} style={styles.productImage} />
        </View>

        <Text style={{ fontWeight: "bold", marginTop: 10 }}>{item.name}</Text>
        <Text>{item.description}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            {item.price}
          </Text>

          <Icon
            name="remove"
            size={25}
            color="white"
            backgroundColor="red"
            style={{ borderRadius: 20, marginTop: 8 }}
            onPress={() => removeFromCart(item)}
          />
        </View>
        <Text>Quantity: {item.quantity}</Text>
      </View>
    );
  };


  // 
  if (cartItems.length !== 0) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 30,
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Cart
        </Text>

            // List for cart Items
          <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
        />
        <Pressable
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 50,
            backgroundColor: "#238b45",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            Buy
          </Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Cart is Empty
        </Text>
      </View>
    );
  }
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 80,
    flex: 1,
  },
  favoriteText: {
    marginTop: 80,
    marginBottom: 60,
    fontSize: 20,
    fontWeight: "bold",
  },
  productImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "45%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
