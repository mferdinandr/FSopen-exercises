import { Link, Route, Routes, useMatch } from 'react-router-dom';
import Header from './Header';

export const UserDetail = ({ blogs }) => {
  const match = useMatch('/users/:id');

  if (!blogs) {
    return null;
  } else {
    const findUser =
      blogs && blogs.filter((blog) => blog.id === match.params.id);

    return (
      <div className="mx-7 sm:mx-20 my-5">
        <Header title={'User Blogs'} />
        <div className="pt-2 font-bold">{findUser[0].name}</div>
        <ul className="ml-6">
          {findUser[0].blogs.map((blog) => (
            <li key={blog.id} className="p-1 list-disc">
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const User = ({ user }) => {
  return (
    <>
      {user.blogs && (
        <div className="flex justify-between border border-black my-2 px-3 py-2 rounded-lg">
          <div>
            <Link to={`/users/${user.id}`} className="font-bold blogTitle">
              {user.name}
            </Link>
          </div>
          <div>
            <Link to={`/users/${user.id}`} className="font-bold blogTitle pr-8">
              {user.blogs.length}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
