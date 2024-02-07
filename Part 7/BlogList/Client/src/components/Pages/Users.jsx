import { useQuery } from '@tanstack/react-query';
import blogService from '../../services/blogs';
import { Link } from 'react-router-dom';
import ButtonClick from '../Elements/ButtonClick';
import Header from '../Fragment/Header';
import User from '../Fragment/User';
import { useEffect } from 'react';

const Users = () => {
  const result = useQuery({
    queryKey: [''],
    queryFn: blogService.getAllUsers,
    refetchOnWindowFocus: false,
  });
  const users = result.data;

  return (
    <div className="mx-7 sm:mx-20 my-5">
      <Header />
      <Link to={'/blogs'}>
        <ButtonClick type="blue-button">Show Blogs</ButtonClick>
      </Link>

      <div className="mt-5">
        <div className="flex justify-between font-bold ">
          <div>Name</div>
          <div>Blogs Created</div>
        </div>
        {users && users.map((user) => <User key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default Users;
