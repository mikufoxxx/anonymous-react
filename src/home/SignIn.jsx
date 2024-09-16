import { Box, Container, Divider, Typography, TextField, Paper, Stack, Button, } from '@mui/material'
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import React from 'react';
import { LoginOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import Home from '../api/home';
import useStore from '../store';


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

function SignIn() {
  const navigate = useNavigate();  // 使用 useNavigate 进行页面跳转
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const { setCurrentStudent } = useStore();
  const { trigger } = useSWRMutation("signUp", async () => {
    return Home.signIn(formData)
  }, {
    onSuccess: ({ data: student }) => {
      if (student.status === "success") {
        setCurrentStudent({
          studentID: student.studentID,
          name: student.name,
          clubs: student.clubs,
          messageCount: student.messageCount,
          isAdmin: student.clubs.length > 0  // 判断用户是否是管理员
        });
  
        // 保存 session 信息到浏览器的 cookie 或 localStorage 中（可选）
        document.cookie = `studentID=${student.studentID}; path=/;`;
        document.cookie = `isAdmin=${student.clubs.length > 0}; path=/;`;
  
        // 登录成功后跳转到仪表板
        navigate('/dashboard');
    }
  }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Add sign-in logic here
      trigger();
    }
  };
  return (
    <BackgroundContainer>
      <Content>
        <Box
          component={"form"}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit}
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
                Sign In
              </Typography>
              <Divider sx={{ color: 'white' }} />
              <Box sx={{ minHeight: '3vh' }} />
              <Container>
                <Grid container
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="center">
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
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Box>
                  <Box sx={{ minHeight: '3vh' }} />
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
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      label="Required"
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                    <Box sx={{ minHeight: '3vh' }} />
                    <Link to="/signup">
                      Don't have an account? Sign Up
                    </Link>
                  </Box>
                </Grid>
              </Container>
            </Grid>
          </Paper>

          <Button variant="contained" size="large" endIcon={<LoginOutlined />} sx={{ width: '20%', borderRadius: '10px' }} type='submit'>
            Sign In
          </Button>

        </Box>
      </Content>
    </BackgroundContainer>
  )
}

export default SignIn