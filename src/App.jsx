import React from 'react';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f97bd',
      dark: '#466C90',
    },
    secondary: {
      main: '#D34843',
    },
    background: {
      default: '#F5F1EA',
    },
    text: {
      primary: '#000000',
      secondary: '#616161',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HeroSection />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;