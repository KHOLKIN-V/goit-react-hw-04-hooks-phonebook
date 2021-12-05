import { useState } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './components/AddContactForm/AddContactForm'
import Filter from './components/Filter/Filter'
import ContactBook from './components/ContactBook/ContactBook';

export default function App() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

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

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//   }

//   formSubmit = (data) => {

//     const searchContact = this.state.contacts.map(e => e.name).includes(data.name);


//     if (searchContact) {
//       alert(`${data.name} is already in contacts`);
//     } else {
//       const newContact = {
//         ...data, id: nanoid(),
//       };
//       this.setState(old => ({
//         contacts: old.contacts.concat(newContact),
//       }))
//     }

//   };

//   filterContacts = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(i =>
//       i.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

// reshapeFilter = (e) => {
//     this.setState({ filter: e });
//   };

//   deleteContact = (deleteId) => {
//     this.setState(old => ({
//       contacts: old.contacts.filter(e => e.id !== deleteId),
//     }));
//   }
  
//   render() {
//     const filtered = this.filterContacts();

//     return (
//       <>
//       <AddContactForm submit={this.formSubmit} />
//       <Filter value={this.state.filter} onFilter={this.reshapeFilter}/>
//       {filtered.length >= 0 ? 
//           <ContactBook data={filtered} onDelete={this.deleteContact}/>
//          : <ContactBook data={this.state.contacts} onDelete={this.deleteContact}/>
//       }
//       </>
//     );
//   }
// }

// export default App;