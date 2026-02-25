import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.password_confirmation);
      navigate('/dashboard');
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <div className="auth-wrapper">
        <div className="auth-card">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <div className="error">{errors.general}</div>}

        <label>Name</label>
        <input type="text" placeholder="Your Name" {...field('name')} required />
        {errors.name && <span className="error">{errors.name[0]}</span>}

        <label>Email</label>
        <input type="email" placeholder="Enter your Email" {...field('email')} required />
        {errors.email && <span className="error">{errors.email[0]}</span>}

        <label>Password</label>
        <input type="password" placeholder="Enter Password" {...field('password')} required />
        {errors.password && <span className="error">{errors.password[0]}</span>}

        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password" {...field('password_confirmation')} required />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
    </div>
  );
}