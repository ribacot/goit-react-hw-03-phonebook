import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './FormFone.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};
export default class FormPhone extends Component {
  state = { ...INITIAL_STATE };

  hendleChange = e => {
    const { name, value } = e.target;
    !this.props.contacts.find(
      ({ name }) =>
        name.toLocaleLowerCase() === value.toLocaleLowerCase().trim()
    )
      ? this.setState({
          [name]: value.trim(),
        })
      : alert(` ${value} is already in contavts`);
  };

  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
   
    // const validName = "^[a-zA-Zа-яА-Я\]+(([' \\-\][a-zA-Zа-яА-Я \])?[a-zA-Zа-яА-Я\]*)*$";
    // const validPhone = "\\+?\\d{1,4}?[ .\\-\\s\]?\\(?\\d{1,3}?\\)?[ .\\-\\s\]?\\d{1,4}[ .\\-\\s\]?\\d{1,4}[ .\\-\\s\]?\\d{1,9}";

    return (
      <form className={css.form_Add_Contact} onSubmit={this.formSubmit}>
        <div className={css.decor_input}>
          <label className={css.lable} htmlFor="name">
            Name
          </label>
          <input
            className={css.input}
            id="name"
            type="text"
            name="name"
            // pattern={validName}
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.hendleChange}
            value={this.state.name}
          />
        </div>
        <div className={css.decor_input}>
          <label className={css.lable} htmlFor="number">
            Number
          </label>
          <input
            className={css.input}
            id="number"
            type="tel"
            name="number"
            // pattern={validPhone}
            // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.hendleChange}
            value={this.state.number}
          />
        </div>
        <button
          className={css.btn_add}
          type="submit"
          disabled={!this.state.name || !this.state.number}
        >
          Add contact
        </button>
      </form>
    );
  }
}

FormPhone.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
