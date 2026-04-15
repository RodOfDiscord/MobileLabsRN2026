import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = React.forwardRef<View, ProductCardProps>(
  ({ product }, ref) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <View
        ref={ref}
        style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}
      >
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text
            style={[styles.name, isDark && styles.textDark]}
            numberOfLines={1}
          >
            {product.name}
          </Text>
          <Text style={styles.price}>{product.price} ₴</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardLight: {
    backgroundColor: "#ffffff",
  },
  cardDark: {
    backgroundColor: "#1E1E1E",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  textDark: {
    color: "#ffffff",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF", // Vibrant accent color
  },
});
