import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './components/AddContactForm/AddContactForm'
import Filter from './components/Filter/Filter'
import ContactBook from './components/ContactBook/ContactBook';

export default function App() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
      const parsContacts = JSON.parse(localStorage.getItem("contacts"));
      if (parsContacts) {
        setContacts(parsContacts);
      }
    }, []);

    useEffect(() => {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const formSubmit = (data) => {

        const searchContact = contacts.some((e) => e.name.includes(data.name));
    
        if (searchContact) {
          alert(`${data.name} is already in contacts`);
        } else {
          const newContact = {
            ...data, id: nanoid(),
          };
          setContacts(old => [...old, newContact]);
        }
    };
    
    const filterContacts = () => {
        return contacts.filter(i =>
            i.name.toLowerCase().includes(filter.toLowerCase())
        );
    };
    
    const reshapeFilter = (e) => {
        setFilter(e);
    };
    
    const deleteContact = (deleteId) => {
        setContacts(old => 
          old.filter(e => e.id !== deleteId),
        );
    }
    const filtered = filterContacts();

    return (
        <>
        <AddContactForm submit={formSubmit} />
        <Filter value={filter} onFilter={reshapeFilter}/>
        {filtered.length >= 0 ? 
            <ContactBook data={filtered} onDelete={deleteContact}/>
           : <ContactBook data={contacts} onDelete={deleteContact}/>
        }
        </>
      );
}