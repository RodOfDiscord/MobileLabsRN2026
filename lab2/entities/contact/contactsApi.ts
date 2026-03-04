import { Contact } from './types';
import { contactsMock } from './contactsMock';

export const fetchContactsList = async (): Promise<Contact[]> => {
  return Promise.resolve(contactsMock);
};