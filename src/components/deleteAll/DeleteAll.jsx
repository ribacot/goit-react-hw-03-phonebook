import PropTypes from 'prop-types';
import css from './DeleteAll.module.css';

export default function DeleteAll({ onDeleteAllContact, checkedEl, onChange }) {
  return (
    <div className={css.del_all_section}>
      {checkedEl && (
        <button
          className={css.btn_del_all}
          type="button"
          onClick={onDeleteAllContact}
        >
          Del All
        </button>
      )}
      <label>
        <input type="checkbox" checked={checkedEl} onChange={onChange} />
        &nbsp; Delete All?
      </label>
    </div>
  );
}

DeleteAll.propTypes = {
  onDeleteAllContact: PropTypes.func.isRequired,
  checkedEl: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
