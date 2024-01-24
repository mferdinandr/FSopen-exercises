import Section from './Fragments/Section';
import blogService from '../services/blogs';

const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong Username or Password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <Section titleSection={'Log In to Application'}>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </Section>
    </>
  );
};

export default LoginForm;
