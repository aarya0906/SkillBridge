import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();

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

      <button className="btn btn-primary">
        Apply to Project
      </button>
    </div>
  );
};

export default ProjectDetails;