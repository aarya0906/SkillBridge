import React from 'react';
import Hero from '../components/jsx/Hero';
import HowItWorks from '../components/jsx/HowItWorks';
import Categories from '../components/jsx/Categories';
import WhySkillBridge from '../components/jsx/WhySkillBridge';
import FeaturedProjects from '../components/jsx/FeaturedProjects';
import Benefits from '../components/jsx/Benefits';
import Footer from '../components/jsx/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Categories />
      <WhySkillBridge />
      <FeaturedProjects />
      <Benefits />
      <Footer />
    </>
  );
};

export default Home;