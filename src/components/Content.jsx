import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SingleUser from './SingleUser';

const Content = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.github.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-w-96">
      <ul className="flex flex-wrap">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.login}`}>
              <SingleUser user={user} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
