import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import coffeeData from "../data/data.json";
import coffeeIcon from "../assets/images/coffee-icon.png";
import localimages from "../localimages";
import specialData from "../data/special.json";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useCartContext } from "../context/

  


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Cappuccino");
  const { addToCart } = useCartContext();
  const { favoriteItems, toggleFavorite } = useFavoritesContext();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const renderItem = ({ item }) => {
    const imageSource = localimages[item.image] || { uri: item.image };

<!

    
      
    return (
      <View style={styles.productCard}>
        <Image source={imageSource} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon
              name="add"
              size={25}
              color="white"
              backgroundColor="green"
              style={{ borderRadius: 50 }}
              onPress={() => addToCart(item)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };




  const renderSpecialItem = ({ item }) => {
    const isFavorited = favoriteItems.some((fav) => fav.id === item.id);
    const specialSource = localimages[item.image] || { uri: item.image };

    return (
      <View style={styles.productCard}>
        <Image source={specialSource} style={styles.productImage} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={25}
            color={isFavorited ? "red" : "green"}
            onPress={() => toggleFavorite(item)}
          />
        </View>

        <Text style={styles.productDescription}>{item.description}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon
              name="add"
              size={25}
              color="white"
              backgroundColor="green"
              style={{ borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const categoryItems = coffeeData.Categories[selectedCategory] || [items//];
  const specialItems = specialData.specialCategories.Special;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            source={require("../assets/images/user.png")}
            style={{ width: 20, height: 20, marginBottom: 10 }}
          />
        </View>
        <View style={styles.location}>
          <Icon name="location" size={20} color="#238b45" />
          <Text>Tbilisi, Georgia</Text>
        </View>
        <Icon
          name="notifications"
          size={20}
          color="#238b45"
          onPress={() => alert("No Recent Notifications!")}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon name="search" size={20} color="#238b45" style={styles.icon} />
        <TextInput placeholder="Search Coffee..." style={styles.input} />
      </View>
      <Text style={styles.categoryTitle}>Categories</Text>

      
      <FlatList
        data={Object.keys(coffeeData.Categories)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && { backgroundColor: "#238b45" },
            ]}
            onPress={() => handleCategorySelect(item)}
          >
            <View style={styles.categoryContent}>
              <Image source={coffeeIcon} style={styles.categoryIcon} />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && { color: "white" },
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
  
      <FlatList
        
        data={categoryItems}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
      />
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 17,
          fontWeight: "bold",
          marginLeft: 30,
        }}
      >
        Special Offer
      </Text>
      {/* Flatlist for special offr */}

      <FlatList
       
        data={specialItems || []}
        horizontal
        renderItem={renderSpecialItem}
        keyExtractor={(item, index) =>
          item && index !== undefined ? index.toString() : "defaultKey"
        }
        showsHorizontalScrollIndicator={false}
      />
      {/* Flatlist for special offers end h*/}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 100,
    marginLeft: 20,
    marginTop: 70,
  },
  location: {
    flexDirection: "row",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dddddd",
    borderRadius: 60,
    width: 350,
    alignSelf: "center",
    marginTop: 30,
    paddingHorizontal: 15,
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  categoryTitle: {
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 20,
    fontWeight: "800",
    fontSize: 17,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 20,
    marginBottom: 30,
    minWidth: 120,
    borderRadius: 30,
    elevation: 20,
    backgroundColor: "#FFF",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#238b45",
  },
  product: {
    marginBottom: 20,
    marginLeft: 30,
  },
  productImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#888",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCard: {
    backgroundColor: "white",
    marginLeft: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 7,
    marginBottom: 15,
    width: 180,
    height: 240,
  },
});
