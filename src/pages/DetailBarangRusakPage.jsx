import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import InformasiTanggapan from "../components/complain/InformasiTanggapan";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/bukti-pengajuan.png";

const BreadcrumbDetailComplain = ({ idKomplain }) => (
  <nav className="flex items-center space-x-2 text-sm mb-6">
    <a href="/barang-rusak" className="text-blue-600 hover:underline">Komplain Center</a>
    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
    <a href="/barang-rusak" className="text-blue-600 hover:underline">Komplain Barang Rusak</a>
    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
    <span className="text-gray-500">{idKomplain}</span>
  </nav>
);

const ComplainInfoSection = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

const formatDate = (date) => {
  if (!date) return '';
  const options = {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Asia/Jakarta', hour12: false
  };
  return new Intl.DateTimeFormat('id-ID', options).format(new Date(date)) + " WIB";
};

const DetailBarangRusakPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const komplainData = location.state?.data || {
    id: "12345678901",
    nama: "iPhone 13 Pro Max",
    pembeli: "bayuseptyan925@gmail.com",
  };

  const [status, setStatus] = useState(komplainData.status || "Menunggu seller setuju");
  const [adminActionTimestamp, setAdminActionTimestamp] = useState(null);
  const [isRejectedByAdmin, setIsRejectedByAdmin] = useState(false);

  const handleNavigateToRekberDetail = () => navigate(`/rekber/123456789`);

  const steps = [
    { name: 'Waktu buat komplain', description: '16 Juni 2025, 10:00 WIB', status: 'complete' },
    { name: 'Menunggu seller setuju', description: '', status: 'current' },
    { name: 'Kirim barang ke penjual', description: '', status: 'upcoming' },
    { name: 'Konfirmasi barang diterima', description: '', status: 'upcoming' },
    { name: 'Pengembalian dana', description: '', status: 'upcoming' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BreadcrumbDetailComplain idKomplain={komplainData.id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Komplain */}
        <div className="lg:col-span-1">
          <VerticalStep
            type="rusak"
            complainType="Barang Rusak"
            currentStatus={status}
            steps={steps}
            onTolak={() => {
              setStatus("Dibatalkan");
              setIsRejectedByAdmin(false);
            }}
            onSetuju={() => setStatus("Pengembalian Barang")}
            adminActionTimestamp={formatDate(adminActionTimestamp)}
            isRejectedByAdmin={isRejectedByAdmin}
          />
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-2">
          {/* Informasi Tanggapan */}
          <InformasiTanggapan status={status} />

          {/* Informasi Komplain */}
          <ComplainInfoSection title="Informasi Komplain">
            <InfoRow label="ID Komplain" value={komplainData.id} />
            <InfoRow label="ID Transaksi" value="123456789" />
            <InfoRow label="Nama Barang" value={komplainData.nama} />
            <InfoRow label="Status" value={status} />
            <InfoRow label="Pembeli" value={komplainData.pembeli} />
            <InfoRow label="Penjual" value="seller_shop@gmail.com" />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleNavigateToRekberDetail}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Lihat Detail Rekber
              </button>
            </div>
          </ComplainInfoSection>

          {/* Bukti Pengajuan */}
          <ComplainInfoSection title="Bukti Pengajuan Pembeli">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Video Unboxing Paket</h3>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Video Placeholder</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Foto Barang</h3>
                <img src={buktiPengirimanImg} alt="Bukti barang" className="rounded-md w-full" />
              </div>
            </div>
          </ComplainInfoSection>
        </div>
      </div>
    </div>
  );
};

export default DetailBarangRusakPage;