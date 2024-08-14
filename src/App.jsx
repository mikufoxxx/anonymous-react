import { useState } from 'react'
import { Box, Container, Divider, Typography, TextField, Paper, Stack, Button, } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';


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

function App() {
  const [count, setCount] = useState(0)

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
            width: '50%',
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
                  fontSize: '75px',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                }}
              >
                Create Your Activity
              </Typography>
              <Divider sx={{ color: 'white' }} />
              <Container>
                <Grid container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center">
                  <Box>
                    <Typography sx={{
                      fontSize: '25px',
                      fontWeight: 'bold',
                      fontFamily: 'Roboto',
                      color: '#333333'
                    }}>
                      StudentClub
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                    />
                  </Box>
                  <Box>
                    <Typography sx={{
                      color: '#333333',
                      fontSize: '25px',
                      fontWeight: 'bold',
                      fontFamily: 'Roboto',
                    }}>
                      Student
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                    />
                  </Box>
                </Grid>
              </Container>
            </Grid>
          </Paper>
          <Paper sx={{
            width: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '20px',
            padding: '40px',
            marginY: '20px',
          }}>
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Container>
                <Grid container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center">
                  <Stack>
                    <Box>
                      <Typography sx={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Title
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                      />
                    </Box>
                    <Box>
                      <Typography sx={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Venue
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                      />
                    </Box>
                    <Box>
                      <Typography sx={{
                        color: '#333333',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                      }}>
                        Capacity
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                      />
                    </Box>
                  </Stack>
                  <Stack>
                    <Box>
                      <Typography sx={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Date & Time
                      </Typography>
                      <TextField
                        required
                        type='datetime-local'
                        id="outlined-required"
                        defaultValue="2024-03-09T03:09"
                      />
                    </Box>
                    <Box>
                      <Typography sx={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#333333'
                      }}>
                        Description
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                      />
                    </Box>
                    <Box>
                      <Typography sx={{
                        color: '#333333',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                      }}>
                        Cost
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Container>
            </Grid>
          </Paper>

          <Button variant="contained" size="large" endIcon={<SendIcon />} sx={{ width: '20%', borderRadius: '10px' }}>
            Send The Info
          </Button>

        </Box>
      </Content>
    </BackgroundContainer>
  )
}

export default App
