import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/bukti-pengajuan.png";

// Data komplain, mapping dari API
const detailKomplain = {
    komplain: {
        idKomplain: "R2345678901",
        idTransaksi: "123456789",
        namaBarang: "Monitor Gaming",
        buyer: { email: "user1@example.com", userId: "RBK-0000010" },
        seller: { email: "irgi168@gmail.com", userId: "RBK-0000001" },
        noResi: "JX3474124013",
        ekspedisi: "J&T Express Indonesia",
    }
};

const mapStatusToStep = (status) => {
    switch (status) {
        case "Proses Mediasi":
        case "Menunggu Bukti":
        case "Pengembalian Barang":
            return "dalamInvestigasi";
        case "Komplain Selesai":
            return "selesai";
        case "Dibatalkan":
            return "dibatalkan";
        default:
            return "dalamInvestigasi";
    }
};

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
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta', hour12: false };
    return new Intl.DateTimeFormat('id-ID', options).format(date).replace('.', ':') + " WIB";
};

const DetailBarangRusakPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const komplainData = location.state?.data || {};

    const [status, setStatus] = useState(komplainData.status || "Persetujuan Admin");
    const [adminActionTimestamp, setAdminActionTimestamp] = useState(null);
    const [isRejectedByAdmin, setIsRejectedByAdmin] = useState(false);

    const handleNavigateToRekberDetail = () => {
        navigate(`/rekber/123456789`); // Placeholder ID
    };

    const handleSetuju = () => {
        setStatus('Pengembalian Barang');
        setAdminActionTimestamp(new Date());
        setIsRejectedByAdmin(false);
    };

    const handleTolak = () => {
        setStatus('Transaksi Selesai');
        setAdminActionTimestamp(new Date());
        setIsRejectedByAdmin(true);
    };

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
                <div className="lg:col-span-1">
                    <VerticalStep
                        type="rusak"
                        complainType="Barang Rusak"
                        currentStatus={status}
                        steps={steps}
                        onTolak={handleTolak}
                        onSetuju={handleSetuju}
                        adminActionTimestamp={formatDate(adminActionTimestamp)}
                        isRejectedByAdmin={isRejectedByAdmin}
                    />
                </div>
                <div className="lg:col-span-2">
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