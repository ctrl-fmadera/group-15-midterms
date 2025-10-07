import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse, enrollCourse, createLesson } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import LessonForm from '../components/LessonForm';

export default function CourseDetail(){
  const { id } = useParams();
  const { user, isAuthenticated, isInstructor } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  const load = async () => {
    setLoading(true); setErr(null);
    try {
      const res = await getCourse(id);
      setCourse(res.data);
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || 'Failed to load course');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) return alert('Please log in to enroll');
    setEnrolling(true);
    try {
      await enrollCourse(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || e?.message || 'Enrollment failed');
    } finally { setEnrolling(false); }
  };

  const handleCreateLesson = async (payload) => {
    try {
      const res = await createLesson(id, payload);
      // backend should return new lesson — refresh course
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || e?.message || 'Failed to add lesson');
    }
  };

  if (loading) return <div className="small muted">Loading...</div>;
  if (err) return <div style={{color:'var(--danger)'}}>{err}</div>;
  if (!course) return null;

  const isEnrolled = (course.students || []).some(s => s._id === user?._id);

  return (
    <div style={{display:'flex', gap:16}}>
      <div style={{flex:1}}>
        <div className="card">
          <h2 style={{margin:0}}>{course.title}</h2>
          <div className="small muted">Instructor: {course.instructorName || course.instructor}</div>
          <p>{course.description}</p>
          <div style={{display:'flex', gap:8}}>
            {!isEnrolled ? (
              <button className="btn" onClick={handleEnroll} disabled={enrolling}>{enrolling ? 'Enrolling...' : 'Enroll'}</button>
            ) : (
              <div className="small muted">You are enrolled</div>
            )}
          </div>
        </div>

        <div style={{height:12}} />

        <div className="card">
          <h3 style={{marginTop:0}}>Lessons</h3>
          {course.lessons?.length ? course.lessons.map(l => (
            <div key={l._id} style={{padding:10, borderRadius:8, background:'#fafafa', marginBottom:8}}>
              <div style={{fontWeight:600}}>{l.title}</div>
              <div className="small muted">{l.content}</div>
            </div>
          )) : <div className="small muted">No lessons yet</div>}
        </div>
      </div>

      <aside style={{width:360}}>
        {isInstructor && user && user._id === course.instructor && (
          <>
            <LessonForm onCreate={handleCreateLesson} />
          </>
        )}
        <div style={{height:12}} />
        <div className="card">
          <h4 style={{marginTop:0}}>Course details</h4>
          <div className="small muted">Students: {(course.students || []).length}</div>
          <div className="small muted">Created at: {new Date(course.createdAt || Date.now()).toLocaleDateString()}</div>
        </div>
      </aside>
    </div>
  );
}
