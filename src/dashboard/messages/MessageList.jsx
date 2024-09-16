import React, { useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, Avatar, Pagination
} from '@mui/material';
import useSWR from 'swr';
import MessageApi from '../../api/messages';
import useStore from '../../store';
import useSWRMutation from 'swr/mutation';
import { useEffect } from 'react';

// 假设消息列表数据
const data = [
  { id: 1, name: 'John Doe', avatar: 'J', content: 'Hey, are you coming to the meeting?', dateTime: '2024-08-15 14:00' },
  { id: 2, name: 'Jane Smith', avatar: 'S', content: 'Please review the document by tomorrow.', dateTime: '2024-09-10 16:00' },
  { id: 3, name: 'Alex Johnson', avatar: 'A', content: 'Your RSVP for the event is confirmed.', dateTime: '2024-09-20 10:00' },
  { id: 4, name: 'Michael Brown', avatar: 'M', content: 'Can you send the report?', dateTime: '2024-10-01 12:00' },
  { id: 5, name: 'Emily Davis', avatar: 'E', content: 'Let’s have a team meeting tomorrow.', dateTime: '2024-10-10 09:00' },
  { id: 6, name: 'David Wilson', avatar: 'D', content: 'Meeting is scheduled at 4 PM.', dateTime: '2024-11-15 18:00' },
]


export default function MessageList() {
  const [messages, setMessages] = useState([]);  // 使用状态存储消息
  const { currentStudent,setCurrentStudent } = useStore();
  const {trigger:mutate,data} =useSWRMutation("getMessagesByStudentId", () => {
    return MessageApi.getMessagesByStudentId(currentStudent.studentID)
  }, {
    onSuccess: ({ data }) => {
      setCurrentStudent({
        ...currentStudent,
        messageCount:data?.messages?.length
      })
      setMessages(data?.messages||[])
    }
  })

  useEffect(()=>{mutate()},[])

  const {trigger:clear} =useSWRMutation("deleteMessagesByStudentId", () => {
    return MessageApi.deleteMessagesByStudentId(currentStudent.studentID)
  }, {
    onSuccess: ({data:deleteAll}) => {
      mutate()
    }
  })

  const {trigger:deleteItem} =useSWRMutation("deleteOneMessagesByStudentId", (_,{arg}) => {
    return MessageApi.deleteOneMessagesByStudentId(currentStudent.studentID,arg)
  }, {
    onSuccess: ({data}) => {
      mutate()
    }
  })

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [page, setPage] = useState(1);
  const messagesPerPage = 3;

  // 处理分页
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 打开消息对话框（可选）
  const handleOpenDialog = (message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  // 关闭消息对话框
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 删除单条消息
  const handleDeleteMessage = (id) => {
    // setMessages(messages.filter((message) => message.id !== id)); // 过滤掉已删除的消息
    trigger()
  };

  // 清空所有消息
  const handleClearAllMessages = () => {
    setMessages([]); // 将消息列表清空
  };

  // 获取当前页的消息数据
  const startIndex = (page - 1) * messagesPerPage;
  const paginatedMessages = messages.slice(startIndex, startIndex + messagesPerPage);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: '80%', maxHeight: '600px', overflowY: 'auto' }}>
        <CardContent>
          {/* 消息列表展示 */}
          <List>
            {paginatedMessages.map((message,messageIndex) => (
              <ListItem
                key={message.id}
                sx={{
                  backgroundColor: 'rgba(46, 59, 85, 0.7)', // 50%透明度
                  color: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ bgcolor: '#FF5722', marginRight: 2 }}>{message.avatar}</Avatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {message.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {message.message}
                      </Typography>
                      <br />
                      {message.timestamp ?<Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Date:  {(new Date(message.timestamp)).toLocaleString()}
                      </Typography>:<Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Type:  {message.type}
                      </Typography>}
                    </>
                  }
                />

                <Button
                  variant="contained"
                  onClick={() => deleteItem(messageIndex)}
                  sx={{ backgroundColor: '#FF5722' }}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* 分页组件 */}
      <Pagination
        count={Math.ceil(messages.length / messagesPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2 }}
      />

      {/* 清空所有消息的按钮 */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={clear}
        disabled={messages.length === 0} // 如果没有消息，则禁用按钮
      >
        Clear All Messages
      </Button>

      {/* 可选：显示消息的详细信息 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
        <DialogContent>
          <Typography>{selectedMessage?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
