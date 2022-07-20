import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export const ContactItem = ({ name, number, deleteContact }) => {
  return (
    <li className={css.contactItem}>
      <p>{name}</p>
      <p>{number}</p>

      <button className={css.button} onClick={deleteContact} type="button">
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
