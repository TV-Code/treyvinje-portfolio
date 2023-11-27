import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

function Contact() {
  const theme = useTheme();
  const [statusMessage, setStatusMessage] = useState('');
  function sendEmail(e) {
    e.preventDefault();
  
    emailjs.sendForm('service_0pdc7nc', 'template_uzy5s8n', e.target, 'eHnhJUkRGLwhkwgQc')
      .then((result) => {
          console.log(result.text);
          setStatusMessage('Message successfully sent.');
          e.target.reset();
          setTimeout(() => setStatusMessage(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatusMessage('Error sending message. Try again.');
          e.target.reset();
          setTimeout(() => setStatusMessage(''), 5000);
      });
  }
  

  return (
    <Box id="contact" sx={{
      py: 10,
      px: 2,
      textAlign: 'center',
      marginBottom: '5rem',
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Neureal", fontWeight: "bold" }}>
        Contact Me
      </Typography>
      <form onSubmit={sendEmail}>
        <Grid container spacing={2} justifyContent="center" sx={{ paddingLeft: '15%', paddingRight: '15%'}}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="user_name" required fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="user_email" required fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" name="message" required multiline rows={4} fullWidth margin="normal" />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} sx={{ height: "60px", borderRadius: "15px", fontFamily: "Lato", fontWeight: "700", fontSize: "1rem"}}>
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Neureal" }}>
              {statusMessage}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Contact;
