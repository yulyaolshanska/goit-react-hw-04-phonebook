import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name}, is already in contacts.`);
    }
    const contact = { id: nanoid(), name, number };

    setContacts(prevState => [contact, ...prevState]);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} />
      <ContactList
        contacts={contacts}
        // contacts={filter === '' ? contacts : filteredContacts}
        // deleteContact={deleteContact}
      />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (savedContacts) {
//       this.setState({
//         contacts: savedContacts,
//       });
//     }
//   }

// componentDidUpdate(prevProps, prevState) {
//   if (prevProps.contacts !== this.state.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// addContact = ({ name, number }) => {
//   const { contacts } = this.state;
//   if (contacts.some(contact => contact.name === name)) {
//     alert(`${name}, is already in contacts.`);
//   } else {
//     const contact = { id: nanoid(), name, number };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   }
// };

//   deleteContact = todoId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== todoId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({
//       filter: e.target.value,
//     });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLocaleLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = this.getFilteredContacts(contacts);

//     return (
//       <div className={css.container}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2 className={css.title}>Contacts</h2>
//         <Filter filter={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={filter === '' ? contacts : filteredContacts}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
