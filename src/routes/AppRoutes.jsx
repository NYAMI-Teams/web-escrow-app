import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Users from "../pages/User";
import Transaksi from "../pages/Transaksi";
import Login from "../pages/Login";
import { UserDetail } from "../pages/UserDetail";
import RekberDetailPage from "../pages/RekberDetailPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/user'
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />

        <Route
          path='/transactions'
          element={
            <MainLayout>
              <Transaksi />
            </MainLayout>
          }
        />

        <Route
          path='transactions/:transactionId'
          element={
            <MainLayout>
              <RekberDetailPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
