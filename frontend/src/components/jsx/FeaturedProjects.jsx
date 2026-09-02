import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FeaturedProjects.css';

const FeaturedProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/projects')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section" id="featured-projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          <div className="grid grid-3">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>

                <div className="project-header">
                  <span className="badge">
                    {project.category}
                  </span>

                  <span className="status">
                    {project.status}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="company-name">
                  {project.company_name}
                </p>

                <p className="project-desc">
                  {project.description}
                </p>

                <button
                  className="btn btn-primary w-full"
                  onClick={() =>
                    navigate(`/projects/${project.id}`)
                  }
                >
                  View Details
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;