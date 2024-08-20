import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashbord.css';
import API from '../../../../config/AxiosConfig';




const Dashbord = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/adminEditUser/${id}`);
  };

  const handleDelete = async(id) => {
    try {
      await API.delete(`/admin/deleteUser?id=${id}`)
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.log(error);
      
    }
  }; 

  const handleCreateUser = () => {
    navigate('/createUser');
  };

  useEffect(() =>{

      
    const allUsers = async() => {
      
      try {
        const res = await API.get('/admin/getUsers')
        // console.log(res.data);
        setUsers(res.data.users) 

      } catch (error) {
        console.log(error); 
      }

    }
    allUsers() 
    
  },[])    

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
                      onClick={() => handleDelete(user._id)}
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
