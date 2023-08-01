import PropTypes from 'prop-types';
import css from './Search.module.css';

export default function Search({ onClick, searchName }) {
  return (
    <div className={css.decor_search}>
      <label className={css.lable} htmlFor="search">
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        id="search"
        name="name"
        onChange={onClick}
        value={searchName}
      />
    </div>
  );
}

Search.protoTypes = {
  onClick: PropTypes.func.isRequired,
  searchName: PropTypes.string,
};
