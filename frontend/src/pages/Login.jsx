import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ username:'', password:'' });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await login(form);
      // backend expected to return token & user inside res.data.data
      nav('/courses');
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Login failed');
    } finally { setLoading(false) }
  };

  return (
    <div style={{maxWidth:600, margin:'0 auto'}}>
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div style={{color:'var(--danger)'}}>{err}</div>}
        <input placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" type="submit">{loading ? 'Signing in...' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
}
