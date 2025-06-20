import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/contoh-resi.png";

const detailKomplain = {
    komplain: {
        idTransaksi: "123456789",
        namaBarang: "Smartphone Canggih",
        seller: { email: "seller_shop@gmail.com" },
    }
};

const BreadcrumbDetailComplain = ({ idKomplain }) => (
    <nav className="flex items-center space-x-2 text-sm mb-6">
        <a href="/barang-ga-sesuai" className="text-blue-600 hover:underline">Komplain Center</a>
        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        <a href="/barang-ga-sesuai" className="text-blue-600 hover:underline">Komplain Barang Ga Sesuai</a>
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

const DetailBarangGaSesuaiPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const komplainData = location.state?.data || {};

    const [status, setStatus] = useState(komplainData.status || "Persetujuan Seller");

    const handleNavigateToRekberDetail = () => {
        navigate(`/rekber/${detailKomplain.komplain.idTransaksi}`);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        // Di sini Anda bisa menambahkan logika untuk memanggil API backend
    };

    const steps = [
        { name: 'Waktu buat komplain', description: '19 Juni 2025, 11:30 WIB', status: 'complete' },
        { name: 'Menunggu seller setuju', description: '', status: 'current' },
        { name: 'Kirim barang ke penjual', description: '', status: 'upcoming' },
        { name: 'Konfirmasi barang diterima', description: '', status: 'upcoming' },
        { name: 'Pengembalian dana', description: '', status: 'upcoming' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <BreadcrumbDetailComplain idKomplain={komplainData.id} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <VerticalStep
                        type="rusak"
                        complainType="Barang Ga Sesuai"
                        currentStatus={status}
                        steps={steps}
                        onTolak={() => handleStatusChange('Dibatalkan')}
                        onSetuju={() => handleStatusChange('Transaksi Selesai')}
                    />
                </div>
                <div className="lg:col-span-2">
                    <ComplainInfoSection title="Informasi Komplain">
                        <InfoRow label="ID Komplain" value={komplainData.id} />
                        <InfoRow label="ID Transaksi" value={detailKomplain.komplain.idTransaksi} />
                        <InfoRow label="Nama Barang" value={komplainData.nama} />
                        <InfoRow label="Status" value={status} />
                        <InfoRow label="Pembeli" value={komplainData.pembeli} />
                        <InfoRow label="Penjual" value={detailKomplain.komplain.seller.email} />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleNavigateToRekberDetail}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Lihat Detail Rekber
                            </button>
                        </div>
                    </ComplainInfoSection>

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

export default DetailBarangGaSesuaiPage; 