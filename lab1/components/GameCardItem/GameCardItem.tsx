import { Image, StyleSheet, Text, View } from "react-native";
import { GameCardItemProps } from "./types";

function GameCardItem({ game }: GameCardItemProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{game.title}</Text>

        <Text style={styles.cardText}> {game.platform}</Text>
        <Text style={styles.cardText}> {game.genre}</Text>

        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{game.rating}/10</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e2e",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 140,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardText: {
    color: "#a0a0a0",
    fontSize: 14,
    marginBottom: 3,
  },
  ratingBadge: {
    backgroundColor: "#6c5ce7",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default GameCardItem;
