/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const { handleSigOut } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/users');
      setUsers(data.users);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}> {user.name} ({user.email}) </li>
        ))}
      </ul>

      <button type="button" onClick={handleSigOut}>logout</button>

    </>
  );
}

export default Dashboard;
