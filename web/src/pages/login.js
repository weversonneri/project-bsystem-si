import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleSignIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleSignIn({ email, password });
  };

  return (
    <>
      <h1>Login</h1>

      <div className="container" onSubmit={handleSubmit}>
        <form action="" className="form">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>

      </div>
    </>
  );
}

export default Login;
