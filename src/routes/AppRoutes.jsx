import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path='/users'
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
