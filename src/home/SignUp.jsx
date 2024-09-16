import { Box, Container, Divider, Typography, TextField, Paper, Stack, Button } from '@mui/material';
import { Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { LoginOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import Home from '../api/home';

const BackgroundContainer = styled('div')({
  margin: 0,
  padding: 0,
  width: '100%',
  minHeight: '100vh',
  backgroundImage: 'url(https://www.amecnews.com/wp-content/uploads/The-University-of-Melbourne2-1-2048x1382-1.jpeg)', // 替换为你的图片链接
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13, 49, 146, 0.6)',
    backdropFilter: 'blur(6px)',
    zIndex: 1,
  },
});

const Content = styled('div')({
  position: 'relative',
  zIndex: 2,
  color: 'white',
  padding: '20px',
  textAlign: 'center',
});

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentID: '',
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentID) newErrors.studentID = 'Student ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const { trigger } = useSWRMutation("signUp", async() => {
    return Home.signUp(formData)
  }, {
    onSuccess: () => {
      navigate('/signin')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Add form submission logic here
      trigger();
    }
  };

  return (
    <BackgroundContainer>
      <Content>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Paper sx={{
            width: '30%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '20px',
            padding: '40px',
            marginY: '20px',
          }}>
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Typography
                sx={{
                  color: '#333333',
                  fontSize: '45px',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                }}
              >
                Sign Up
              </Typography>
              <Divider sx={{ color: 'white' }} />
              <Box sx={{ minHeight: '2vh' }} />
              <Container>
                <form onSubmit={handleSubmit}> 
                  <Grid container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center">
                    {/* Student ID Field */}
                    <Box>
                      <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Student ID
                      </Typography>
                      <TextField
                        required
                        name="studentID"
                        value={formData.studentID}
                        onChange={handleChange}
                        label="Required"
                        fullWidth
                        error={!!errors.studentID}
                        helperText={errors.studentID}
                      />
                    </Box>

                    <Box sx={{ minHeight: '2vh' }} />

                    {/* Name Field */}
                    <Box>
                      <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Name
                      </Typography>
                      <TextField
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        label="Required"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Box>

                    <Box sx={{ minHeight: '2vh' }} />

                    {/* Email Field */}
                    <Box>
                      <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Email
                      </Typography>
                      <TextField
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Required"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Box>

                    <Box sx={{ minHeight: '2vh' }} />

                    {/* Password Field */}
                    <Box>
                      <Typography sx={{
                        color: '#333333',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                      }}>
                        Password
                      </Typography>
                      <TextField
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Required"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                      />
                    </Box>

                    <Box sx={{ minHeight: '3vh' }} />

                    <Link to="/signin">
                      Already have an account? Sign in
                    </Link>

                    <Button type="submit" variant="contained" size="large" endIcon={<LoginOutlined />} sx={{ width: '20%', borderRadius: '10px' }}>
                      Sign Up
                    </Button>
                  </Grid>
                </form>
              </Container>
            </Grid>
          </Paper>
        </Box>
      </Content>
    </BackgroundContainer>
  );
}
export default SignUp;
