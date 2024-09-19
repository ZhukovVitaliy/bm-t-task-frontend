import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfile } from '../../redux/auth/operations';
import { selectIsLoading, selectUser } from '../../redux/auth/selectors';
import { validatePassword } from '../../helpers';
import DocumentTitle from '../../components/DocumentTitle';

import placeholderAvatar from '/Profile_avatar_placeholder_large.png';
import css from './SettingsPage.module.css';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarURL || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password) {
      const { valid, message } = validatePassword(password);
      if (!valid) {
        setError(message);
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const updatedUser = await dispatch(updateProfile(formData)).unwrap();
      setSuccess('Profile updated successfully!');
      setAvatarPreview(updatedUser.avatarURL || placeholderAvatar);
      setAvatar(null);
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={css.container}>
      <DocumentTitle>Settings</DocumentTitle>
      <h2>Settings</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Avatar
          <div className={css.avatarPreview}>
            <img
              src={avatarPreview || placeholderAvatar}
              alt="Avatar Preview"
              className={css.avatarImage}
            />
          </div>
          <input type="file" name="avatar" onChange={handleAvatarChange} />
        </label>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className={css.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className={css.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Update Profile</button>

        {isLoading && (
          <p className={css.message + ' ' + css.loading}>
            Updating profile, please wait...
          </p>
        )}
        {error && <p className={css.message + ' ' + css.error}>{error}</p>}
        {success && (
          <p className={css.message + ' ' + css.success}>{success}</p>
        )}
      </form>
    </div>
  );
}
