import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = props => {
  const { onClick } = props;

  return (
    <button className={styles.loadMoreBtn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
