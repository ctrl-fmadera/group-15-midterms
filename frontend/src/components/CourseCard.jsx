import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }){
  return (
    <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
      <div>
        <h4 style={{margin:0}}>{course.title}</h4>
        <div className="small muted">{course.description}</div>
        <div className="small muted">Instructor: {course.instructorName || course.instructor || 'N/A'}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <Link to={`/courses/${course._id}`} className="btn ghost">Open</Link>
      </div>
    </div>
  );
}
