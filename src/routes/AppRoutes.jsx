import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Users from "../pages/User";
import Transaksi from "../pages/Transaksi";
import Login from "../pages/Login";
import RekberDetailPage from "../pages/RekberDetailPage";
import ProtectedRoute from "./ProtectedRoute"; // tambahkan ini

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/users'
          element={
            <ProtectedRoute>
              <MainLayout>
                <Users />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/transactions'
          element={
            <ProtectedRoute>
              <MainLayout>
                <Transaksi />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/transactions/:transactionId'
          element={
            <ProtectedRoute>
              <MainLayout>
                <RekberDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
