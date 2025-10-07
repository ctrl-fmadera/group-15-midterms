import React, { useState } from 'react';

export default function LessonForm({ onCreate }){
  const [form, setForm] = useState({ title:'', content:'' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!form.title.trim()) return setErr('Title required');
    setLoading(true);
    try {
      await onCreate(form);
      setForm({ title:'', content:'' });
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Failed');
    } finally { setLoading(false); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h4 style={{marginTop:0}}>Add lesson</h4>
      {err && <div style={{color:'var(--danger)'}}>{err}</div>}
      <input placeholder="Lesson title" value={form.title} onChange={e => setForm(s => ({...s, title: e.target.value}))} />
      <textarea placeholder="Content" rows="4" value={form.content} onChange={e => setForm(s => ({...s, content: e.target.value}))} />
      <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
        <button className="btn" type="submit">{loading ? 'Saving...' : 'Add lesson'}</button>
      </div>
    </form>
  );
}
