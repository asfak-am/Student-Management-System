import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    password: '',
    password_confirmation: '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(token, email, form.password, form.password_confirmation);
      navigate('/login?reset=success');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-wrapper">
        <h1>Reset Password</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <p><Link to="/login">Back to Sign in</Link></p>
      </div>
    </div>
  );
}