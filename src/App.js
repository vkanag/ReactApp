import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import UsersPage from "./components/UsersPage";
import TasksPage from "./components/TasksPage"; 
import PrivateRoute from "./PrivateRoute"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
