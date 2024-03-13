import {listContacts,getContactById,addContact,removeContact} from "./contacts.js"

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactsById=await getContactById(id);
      console.log(contactsById);
      break;

    case "add":
      const addNewContact= await addContact({name, email, phone})
      console.log(addNewContact)
      break;

    case "remove":
      const deleteContact =await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
