import React, { useState, useEffect } from 'react';

export default function CourseForm({ onCreate, initial=null }){
  const [form, setForm] = useState({ title:'', description:'' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (initial) setForm({ title: initial.title || '', description: initial.description || '' });
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!form.title.trim()) return setErr('Title required');
    setLoading(true);
    try {
      await onCreate(form);
      if (!initial) setForm({ title:'', description:'' });
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Failed');
    } finally { setLoading(false); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>{initial ? 'Edit course' : 'Create course'}</h3>
      {err && <div style={{color:'var(--danger)'}}>{err}</div>}
      <input placeholder="Course title" value={form.title} onChange={e => setForm(s => ({...s, title: e.target.value}))} />
      <textarea placeholder="Description" rows="3" value={form.description} onChange={e => setForm(s => ({...s, description: e.target.value}))} />
      <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
        <button className="btn" type="submit">{loading ? 'Saving...' : initial ? 'Save' : 'Create'}</button>
      </div>
    </form>
  );
}
