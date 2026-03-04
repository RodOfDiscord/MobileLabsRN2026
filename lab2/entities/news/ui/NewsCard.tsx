import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { News } from '../types';

interface Props {
  news: News;
  onPress?: (news: News) => void;
}

export const NewsCard = ({ news, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress?.(news)}>
    <Image source={{ uri: news.image }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
      <Text style={styles.description} numberOfLines={3}>{news.description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  description: {
    fontSize: 13,
    color: '#6B6B6B',
    lineHeight: 18,
  },
});