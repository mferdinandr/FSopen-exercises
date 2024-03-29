import Section from '../Elements/Section';
import blogService from '../../services/blogs';
import loginService from '../../services/login';
import Input from '../Elements/Input';
import { useState } from 'react';
import ButtonForm from '../Elements/ButtonForm';
import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';
import { useLoginDispatch, useLoginValue } from '../../LoginContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useLoginDispatch();
  const notificationDispatch = useNotifcationDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      setUser({ type: 'SET', payload: user });
      navigate('/blogs');
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      notificationDispatch({
        type: 'NOTIFY',
        payload: 'Success to login',
        color: 'success',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'MUTE' });
      }, 5000);
    } catch (exception) {
      notificationDispatch({
        type: 'NOTIFY',
        payload: 'Wrong Username or Password',
        color: 'error',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'MUTE' });
      }, 5000);
    }
  };

  return (
    <div className="w-3/4 sm:w-1/3 m-auto flex flex-col justify-center h-screen sm:pb-10">
      <Section titleSection={'Log In to Application'}>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            value={username}
            name="Username"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></Input>
          <Input
            type="password"
            value={password}
            name="Password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></Input>

          <ButtonForm>Login</ButtonForm>
        </form>
      </Section>
    </div>
  );
};

LoginForm.propTypes = {
  // setUser: PropTypes.func.isRequired,
};

export default LoginForm;
