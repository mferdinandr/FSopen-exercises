import Section from './Fragments/Section';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Input from './Fragments/Input';
import Button from './Fragments/Button';
import { useState } from 'react';

const LoginForm = ({ setUser, setMessage, setTypeMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong Username or Password');
      setTypeMessage('error');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <>
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
          <Button>Login</Button>
        </form>
      </Section>
    </>
  );
};

export default LoginForm;
