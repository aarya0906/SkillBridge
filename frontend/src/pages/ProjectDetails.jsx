import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching project:', error);
        setLoading(false);
      });
  }, [id]);

  const handleApply = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('Please login to apply for a project.');
      navigate('/login');
      return;
    }

    if (user.accountType !== 'student') {
      alert('Only students can apply to projects.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5001/api/applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: project.id,
            student_id: user.id
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert('Application submitted successfully!');
      } else {
        alert(data.message || 'Failed to apply.');
      }
    } catch (error) {
      console.error('Error applying to project:', error);
      alert('Unable to connect to the server.');
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="project-details">
      <h1>{project.title}</h1>

      <p>
        <strong>Company:</strong> {project.company_name}
      </p>

      <p>
        <strong>Category:</strong> {project.category}
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{project.description}</p>

      <button
        className="btn btn-primary"
        onClick={handleApply}
      >
        Apply to Project
      </button>
    </div>
  );
};

export default ProjectDetails;