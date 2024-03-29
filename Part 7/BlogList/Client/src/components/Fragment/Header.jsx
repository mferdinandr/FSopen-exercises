import { useMatch, useNavigate } from 'react-router-dom';
import { useLoginDispatch, useLoginValue } from '../../LoginContext';
import { useNotifcationDispatch } from '../../NotificationContext';
import Section from '../Elements/Section';
import ButtonClick from '../Elements/ButtonClick';

const Header = ({ title }) => {
  const user = useLoginValue();
  const navigate = useNavigate();
  const setUser = useLoginDispatch();
  const notificationDispatch = useNotifcationDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser({ type: 'REMOVE' });
    navigate('/login');
    notificationDispatch({
      type: 'NOTIFY',
      payload: 'Success to log out',
      color: 'success',
    });
    setTimeout(() => {
      notificationDispatch({ type: 'MUTE' });
    }, 5000);
  };
  return (
    <div>
      <div className="flex justify-between mb-3">
        <Section titleSection={title} />
        <ButtonClick onClick={handleLogout} type="red-button">
          Logout
        </ButtonClick>
      </div>

      <h2 className="text-lg my-2 border-b-2 border-black pb-2">
        <span className="font-bold">{user.name}</span> logged in
      </h2>
    </div>
  );
};

export default Header;
