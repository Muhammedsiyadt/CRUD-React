import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashbord.css';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
];

const Dashbord = () => {
  const [users, setUsers] = useState(mockUsers);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/adminEditUser/${id}`);
  };

  const handleDelete = (id) => {
    console.log('Delete user with id:', id);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleCreateUser = () => {
    navigate('/createUser');
  };

  return (
    <Box p={3} m={2} >
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
            {users.map((user) => (
              <TableRow key={user.id} className="table-row">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="action-button-container">
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEdit(user.id)} 
                      className="action-button"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDelete(user.id)}
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
    </Box>
  );
};

export default Dashbord;
