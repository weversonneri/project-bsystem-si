/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const { handleLogout, userData } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/users');

      setUsers(data);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}> {user.name} ({user.email}) </li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>logout</button>

      <h1>{userData.name}sd</h1>
      <h1>{userData.email}sd</h1>
    </>
  );
}

export default Dashboard;
