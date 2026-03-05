import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { News } from '../../entities/news/types';
import { NewsCard } from '../../entities/news/ui/NewsCard';
import { useNews } from '../../entities/news/useNews';
interface Props {
  onPressItem: (news: News) => void; 
}
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Новини</Text>
  </View>
);

const Footer = ({ loading }: { loading: boolean }) => (
  <View style={styles.footer}>
    {loading && <ActivityIndicator />}
  </View>
);

const Separator = () => <View style={styles.separator} />;

export const NewsList = ({ onPressItem }: Props) => {
  const { news, refresh, loadMore, refreshing, loadingMore } = useNews();

  return (
    <FlatList<News>
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NewsCard news={item} onPress={onPressItem} />}

      ListHeaderComponent={<Header />}
      ListFooterComponent={<Footer loading={loadingMore} />}
      ItemSeparatorComponent={Separator}

      refreshing={refreshing}
      onRefresh={refresh}

      onEndReached={loadMore}
      onEndReachedThreshold={0.5}

      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  header: { padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  footer: { padding: 16, alignItems: 'center' },
  separator: { height: 1, backgroundColor: '#E5E5E5', marginHorizontal: 16 },
});