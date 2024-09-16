import React from 'react';
import { Box, Avatar, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import useStore from '../../store';

const ProfileCardContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: '#f5f5f5', // 卡片背景色
  marginBottom: theme.spacing(2),
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  width: '30%', // 控制头像部分宽度占比
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius,
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  width: '70%', // 控制信息部分宽度占比
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // 垂直居中
  alignItems: 'center', // 水平居中
  padding: theme.spacing(2),
}));

export default function ProfileCard() {
  const { currentStudent } = useStore();
  return (
    <ProfileCardContainer>
      <AvatarContainer>
        <Avatar sx={{ width: 80, height: 80 }}>J</Avatar>
      </AvatarContainer>
      <InfoContainer>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
          {currentStudent.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {currentStudent.email}
        </Typography>
        <Typography variant="body1" color="primary">
          Role:  {currentStudent.clubs.length ? 'Admin' : "User"} 
        </Typography>
      </InfoContainer>
    </ProfileCardContainer>
  );
}
