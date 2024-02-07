import { Link } from 'react-router-dom';

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
