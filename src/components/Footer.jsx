import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();
  return (
    <Box component="footer" sx={{
      py: 2,
      px: 1,
      textAlign: 'center',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
    }}>
      <Typography variant="body2" gutterBottom>
        © {new Date().getFullYear()} Trey Vinje
      </Typography>
      <Box>
        <IconButton href="https://www.linkedin.com/in/trey-vinje-830857284/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ height: "40px", width: "40px", margin: "10px"}}>
          <LinkedInIcon />
        </IconButton>
        <IconButton href="https://github.com/TVlearns" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ height: "40px", width: "40px", margin: "10px"}}>
          <GitHubIcon />
        </IconButton>
        <IconButton href="mailto:t.akselvinje@gmail.com" color="inherit" sx={{ height: "40px", width: "40px", margin: "10px"}}>
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
