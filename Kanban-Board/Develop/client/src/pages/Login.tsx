import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from '../utils/auth'; // Uncommented this import
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const { token, user } = await login(loginData);
      
      if (!token) {
        throw new Error('No authentication token received');
      }
  
      AuthService.login(token);
      navigate('/'); // Redirect after successful login
      
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err instanceof Error) {
        // Improved error messages
        if (err.message.includes('401')) {
          errorMessage = 'Invalid username or password';
        } else if (err.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Cannot connect to the server';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        {error && (
          <div className="error-message" style={{ 
            color: 'red', 
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: '#ffeeee',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
          <input 
            id="username"
            type='text'
            name='username'
            value={loginData.username}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input 
            id="password"
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <button 
          type='submit' 
          disabled={loading || !loginData.username || !loginData.password}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: loading ? '#cccccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? (
            <>
              <span style={{ marginRight: '0.5rem' }}>⏳</span>
              Logging in...
            </>
          ) : 'Login'}
        </button>
      </form>
    </div>
  );
};


export default Login;