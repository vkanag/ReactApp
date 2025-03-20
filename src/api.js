import axios from "axios";

// Base URL for your API
const API_URL = "http://localhost";

// Function to set the authorization token in the header
export const setAuthHeader = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;      
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  

// Login API call
export const login = async (username, password) => {    
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
      }
      return response.data;    
  };
  

// Users API calls
export const getUsers = async () => {
  setAuthHeader();  
  const response = await axios.get(`${API_URL}/user`);
  return response.data;  
};

export const addUser = async (user) => {
  setAuthHeader();  
  const response = await axios.post(`${API_URL}/user`, user);
  return response.data;
  
};

export const updateUser = async (userId, user) => {
  setAuthHeader();  
  const response = await axios.put(`${API_URL}/user/${userId}`, user);
  return response.data;  
};

export const deleteUser = async (userId) => {
  setAuthHeader();  
  const response = await axios.delete(`${API_URL}/user/${userId}`);
  return response.data;  
};

// Tasks API calls
export const getTasks = async () => {
  setAuthHeader();  
    const response = await axios.get(`${API_URL}/task`);
    return response.data;  
};

export const addTask = async (task) => {
  setAuthHeader();  
    const response = await axios.post(`${API_URL}/task`, task);
    return response.data;   
};

export const updateTask = async (taskId, task) => {
  setAuthHeader();
  
    const response = await axios.put(`${API_URL}/task/${taskId}`, task);
    return response.data; 
  
};

export const deleteTask = async (taskId) => {
  setAuthHeader();
 
    const response = await axios.delete(`${API_URL}/task/${taskId}`);
    return response.data; 
  
};
