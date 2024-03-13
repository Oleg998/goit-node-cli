import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
const contactsPath = path.resolve("db", "contacts.json");

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactByID = async (id) => {
  const allContacts = await getAllContacts();
  const result = allContacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contact = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

export const deleteContactById = async (id) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};