import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer'; // Ensure correct path

const UsersView = () => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(initializeUsers());
        setLoading(false);
      } catch (exception) {
        console.error('Error fetching users:', exception);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (!Array.isArray(users)) {
    return <p>Users data is not available.</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link> ({user.blogs.length} blogs)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersView;
