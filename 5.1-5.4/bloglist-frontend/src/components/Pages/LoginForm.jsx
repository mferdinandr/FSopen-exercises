import Section from '../Elements/Section';
import blogService from '../../services/blogs';
import loginService from '../../services/login';
import Input from '../Elements/Input';
import { useState } from 'react';
import ButtonForm from '../Elements/ButtonForm';

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

      setMessage('Success to login');
      setTypeMessage('success');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setMessage('Wrong Username or Password');
      setTypeMessage('error');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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

export default LoginForm;
