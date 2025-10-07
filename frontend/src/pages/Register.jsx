import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ username:'', password:'', role:'student' });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!form.username.trim()) return setErr('Username is required');
    if (form.password.length < 6) return setErr('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form);
      nav('/login');
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Failed to register');
    } finally { setLoading(false) }
  };

  return (
    <div style={{maxWidth:600, margin:'0 auto'}}>
      <form className="card" onSubmit={submit}>
        <h2>Register</h2>
        {err && <div style={{color:'var(--danger)'}}>{err}</div>}
        <input placeholder="Username" value={form.username} onChange={e => setForm(s => ({...s, username: e.target.value}))} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm(s => ({...s, password: e.target.value}))} />
        <label className="small muted">Role</label>
        <select value={form.role} onChange={e => setForm(s => ({...s, role: e.target.value}))}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn ghost" type="button" onClick={() => setForm({username:'',password:'',role:'student'})}>Clear</button>
          <button className="btn" type="submit">{loading ? 'Registering...' : 'Register'}</button>
        </div>
      </form>
    </div>
  );
}
