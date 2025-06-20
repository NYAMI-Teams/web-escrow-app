import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import User from "../pages/User";
import BarangHilangPage from "../pages/BarangHilangPage";
import DetailBarangHilangPage from "../pages/DetailBarangHilangPage";
import BarangRusakPage from "../pages/BarangRusakPage";
import DetailBarangRusakPage from "../pages/DetailBarangRusakPage";
import BarangGaSesuaiPage from "../pages/BarangGaSesuaiPage";
import DetailBarangGaSesuaiPage from "../pages/DetailBarangGaSesuaiPage";
import Transaksi from "../pages/Transaksi";
import Login from "../pages/Login";
import RekberDetailPage from "../pages/RekberDetailPage";
import ProtectedRoute from "./ProtectedRoute"; // tambahkan ini
import { UserDetail } from "../pages/UserDetail";

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
                <User />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/users/:usersId'
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Login />} />
        {/* <Route
          path="/user/detail"
          element={
            <MainLayout>
              <UserDetail/>
            </MainLayout>
          }
        /> */}

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
        <Route
          path='/barang-hilang'
          element={
            <MainLayout>
              <BarangHilangPage />
            </MainLayout>
          }
        />
        <Route
          path='/barang-hilang/:id'
          element={
            <MainLayout>
              <DetailBarangHilangPage />
            </MainLayout>
          }
        />
        <Route
          path='/barang-rusak'
          element={
            <MainLayout>
              <BarangRusakPage />
            </MainLayout>
          }
        />
        <Route
          path='/barang-rusak/:id'
          element={
            <MainLayout>
              <DetailBarangRusakPage />
            </MainLayout>
          }
        />
        <Route
          path='/barang-ga-sesuai'
          element={
            <MainLayout>
              <BarangGaSesuaiPage />
            </MainLayout>
          }
        />
        <Route
          path='/barang-ga-sesuai/:id'
          element={
            <MainLayout>
              <DetailBarangGaSesuaiPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
