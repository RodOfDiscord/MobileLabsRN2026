import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import GameCardItem from '../components/GameCardItem/GameCardItem';
import { useGames } from '../hooks/useGames';
import { View } from 'react-native';

export default function GamesList() {
  const games = useGames();

  if (!games || games.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No games found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCardItem game={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f15',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f15',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});
