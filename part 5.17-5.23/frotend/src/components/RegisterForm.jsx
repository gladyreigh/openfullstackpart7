// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ handleRegister, handleBack }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await handleRegister({ username, name, password });
    } catch (exception) {
      console.error('Registration service error:', exception.response?.data || exception);
      setError(exception.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          Name:
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <div>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Register</button>
        <button type="button" onClick={handleBack} style={{ marginLeft: '10px' }}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default RegisterForm;
