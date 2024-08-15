import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoggedIn);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    try {
      await dispatch(
        logIn({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      ).unwrap();
      form.reset();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Log In</button>
      {isLoading && (
        <p className={css.message + ' ' + css.loading}>
          Loading, please wait...
        </p>
      )}
      {error && <p className={css.message + ' ' + css.error}>{error}</p>}
    </form>
  );
};
