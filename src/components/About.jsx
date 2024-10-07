import React from 'react';
import { Typography, Container, Chip, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/system';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import JavascriptIcon from '../assets/JavascriptIcon.svg';
import ReactIcon from '../assets/ReactIcon.svg';
import CssIcon from '../assets/CSSIcon.svg';
import HtmlIcon from '../assets/HtmlIcon.svg';
import MUIIcon from '../assets/MUIIcon.svg';
import PythonIcon from '../assets/PythonIcon.svg';
import FigmaIcon from '../assets/FigmaIcon.svg';
import RestApiIcon from '../assets/RestApiIcon.svg';
import ResponsiveIcon from '../assets/ResponsiveIcon.svg';
import DjangoIcon from '../assets/DjangoIcon.svg';
import FlaskIcon from '../assets/FlaskIcon.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import DockerIcon from '../assets/DockerIcon.svg';
import PostgreSQLIcon from '../assets/PostgreSQLIcon.svg';
import NginxIcon from '../assets/NginxIcon.svg';
import GitIcon from '../assets/GitIcon.svg';
import TensorFlowIcon from '../assets/TensorFlowIcon.svg';
import ProfilePhoto from '../assets/ProfilePhoto.webp';

const AboutContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  padding: theme.spacing(5),
}));

const ImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexBasis: '40%',
  textAlign: 'center',
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: '50px',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(5),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flexBasis: '60%',
}));

const SkillStack = styled(Stack)(({ theme }) => ({
  marginLeft: `-${theme.spacing(2)}`,
  rowGap: theme.spacing(2),
  '& > *': {
    marginLeft: theme.spacing(2),
  },
}));

const SkillChip = styled(Chip)(({ theme, index }) => ({
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:nth-of-type(1n)': {
    marginLeft: '16px',
  },
}));


function About() {
  const frontendSkills = [
    { label: "JavaScript", iconSrc: JavascriptIcon },
    { label: "React", iconSrc: ReactIcon },
    { label: "HTML", iconSrc: HtmlIcon },
    { label: "CSS", iconSrc: CssIcon },
    { label: "MUI", iconSrc: MUIIcon },
    { label: "Responsive Design", iconSrc: ResponsiveIcon },
    { label: "Figma", iconSrc: FigmaIcon }
  ];

  const backendSkills = [
    { label: "Python", iconSrc: PythonIcon },
    { label: "Flask", iconSrc: FlaskIcon },
    { label: "Django", iconSrc: DjangoIcon },
    { label: "PostgreSQL", iconSrc: PostgreSQLIcon },
    { label: "REST API", iconSrc: RestApiIcon },
    { label: "TensorFlow & Keras", iconSrc: TensorFlowIcon }
  ];

  const otherSkills = [
    { label: "Docker", iconSrc: DockerIcon },
    { label: "Github", iconSrc: GithubIcon },
    { label: "Nginx", iconSrc: NginxIcon },
    { label: "Git", iconSrc: GitIcon }
  ];

  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '-100px 0px',
  });

  const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

  const fadeInStaggered = keyframes`
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <AboutContainer component="section" id="about" sx={{ py: 5 }} ref={ref}>
      <ImageBox>
        <img src={ProfilePhoto} alt="Trey Vinje" width="100%" />
      </ImageBox>
      <ContentBox>
      <Typography
        fontFamily="Neureal"
        variant="h4"
        gutterBottom
        sx={{
          opacity: '0',
          fontWeight: 'bold',
          mb: 3,
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} forwards` : 'none',
        }}
      >
        About Me
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          opacity: '0',
          lineHeight: 1.6,
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.2s forwards` : 'none',
        }}
      >
        Hello, I'm Trey Vinje—a passionate web developer with a keen interest in psychology and design. My focus lies in creating intuitive and visually appealing digital experiences, with a particular emphasis on user interface and user experience design.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          opacity: '0',
          lineHeight: 1.6,
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.3s forwards` : 'none',
        }}
      >
        Self-taught and driven by curiosity, I've spent over two years honing my skills in a variety of technologies, including HTML, CSS, JavaScript, React, and Python. I’m continuously exploring the intersection of technology and design to craft impactful digital solutions.
      </Typography>
      <Typography
        fontFamily="Neureal"
        variant="h5"
        sx={{
          opacity: '0',
          mt: 4,
          mb: 2,
          fontWeight: 'bold',
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.4s forwards` : 'none',
        }}
      >
        Frontend Skills
      </Typography>
      <SkillStack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        sx={{ opacity: '0', animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.5s forwards` : 'none' }}
      >
        {frontendSkills.map((skill, index) => (
          <SkillChip
            index={index}
            key={skill.label}
            icon={<img src={skill.iconSrc} alt={skill.label} style={{ width: '24px', height: '24px' }} />}
            label={skill.label}
            variant="outlined"
            sx={{
              height: '40px',
              padding: '0 10px',
              opacity: '0',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '1.1rem',
              fontWeight: '500',
              animation: inView ? `${fadeInStaggered} 0.5s ${theme.transitions.easing.sharp} ${0.5 + index * 0.2}s forwards` : 'none',
            }}
          />
        ))}
      </SkillStack>
      <Typography
        fontFamily="Neureal"
        variant="h5"
        sx={{
          opacity: '0',
          mt: 2,
          mb: 2,
          fontWeight: 'bold',
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.4s forwards` : 'none',
        }}
      >
        Backend Skills
      </Typography>
      <SkillStack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        sx={{ opacity: '0', animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.5s forwards` : 'none' }}
      >
        {backendSkills.map((skill, index) => (
          <SkillChip
            index={index}
            key={skill.label}
            icon={<img src={skill.iconSrc} alt={skill.label} style={{ width: '24px', height: '24px' }} />}
            label={skill.label}
            variant="outlined"
            sx={{
              height: '40px',
              padding: '0 10px',
              opacity: '0',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '1.1rem',
              fontWeight: '500',
              animation: inView ? `${fadeInStaggered} 0.5s ${theme.transitions.easing.sharp} ${0.5 + index * 0.2}s forwards` : 'none',
            }}
          />
        ))}
      </SkillStack>
      <Typography
        fontFamily="Neureal"
        variant="h5"
        sx={{
          opacity: '0',
          mt: 2,
          mb: 2,
          fontWeight: 'bold',
          animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.4s forwards` : 'none',
        }}
      >
        Other Skills
      </Typography>
      <SkillStack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        sx={{ opacity: '0', animation: inView ? `${fadeInLeft} 0.8s ${theme.transitions.easing.sharp} 0.5s forwards` : 'none' }}
      >
        {otherSkills.map((skill, index) => (
          <SkillChip
            index={index}
            key={skill.label}
            icon={<img src={skill.iconSrc} alt={skill.label} style={{ width: '24px', height: '24px' }} />}
            label={skill.label}
            variant="outlined"
            sx={{
              height: '40px',
              padding: '0 10px',
              opacity: '0',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '1.1rem',
              fontWeight: '500',
              animation: inView ? `${fadeInStaggered} 0.5s ${theme.transitions.easing.sharp} ${0.5 + index * 0.2}s forwards` : 'none',
            }}
          />
        ))}
      </SkillStack>
      </ContentBox>
    </AboutContainer>
  );
}

export default About;
