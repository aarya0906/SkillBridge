import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostProject.css';

const PostProject = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    company_name: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div>
        <h2>Please login first.</h2>

        <button onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  if (user.accountType !== 'company') {
    return (
      <div>
        <h2>Access Denied</h2>

        <p>Only companies can post projects.</p>

        <button onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:5001/api/projects',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            title: formData.title,
            category: formData.category,
            description: formData.description
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage('Project posted successfully!');

        setFormData({
          title: '',
          category: '',
          description: '',
          company_name: ''
        });
      } else {
        setMessage(
          data.message || 'Failed to post project.'
        );
      }
    } catch (error) {
      console.error('Error posting project:', error);

      setMessage('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-project-page">
      <div className="post-project-container">

        <h1>Post a Project</h1>

        <p>
          Tell students about the project your company
          needs help with.
        </p>

        <p className="posting-as">
          Posting as: <strong>{user.name}</strong>
        </p>

        <form onSubmit={handleSubmit}>

          <label>Project Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Content Writing">Content Writing</option>
          </select>

          <label>Project Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            rows="6"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Project'}
          </button>

        </form>

        {message && (
          <p className="post-project-message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default PostProject;