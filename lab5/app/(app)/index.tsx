import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { ProductCard } from '../../components/ProductCard';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function CatalogScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Вийти</Text>
            </TouchableOpacity>
          )
        }} 
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <Pressable>
              <ProductCard product={item} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  listContainer: {
    padding: 16,
  },
  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  }
});
