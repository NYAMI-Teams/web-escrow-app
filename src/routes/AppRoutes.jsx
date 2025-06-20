import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import BarangHilangPage from "../pages/BarangHilangPage";
import DetailBarangHilangPage from "../pages/DetailBarangHilangPage";
import BarangRusakPage from "../pages/BarangRusakPage";
import DetailBarangRusakPage from "../pages/DetailBarangRusakPage";
import BarangGaSesuaiPage from "../pages/BarangGaSesuaiPage";
import DetailBarangGaSesuaiPage from "../pages/DetailBarangGaSesuaiPage";

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
