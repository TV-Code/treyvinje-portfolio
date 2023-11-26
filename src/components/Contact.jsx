import React from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

function Contact() {
  const theme = useTheme();
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
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
        </Grid>
      </form>
    </Box>
  );
}

export default Contact;
