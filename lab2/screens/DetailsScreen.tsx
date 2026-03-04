import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NewsStackParams } from '../App';

type Route = RouteProp<NewsStackParams, 'Details'>;

export const DetailsScreen = () => {
  const { params: { news } } = useRoute<Route>();

  return (
    <ScrollView>
      <Image source={{ uri: news.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: 220 },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  description: { fontSize: 15, color: '#6B6B6B', lineHeight: 22 },
});