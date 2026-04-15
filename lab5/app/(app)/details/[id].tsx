import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { products } from '../../../data/products';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Товар не знайдено</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Повернутися до каталогу</Text>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price} ₴</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionTitle}>Опис</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingBottom: 40,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB'
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
});
