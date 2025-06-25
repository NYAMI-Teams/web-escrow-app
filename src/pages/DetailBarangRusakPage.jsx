//DetailBarangRusakPage.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
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

  const currentStep = steps.find(step => step.status === 'current');

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
            onTolak={() => setStatus("Transaksi Selesai")}
            onSetuju={() => setStatus("Pengembalian Barang")}
            adminActionTimestamp={formatDate(adminActionTimestamp)}
            isRejectedByAdmin={isRejectedByAdmin}
          />
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-2">
          {/* Informasi Tanggapan */}
          <ComplainInfoSection title="Informasi Tanggapan">
            {/* Label solusi */}
            <div className="inline-block bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-md mb-6">
              Pengembalian barang dan dana
            </div>

            {/* Chat bubble kiri: komentar */}
            <div className="flex mb-4">
              <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none max-w-md">
                Layar barang pecah di bagian tengah dan ada goresan dalam di sisi kiri.
              </div>
            </div>

            {/* Chat bubble kiri: media */}
            <div className="flex gap-4 mb-2">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex flex-col items-start gap-2 bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={buktiPengirimanImg}
                      alt={`Bukti ${i + 1}`}
                      className="w-56 h-auto object-cover rounded-md"
                    />
                    {i === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                      Download
                    </button>
                    <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat bubble kiri: info email dan waktu */}
            <div className="flex">
              <div className="text-xs text-gray-500 ml-2">
                zhirazzi@gmail.com · <strong>16 Juni 2025, 10:00 WIB</strong>
              </div>
            </div>

            {/* Chat bubble kanan: status dari step saat ini */}
            <div className="flex justify-end mt-6">
              {currentStep?.name && (
                <div className="bg-blue-900 text-white text-sm px-4 py-3 rounded-lg rounded-tr-none w-fit min-w-[320px] text-right">
                  {currentStep.name} ataupun menolak komplain ini .....
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <p className="text-xs text-red-600 mt-1 text-right">
                Menunggu respon sampai <strong>18 Juni 2025, 10.00 WIB</strong>
              </p>
            </div>
          </ComplainInfoSection>

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
