import { View, Text, Image, StyleSheet } from 'react-native';
import { Contact } from '../types';

interface Props {
  contact: Contact;
}

export const ContactItem = ({ contact }: Props) => (
  <View style={styles.container}>
    <Image source={{ uri: contact.avatar }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{contact.firstName} {contact.lastName}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});