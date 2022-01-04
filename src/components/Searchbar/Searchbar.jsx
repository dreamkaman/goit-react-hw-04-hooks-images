import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchbarButton}></button>

        <input
          onChange={handleChange}
          className={styles.searchbarInput}
          type="text"
          autoComplete="false"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
