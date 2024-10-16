import React, { useRef, useEffect } from 'react';
import { Button, Typography, Box, useMediaQuery } from '@mui/material';
import Typewriter from 'typewriter-effect';
import { useTheme } from '@mui/material/styles';
import { HeroAnimation } from './HeroAnimation';
import './HeroSection.css';

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const handleContactClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }; 
  
    useEffect(() => {
      let cleanupAnimation;

      if (canvasRef.current) {
        cleanupAnimation = HeroAnimation({ canvasRef });
      }

      return () => {
        if (cleanupAnimation) cleanupAnimation();
      };
    }, []);

  return (
    <Box
      ref={heroRef}
      id="hero"
      sx={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: isMobile ? '3rem' : '5rem',
          fontFamily: 'Neureal',
          marginBottom: '1rem',
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        Trey Vinje
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontFamily: 'Neureal',
          marginBottom: '3rem',
          fontWeight: 'normal',
          color: theme.palette.text.primary,
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Typewriter
          options={{
            strings: [
              'Front-End Engineer',
              'Interactive Web Specialist',
              'Creative Problem Solver',
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </Typography>
      <Button
        variant="contained"
        onClick={handleContactClick}
        sx={{
          zIndex: 2,
          color: 'white',
          backgroundColor: 'primary.main',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: '10px 20px',
          borderRadius: '20px',
          transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
          '&:hover': {
            backgroundColor: 'primary.dark',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            transform: 'translateY(0)',
          }
        }}
      >
        Get in Touch
      </Button>

    </Box>
  );
}

export default HeroSection;