// screens/ContactsScreen.tsx

import { SectionList, View, Text, StyleSheet } from 'react-native';
import { contactsMock } from '../entities/contact/contactsMock';
import { ContactItem } from '../entities/contact/ui/ContactItem';
import { Contact } from '../entities/contact/types';

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const Separator = () => <View style={styles.separator} />;

export const ContactsScreen = () => (
  <SectionList<Contact>
    sections={contactsMock as any}
    keyExtractor={(item: Contact) => item.id}
    renderItem={({ item }) => <ContactItem contact={item} />}
    renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
    ItemSeparatorComponent={Separator}
  />
);

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B6B6B',
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 72
  },
});