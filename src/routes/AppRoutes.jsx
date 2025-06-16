import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Users from "../pages/User";
import Transaksi from "../pages/Transaksi";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
              <MainLayout>
                
                <Users />
              </MainLayout>
          }
        />

        <Route
          path="/transaksi"
          element={
              <MainLayout>
                <Transaksi />
              </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
