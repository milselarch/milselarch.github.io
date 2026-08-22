import React from 'react';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@/components';
import { getEducation, getFeaturedProjects, getJobs, getProjects } from '@/lib/content';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

type HomeProps = {
  jobsData: any[];
  educationData: any[];
  featuredProjects: any[];
  projects: any[];
};

const IndexPage = ({ jobsData, educationData, featuredProjects, projects }: HomeProps) => (
  <Layout>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs jobsData={jobsData} educationData={educationData} />
      <Featured featuredProjects={featuredProjects} />
      <Projects projects={projects} />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

export async function getStaticProps() {
  const [jobsData, educationData, featuredProjects, projectsRaw] = await Promise.all([
    getJobs(),
    getEducation(),
    getFeaturedProjects(),
    getProjects(),
  ]);

  const projects = projectsRaw.filter(project => project.frontmatter?.showInProjects !== false);

  return {
    props: {
      jobsData,
      educationData,
      featuredProjects,
      projects,
    },
  };
}

export default IndexPage;
