import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import galleryImages from '../assets/gallery-images';


const images = Object.values(galleryImages);
const numColumns = 2;
const imageSize = Dimensions.get('window').width / numColumns;

export default function GamesGallery() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    padding: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});