import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiXSquare } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import DeleteAll from 'components/deleteAll/DeleteAll';
import css from './ContactsList.module.css';

export default class ContactsList extends Component {
  state = {
    checked: false,
  };

  onChecked = e => {
    this.setState({ checked: e.target.checked });
  };

  render() {
    return (
      <>
        <DeleteAll
          onDeleteAllContact={this.props.onDeleteAllContact}
          checkedEl={this.state.checked}
          onChange={this.onChecked}
        />
        <ul className={css.listContacts}>
          {this.props.contacts.map(({ name, id, number }) => (
            <li key={id} className={css.contact}>
              {name}:
              <span className={css.contact_tel}>
                {number}
                <button
                  className={css.btn_del}
                  type="button"
                  disabled={this.state.checked}
                  onClick={() => this.props.onDeleteContact(id)}
                >
                  <IconContext.Provider value={{ size: '1.2em' }}>
                    <FiXSquare />
                  </IconContext.Provider>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string).isRequired)
    .isRequired,
  onDeleteAllContact: PropTypes.func.isRequired,
};
