import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/base/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass: password }),
        credentials: 'include'  
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(data.Token); 
        setErrorMessage('');
      } else {
        setErrorMessage(data.msg || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="login-form">
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
        className='Input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        className='Input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='Button' type="submit">Login</button>
      </form>
      <br />
      <br />
      <h3 className='details'>Sample User Details</h3>
      <p className='details'>email : john@gmail.com</p>
      <p className='details'>pass 123</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Login;