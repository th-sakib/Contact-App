import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import Modal from "./Components/Modal";

import { useState, useEffect } from "react";
import { db } from "./config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import useDisclosure from "./hooks/useDisclosure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contact");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);

          return contactsList;
        });
      } catch (e) {
        console.log(e);
      }
    };

    getContacts();
  }, []);

  const filteredData = (e) => {
      const value = e.target.value;
      const contactsRef = collection(db, "contact");

      onSnapshot(contactsRef, (snapshot) => {
        const contactsList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredDataList = contactsList.filter(contact => {
          return contact.name.toLowerCase().includes(value.toLowerCase());
        })
        setContacts(filteredDataList);

        return filteredDataList
      });
  }


  return (
    <div className="max-w-[360px] mx-auto relative">
      <Navbar filteredData={filteredData} isOpen={isOpen} onOpen={onOpen}></Navbar>
      <div>
        {contacts.map((contact) => (
          <Contact contact={contact} key={contact.id}></Contact>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose}></Modal>
      <ToastContainer position="bottom-center" theme="dark" closeOnClick />
    </div>
  );
}

export default App;