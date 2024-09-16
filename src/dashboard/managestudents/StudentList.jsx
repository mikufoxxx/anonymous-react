import React, { useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import adminApi from '../../api/admin';
import useSWRImmutable from 'swr/immutable';
import useStore from '../../store';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';

// 假设学生数据
const studentsData = [
  { id: 1, name: 'John Doe', role: 'student', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', role: 'admin', email: 'jane@example.com' },
  { id: 3, name: 'Alex Johnson', role: 'student', email: 'alex@example.com' },
  { id: 4, name: 'Michael Brown', role: 'student', email: 'michael@example.com' },
  { id: 5, name: 'Emily Davis', role: 'admin', email: 'emily@example.com' },
  { id: 6, name: 'David Wilson', role: 'student', email: 'david@example.com' },
];

export default function StudentList() {
  const [students, setStudents] = useState(studentsData);
  const [page, setPage] = useState(1);
  const studentsPerPage = 3;

  // 对话框状态
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [adminForm, setAdminForm] = useState({
    studentID: '',
    clubID: '',
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 打开设为管理员的对话框
  const handleOpenAdminDialog = (student) => {
    setSelectedStudent(student);
    setAdminForm({
      studentID: student.id,  // 自动填写学生 ID
      clubID: '',             // 需要手动输入 clubID
    });
    setOpenDialog(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 处理输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({ ...adminForm, [name]: value });
  };

  const { trigger: addAdmin, isLoading } = useSWRMutation("addAdmin", () => {
    return adminApi.addAdmin(adminForm)
  }, {
    onSuccess: () => {
      toast.success("add success"); // 使用 Toastify 弹出错误信息
    }
  })
  const { trigger: deleteAdmin, isLoading:isRmLoading } = useSWRMutation("deleteAdmin", () => {
    return adminApi.deleteAdmin(adminForm)
  }, {
    onSuccess: () => {
      toast.success("removed success");
    }
  })
  // 确认设为管理员操作
  const handleConfirmAdmin = () => {
    // setStudents(students.map(student =>
    //   student.id === selectedStudent.id ? { ...student, role: 'admin' } : student
    // ));
    setOpenDialog(false);  // 关闭对话框
  };

  // 移除管理员身份
  const handleRemoveAdmin = (student) => {
    // setStudents(students.map(stu =>
    //   stu.id === student.id ? { ...stu, role: 'student' } : stu
    // ));
    deleteAdmin();
  };

  // 获取当前页的学生数据
  const startIndex = (page - 1) * studentsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + studentsPerPage);
  const { currentStudent } = useStore();

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
        <CardContent component={"form"}>
          {/* 滚动列表展示学生数据 */}
          <DialogTitle>Set {selectedStudent?.name} as Admin</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Student ID"
              type="text"
              fullWidth
              name="studentID"
              value={adminForm.studentID}
              onChange={handleInputChange}
            />
           
            <FormControl fullWidth margin="dense">
              <InputLabel id="venue-select-label">Club</InputLabel>
              <Select
              name="clubID"
              value={adminForm.clubID}
              onChange={handleInputChange}
              >
                {currentStudent.clubs.map((venue) => (
                  <MenuItem key={venue.clubID} value={venue.clubID}>
                    {venue.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteAdmin} isLoading={isRmLoading} >Remove Admin</Button>
            <Button onClick={addAdmin} variant="contained" isLoading={isLoading} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </CardContent>
      </Card>


      {/* 设为管理员对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Set {selectedStudent?.name} as Admin</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Student ID"
            type="text"
            fullWidth
            name="studentID"
            value={adminForm.studentID}
            onChange={handleInputChange}
            disabled  // 默认自动填入，不能编辑
          />
          <TextField
            margin="dense"
            label="Club ID"
            type="text"
            fullWidth
            name="clubID"
            value={adminForm.clubID}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAdmin} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
