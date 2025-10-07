import React, { useState, useEffect } from 'react';
import { getCourses } from '../api/api';
import CourseCard from '../components/CourseCard';

export default function CoursesPage(){
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true); setErr(null);
    try {
      const res = await getCourses();
      setCourses(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Could not load courses');
    } finally { setLoading(false) }
  };

  useEffect(() => { load(); }, []);

  const filtered = courses.filter(c => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (c.title || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q);
  });

  return (
    <div style={{display:'flex', gap:16, flexDirection:'column'}}>
      <div className="card">
        <h3 style={{marginTop:0}}>Browse courses</h3>
        <input placeholder="Search courses..." value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div>
        {loading ? <div className="small muted">Loading courses...</div> : err ? <div style={{color:'var(--danger)'}}>{err}</div> : null}
        <div style={{display:'grid', gap:12}}>
          {filtered.map(c => <CourseCard key={c._id} course={c} />)}
          {filtered.length === 0 && !loading && <div className="small muted card">No courses found.</div>}
        </div>
      </div>
    </div>
  );
}
