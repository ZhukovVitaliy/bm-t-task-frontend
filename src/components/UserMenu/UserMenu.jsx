import { NavLink } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import placeholderAvatar from '/Profile_avatar_placeholder_large.png';

import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { name, avatarURL } = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {name}</p>

      <img src={avatarURL || placeholderAvatar} alt={name} height="20" />

      <button type="button">
        <NavLink className={css.link} to="/settings">
          <FaCog className={css.icon} />
          settings
        </NavLink>
      </button>
      <button type="button" onClick={() => dispatch(logOut())}>
        <NavLink className={css.link} to="/login">
          Logout
        </NavLink>
      </button>
    </div>
  );
};
