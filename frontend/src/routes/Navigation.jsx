import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/LogIn/LogIn";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import RecommendationForm from "../pages/IndividualForm/IndividualForm";
import { useUser } from "../hooks/useUser";
import GroupRecommendationForm from "../pages/GroupForm/Group_form";
import GroupsDetail from "../pages/Groups/Groups";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useUser();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default function Navigation() {
  const { userName, userId } = useUser();
  
  console.log('Usuario logueado:', {
    nombre: userName,
    id: userId
  });

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/forms"
        element={
          <PrivateRoute>
            <RecommendationForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/groupform"
        element={
          <PrivateRoute>
            <GroupRecommendationForm/>
          </PrivateRoute>
        }
      />

      <Route
        path="/groups"
        element={
          <PrivateRoute>
            <GroupsDetail/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}