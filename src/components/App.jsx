import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './container/Container';
import FormPhone from './form/FormPhone';
import {ContactsList} from './contacts_list/ContactsList';
import Search from './search/Search';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};
const contactsLs = "contacts";
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount(_, prevState) {
    const contacts = JSON.parse(localStorage.getItem(contactsLs)) || [];
    this.setState({ contacts });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length)
      console.log('upd');
    localStorage.setItem(contactsLs, JSON.stringify(this.state.contacts));
  }

  hendleSubmit = ({ name, number }) => {
    this.setState(precState => {
      return {
        ...INITIAL_STATE,
        contacts: [
          ...precState.contacts,
          {
            name,
            number,
            id: nanoid(),
          },
        ],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  hendleSearch = e => {
    const { value } = e.target;
    this.setState({ filter: value.toLowerCase().trim() });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  DeleteAllContact = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    console.log('re-render');
    return (
      <>
        <Container title="Phone book">
          <FormPhone
            onSubmit={this.hendleSubmit}
            contacts={this.state.contacts}
          />
        </Container>
        <Container title="Contacts">
          {this.state.contacts.length ? (
            <>
              <Search
                onClick={this.hendleSearch}
                searchName={this.state.filter}
              />
              {this.getFilteredContacts().length ? (
                <ContactsList
                  contacts={this.getFilteredContacts()}
                  onDeleteContact={this.deleteContact}
                  onDeleteAllContact={this.DeleteAllContact}
                ></ContactsList>
              ) : (
                <p className="not_found">Not found contacts</p>
              )}
            </>
          ) : (
            <p className="not_found">Phone book is empty</p>
          )}
        </Container>
      </>
    );
  }
}
