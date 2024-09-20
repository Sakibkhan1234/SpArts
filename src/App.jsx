import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://strapiqa.sparts.app/api/students');
        setStudents(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>👤</li>
          <li>📊</li>
          <li>📆</li>
          <li>⚙️</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1>Students</h1>
          <input type="text" placeholder="Search" className="search-bar" />
          <button className="add-student">+ Add a student</button>
          <img src="profile-image-url" alt="Profile" className="profile-pic" />
        </div>

        {/* Table */}
        <table className="student-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Year Group</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <img src={student.attributes.photo_url} alt="student" className="profile-pic" />
                </td>
                <td>{student.id}</td>
                <td>{student.attributes.firstName} </td>
                <td>{student.attributes.lastName}</td>
                <td>{student.attributes.parentEmailId}</td>
                <td>{student.attributes.parentContactNo}</td>
                <td>{student.attributes.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button>Previous</button>
          <span>1 of 10</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default App;
