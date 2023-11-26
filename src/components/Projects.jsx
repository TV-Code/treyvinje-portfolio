import React from 'react';
import { Container, Grid } from '@mui/material';
import ProjectCard from './ProjectCard';
import styled from '@emotion/styled';

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  marginBottom: 0,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: 0,
  }
}));

function Projects() {
  const projectList = [
    {
      number: '01',
      name: 'FloCreate',
      description: 'FloCreate streamlines daily tasks with a suite of productivity tools, allowing users to efficiently manage notes, tasks, and journal entries. The application leverages category-based organization to enhance user experience and boost overall productivity.',
      techStack: ['React', 'JavaScript', 'CSS', 'Python', 'Flask'],
      link: '#',
      githubLink: 'https://github.com/TVlearns/second-mind-test',
      images: [
        { src: '/FlocreateImg-1.webp', frame: 'desktop' },
        { src: '/FlocreateImg-2.webp', frame: 'desktop' },
        { src: '/FlocreateImg-3.webp', frame: 'desktop' },
        { src: '/FlocreateImg-4.webp', frame: 'desktop' },
      ],
      type: 'Web App'
    },
    { 
      number: '02',
      name: 'FinWise',
      description: 'FinWise offers robust financial management capabilities, from transaction tracking and budget planning to user authorization and bulk transaction uploads. The application’s intuitive interface, combined with comprehensive financial tools, facilitates informed decision-making.',
      techStack: ['React', 'JavaScript', 'CSS', 'Python', 'Django'],
      link: '#',
      githubLink: 'https://github.com/TVlearns/fin-wise',
      images: [
        { src: '/FinwiseImg-1.webp', frame: 'desktop' },
        { src: '/FinwiseImg-2.webp', frame: 'mobile' },
        { src: '/FinwiseImg-3.webp', frame: 'mobile' },
        { src: '/FinwiseImg-4.webp', frame: 'mobile' },
      ],
      type: 'Web App'
    }
  ];

  return (
    <CustomContainer component="section" id="projects" maxWidth={false} sx={{ mt: 75 }}>
      <Grid container>
        {projectList.map((project, index) => (
          <Grid item key={index}>
            <ProjectCard project={project} isLast={index === projectList.length - 1}/>
          </Grid>
        ))}
      </Grid>
    </CustomContainer>
  );
}

export default Projects;
