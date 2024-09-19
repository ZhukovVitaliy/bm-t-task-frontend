import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import { validatePassword } from '../../helpers';

import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    const password = form.elements.password.value;

    const { valid, message } = validatePassword(password);
    if (!valid) {
      setError(message);
      return;
    }

    try {
      await dispatch(
        register({
          name: form.elements.name.value,
          email: form.elements.email.value,
          password: password,
        })
      ).unwrap();

      form.reset();
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Register</button>
      {isLoading && (
        <p className={css.message + ' ' + css.loading}>
          Loading, please wait...
        </p>
      )}
      {error && <p className={css.message + ' ' + css.error}>{error}</p>}
    </form>
  );
};
