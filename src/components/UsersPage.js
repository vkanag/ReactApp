import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getUsers, addUser, updateUser, deleteUser } from "../api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const [newUser, setNewUser] = useState({ name: "", email: "" }); 
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false); 
  const [nameError, setNameError] = useState('');  
  const [emailError, setEmailError] = useState(''); 
  const [apiError, setApiError] = useState(''); 
  const navigate = useNavigate();

  const handleNavigateToTasks = () => {
    navigate('/tasks'); 
  };

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers(); 
      setUsers(data); 
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [navigate]); 

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/"); 
  };


  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };
  
  const handleSubmitNewUser = async () => {      
      setNameError('');
      setEmailError('');
      setApiError(''); 
    try {      
      if (!newUser.name) {
        setNameError("Name is required");
        return;
      }
      if (!newUser.email) {
        setEmailError("Email is required");
        return;
      }

      const data = await addUser(newUser); 
      setUsers((prevUsers) => [...prevUsers, data]); 
      setAddUserDialogOpen(false);
      setNewUser({ name: "", email: "" }); 
    } catch (error) {      
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data; 
      setApiError(errorMessage); 
    } else {
      setApiError("An unexpected error occurred. Please try again later.");
    }
    }
  };
  
  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };
 
  const handleDeleteUser = async(userId) => {    
    try{
    await deleteUser(userId).then(() => setUsers(users.filter((user) => user.id !== userId)));
    }
    catch (error) {       
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data; 
        alert(errorMessage); 
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }      
    }
  };
 
  const handleEditUser = (user) => {
    setCurrentUser(user); 
    setEditDialogOpen(true); 
    setNameError('');
    setEmailError('');
  };

  const handleUpdateUser = async () => {    
    setNameError('');
    setEmailError('');
    setApiError(''); 
    try {      
      if (!currentUser.name) {
        setNameError("Name is required");
        return;
      }
      if (!currentUser.email) {
        setEmailError("Email is required");
        return;
      }
    
    const updatedUser = {
      ...currentUser, 
      name: currentUser.name,
      email: currentUser.email,
    };    
     
      const updatedData = await updateUser(currentUser.id, updatedUser);      
      
      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          user.id === currentUser.id ? { ...user, ...updatedData } : user
        );
      });      
      setEditDialogOpen(false);    
      fetchUsers();  
    } catch (error) {      
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data; 
      setApiError(errorMessage); 
    } else {
      setApiError("An unexpected error occurred. Please try again later.");
    }
    }
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
<Container
  sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
  }}
>
  {/* Flex container for Title and Logout button */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%',
      marginBottom: '16px', 
    }}
  >
<Typography
  variant="h4"
  gutterBottom
  sx={{
    fontWeight: 'bold', 
    fontSize: '2rem',  
    color: '#1976d2', 
    textTransform: 'uppercase', 
    letterSpacing: '1px',  
    paddingBottom: '8px', 
    textAlign: 'center', 
    marginTop: '18px', 
  }}
>
  Users List
</Typography>
<div>
    <Button
      variant="contained"
      color="primary"
      onClick={handleNavigateToTasks}
      sx={{        
        marginRight: '8px', 
      }}
    >
      View Tasks
    </Button>

    
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
    >
      Logout
    </Button>
  </div>
  </div>

  {/* Table to Display Users */}
  <TableContainer sx={{ marginTop: 2 }}>
    <Table>
      <TableHead>
        <TableRow>          
          <TableCell
            sx={{
              fontWeight: 'bold', 
              fontSize: '1.1rem', 
              color: '#1976d2', 
              backgroundColor: '#f5f5f5', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px', 
              padding: '12px', 
              borderBottom: '2px solid #1976d2', 
            }}
          >
            Name
          </TableCell>

          {/* Email Column Header */}
          <TableCell
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#1976d2',
              backgroundColor: '#f5f5f5',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '12px',
              borderBottom: '2px solid #1976d2',
            }}
          >
            Email
          </TableCell>

          {/* Actions Column Header */}
          <TableCell
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#1976d2',
              backgroundColor: '#f5f5f5',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '12px',
              textAlign: 'center', 
              borderBottom: '2px solid #1976d2', 
            }}
          >
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteUser(user.id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* Add User Button below the table */}
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddUser}
    sx={{
      marginTop: '16px', 
      alignSelf: 'center', 
    }}
  >
    Add User
  </Button>

  {/* Add User Dialog */}
  <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)}>
    <DialogTitle>Add New User</DialogTitle>
    <DialogContent>
    {apiError && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {apiError}
        </Typography>
      )}
      <TextField
        label="Name"
        name="name"
        value={newUser.name}
        onChange={handleNewUserInputChange}
        fullWidth
        margin="normal"
        error={!!nameError} 
        helperText={nameError} 
      />
      <TextField
        label="Email"
        name="email"
        value={newUser.email}
        onChange={handleNewUserInputChange}
        fullWidth
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setAddUserDialogOpen(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleSubmitNewUser} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>

  {/* Edit User Dialog */}
  <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
    {apiError && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {apiError}
            </Typography>
          )}
      <TextField
        label="Name"
        name="name"
        value={currentUser ? currentUser.name : ""}
        onChange={handleEditInputChange}
        fullWidth
        margin="normal"
        error={!!nameError} 
        helperText={nameError} 
      />
      <TextField
        label="Email"
        name="email"
        value={currentUser ? currentUser.email : ""}
        onChange={handleEditInputChange}
        fullWidth
        margin="normal"
        error={!!emailError}
        helperText={emailError} 
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setEditDialogOpen(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdateUser} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
</Container>

  );
};

export default UsersPage;
