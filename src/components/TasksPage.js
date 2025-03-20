import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { getTasks, addTask, updateTask, deleteTask, getUsers } from '../api';
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 0,
    deadline: '',
    isCompleted: false,
    userId: 0
  });
  const handleNavigateToUsers = () => {
    navigate('/users');
  };

    // Handle logout
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
      };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  // Fetch users for the dropdown 
   const fetchUsers = async () => {
     try {
       const data = await getUsers();      
       setUsers(data);
     } catch (error) {
       //may need to add error statements here
     }
   };
  fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setApiError('Error fetching tasks');
    }
  };

  const handleAddTask = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 0,
      deadline: '',
      isCompleted: false,
      userId: 0
    });
    setAddTaskDialogOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setEditDialogOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      setApiError('Error deleting task');
    }
  };

  const handleNewTaskInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewTask = async () => {
    try {
      await addTask(newTask);
      fetchTasks();
      setAddTaskDialogOpen(false);
    } catch (error) {        
      setApiError('Error adding task');
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(currentTask.id, currentTask);
      fetchTasks();
      setEditDialogOpen(false);
    } catch (error) {
      setApiError('Error updating task');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Title and Logout */}
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
          Tasks List
        </Typography>
        <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateToUsers}
              sx={{        
                marginRight: '8px',
              }}
            >
              View Users
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

      {/* Tasks Table */}
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>              
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px', borderBottom: '2px solid #1976d2',}}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px',borderBottom: '2px solid #1976d2', }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px',borderBottom: '2px solid #1976d2', }}>
                Priority
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px',borderBottom: '2px solid #1976d2', }}>
                Deadline
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px',borderBottom: '2px solid #1976d2',}}>
                Is Completed
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px' ,borderBottom: '2px solid #1976d2',}}>
                UserName
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px', textAlign: 'center',borderBottom: '2px solid #1976d2', }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>                
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell>{task.isCompleted ? 'Yes' : 'No'}</TableCell>
                <TableCell>{task.userName}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="primary" onClick={() => handleEditTask(task)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Task Button */}
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ marginTop: '16px', alignSelf: 'center' }}>
        Add Task
      </Button>

      {/* Add Task Dialog */}
      <Dialog open={addTaskDialogOpen} onClose={() => setAddTaskDialogOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          {apiError && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {apiError}
            </Typography>
          )}
          <TextField
            label="Title"
            name="title"
            value={newTask.title}
            onChange={handleNewTaskInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleNewTaskInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Priority"
            name="priority"
            value={newTask.priority}
            onChange={handleNewTaskInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Deadline"
            name="deadline"
            type="date"
            value={newTask.deadline}
            onChange={handleNewTaskInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {/* Checkbox for isCompleted */}
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor="isCompleted">
        <input
          type="checkbox"
          name="isCompleted"
          checked={newTask.isCompleted}
          onChange={(e) => setNewTask((prev) => ({ ...prev, isCompleted: e.target.checked }))}
        />
        Is Completed
      </label>
    </div>
       {/* Select dropdown for UserId */}
       <TextField
      select
      label="User"
      name="userId"
      value={newTask.userId}
      onChange={handleNewTaskInputChange}
      fullWidth
      margin="normal"
      SelectProps={{
        native: true,
      }}
    >
      {/* Replace with actual users data */}
      <option value="">Select a user</option>     
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddTaskDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitNewTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {apiError && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {apiError}
            </Typography>
          )}
          <TextField
            label="Title"
            name="title"
            value={currentTask ? currentTask.title : ''}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentTask ? currentTask.description : ''}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Priority"
            name="priority"
            value={currentTask ? currentTask.priority : ''}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Deadline"
            name="deadline"
            type="date"
            value={currentTask ? currentTask.deadline.split('T')[0] : ''}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <div style={{ marginBottom: '16px' }}>
      <label htmlFor="isCompleted">
        <input
          type="checkbox"
          name="isCompleted"
          checked={currentTask ? currentTask.isCompleted : false}
          onChange={(e) => setCurrentTask((prev) => ({ ...prev, isCompleted: e.target.checked }))}
        />
        Is Completed
      </label>
    </div>
       {/* Select dropdown for UserId */}
       <TextField
      select
      label="User"
      name="userId"
      value={currentTask ? currentTask.userId : ''}
      onChange={handleEditInputChange}
      fullWidth
      margin="normal"
      SelectProps={{
        native: true,
      }}
    >
      {/* Replace with actual users data */}
      <option value="">Select a user</option>      
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
       </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TasksPage;
