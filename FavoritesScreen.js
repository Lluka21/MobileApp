
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useFavoritesContext } from "../context/FavoritesContext";
import localimages from "../localimages";

const FavoritesScreen = () => {

    // Destructuring cont
  const { favoriteItems } = useFavoritesContext();
  
  
  
  const renderFavoriteItem = ({ item }) => {
    const specialSource = localimages[item.image] || { uri: item.image };

    return (
      <View style={styles.card}>
        <Image source={specialSource} style={styles.productImage} />
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>{item.price}</Text>
      </View>
    );
  };

  if (favoriteItems.length !== 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.favoriteText}>Favorites</Text>
        <FlatList
          data={favoriteItems}
          renderItem={renderFavoriteItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} 
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.centeredView}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>No Favorites</Text>
      </View>
    );
  }
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
    marginTop: 20,
  },
  card: {
    alignItems: "center",
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
