import React, { useState, useEffect, useContext } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../api/api';
import CourseForm from '../components/CourseForm';
import { AuthContext } from '../context/AuthContext';

export default function InstructorDashboard(){
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true); setErr(null);
    try {
      const res = await getCourses();
      // show only instructor's courses (assumes course.instructor holds id)
      const my = (res.data || []).filter(c => c.instructor === user._id || c.instructorId === user._id);
      setCourses(my);
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Failed to load');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    const res = await createCourse(payload);
    setCourses(c => [res.data, ...c]);
  };

  const handleUpdate = async (id, payload) => {
    const res = await updateCourse(id, payload);
    setCourses(c => c.map(x => x._id === id ? res.data : x));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete course?')) return;
    await deleteCourse(id);
    setCourses(c => c.filter(x => x._id !== id));
  };

  return (
    <div style={{display:'flex', gap:12}}>
      <div style={{flex:1}}>
        <CourseForm onCreate={handleCreate} />
        <div style={{height:12}} />
        <div className="card">
          <h3 style={{marginTop:0}}>Your courses</h3>
          {loading ? <div className="small muted">Loading...</div> : err ? <div style={{color:'var(--danger)'}}>{err}</div> :
            courses.map(c => (
              <div key={c._id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
                <div>
                  <div style={{fontWeight:600}}>{c.title}</div>
                  <div className="small muted">{c.description}</div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button className="btn ghost" onClick={() => setEditing(c)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(c._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <aside style={{width:360}}>
        {editing && <div className="card">
          <h4>Edit course</h4>
          <CourseForm initial={editing} onCreate={async (payload) => handleUpdate(editing._id, payload)} />
          <div style={{height:8}} />
          <button className="btn ghost" onClick={() => setEditing(null)}>Cancel</button>
        </div>}
      </aside>
    </div>
  );
}
