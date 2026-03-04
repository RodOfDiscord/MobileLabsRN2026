// widgets/drawer-menu/ui/CustomDrawer.tsx

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => (
  <View style={styles.container}>

    {/* Профіль */}
    <View style={styles.profile}>
      <Image
        source={{ uri: 'https://robohash.org/democat?set=set4' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Іван Іваненко</Text>
      <Text style={styles.group}>Група: КН-21</Text>
    </View>

    {/* Меню */}
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Новини')}
      >
        <Text style={styles.menuIcon}>📰</Text>
        <Text style={styles.menuLabel}>Новини</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Контакти')}
      >
        <Text style={styles.menuIcon}>👥</Text>
        <Text style={styles.menuLabel}>Контакти</Text>
      </TouchableOpacity>
    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  profile: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  group: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  menu: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 10,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});