import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name}, is already in contacts.`);
      return;
    }
    const contact = { id: nanoid(), name, number };

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = todoId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== todoId)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={filter === '' ? contacts : getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}
