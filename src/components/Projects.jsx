import React from 'react';
import { Container, Grid } from '@mui/material';
import ProjectCard from './ProjectCard';
import styled from '@emotion/styled';
import WacintoshImg1 from '../assets/WacintoshImg-1.png';
import WacintoshImg2 from '../assets/WacintoshImg-2.PNG';
import WacintoshImg3 from '../assets/WacintoshImg-3.PNG';
import WacintoshImg4 from '../assets/WacintoshImg-4.PNG';
import FlocreateImg1 from '../assets/FlocreateImg-1.webp';
import FlocreateImg2 from '../assets/FlocreateImg-2.webp';
import FlocreateImg3 from '../assets/FlocreateImg-3.webp';
import FlocreateImg4 from '../assets/FlocreateImg-4.webp';
import FinwiseImg1 from '../assets/FinwiseImg-1.webp';
import FinwiseImg2 from '../assets/FinwiseImg-2.webp';
import FinwiseImg3 from '../assets/FinwiseImg-3.webp';
import FinwiseImg4 from '../assets/FinwiseImg-4.webp';


const CustomContainer = styled(Container)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  marginBottom: '-20rem',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: '-20rem',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '-20rem',
  }
}));

function Projects() {
  const projectList = [
    {
      number: '01',
      name: 'Wacintosh',
      description: 'Wacintosh is a digital experience featuring an interactive 3D recreation of the Macintosh 128k with System 1 OS with a twist, built using Three.js and React. It features authentic OS simulation, real-time 3D rendering, and responsive design. The project incorporates custom shaders and drag-and-drop functionality, overcoming challenges in 3D web development. Wacintosh demonstrates the seamless integration of 2D and 3D elements in modern web applications. ',
      techStack: ['React', 'ThreeJS', 'R3F', 'DnDKit', 'JavaScript', 'CSS' ],
      link: 'https://tv-code.github.io/wacintosh',
      githubLink: 'https://github.com/TV-Code/wacintosh',
      images: [
        { src: WacintoshImg1, frame: 'desktop' },
        { src: WacintoshImg2, frame: 'tablet' },
        { src: WacintoshImg3, frame: 'tablet' },
        { src: WacintoshImg4, frame: 'mobile-landscape' },
      ],
      reduceBottomSpace: true
    },
    {
      number: '02',
      name: 'FloCreate',
      description: 'FloCreate streamlines daily tasks with a suite of productivity tools, allowing users to efficiently manage notes, tasks, and journal entries. The application leverages category-based organization to enhance user experience and boost overall productivity.',
      techStack: ['React', 'JavaScript', 'CSS', 'Python', 'Flask'],
      githubLink: 'https://github.com/TV-Code/flo-create',
      images: [
        { src: FlocreateImg1, frame: 'desktop' },
        { src: FlocreateImg2, frame: 'desktop' },
        { src: FlocreateImg3, frame: 'desktop' },
        { src: FlocreateImg4, frame: 'desktop' },
      ],
    },
    { 
      number: '03',
      name: 'FinWise',
      description: 'FinWise offers robust financial management capabilities, from transaction tracking and budget planning to user authorization and bulk transaction uploads. The application’s intuitive interface, combined with comprehensive financial tools, facilitates informed decision-making.',
      techStack: ['React', 'JavaScript', 'CSS', 'Python', 'Django', 'PostgreSQL'],
      githubLink: 'https://github.com/TV-Code/fin-wise',
      images: [
        { src: FinwiseImg1, frame: 'desktop' },
        { src: FinwiseImg2, frame: 'mobile' },
        { src: FinwiseImg3, frame: 'mobile' },
        { src: FinwiseImg4, frame: 'mobile' },
      ],
    },
  ];

  return (
    <CustomContainer component="section" id="projects" maxWidth={false} sx={{ mt: 75 }}>
      <Grid container>
        {projectList.map((project, index) => (
          <Grid item key={index}>
            <ProjectCard project={project} isLast={index === projectList.length - 1} reduceBottomSpace={project.reduceBottomSpace}/>
          </Grid>
        ))}
      </Grid>
    </CustomContainer>
  );
}

export default Projects;
