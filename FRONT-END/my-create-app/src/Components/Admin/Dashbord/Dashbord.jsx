import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashbord.css';
import API from '../../../../config/AxiosConfig';

const Dashbord = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const token = localStorage.getItem('adminToken');
    navigate(`/adminEditUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await API.delete(`/admin/deleteUser?id=${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setOpenDialog(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCreateUser = () => {
    navigate('/createUser');
  };

  useEffect(() => {
    const allUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await API.get('/admin/getUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    allUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3} m={2}>
      <div className="create-user-button-container">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateUser}
          className="create-user-button"
        >
          Create User
        </Button>
      </div>
      
      {/* Search input */}
      <TextField 
        fullWidth
        variant="outlined"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        margin="normal"
      />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Name</TableCell>
              <TableCell className="table-header">Email</TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} className="table-row">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="action-button-container">
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEdit(user._id)} 
                      className="action-button"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => confirmDelete(user)}
                      className="action-button"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>  
            Are you sure you want to delete {selectedUser?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashbord;
