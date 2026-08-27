import React from 'react';
import '../css/Categories.css';

const Categories = () => {
  return (
    <section className="section" id="categories">
      <div className="container">
        <h2 className="section-title">Explore Categories</h2>
        <div className="grid grid-3 categories-grid">
          <div className="category-card">Web Development</div>
          <div className="category-card">Graphic Design</div>
          <div className="category-card">Social Media</div>
          <div className="category-card">Content Writing</div>
          <div className="category-card">Data Work</div>
          <div className="category-card">Video Editing</div>
        </div>
      </div>
    </section>
  );
};

export default Categories;