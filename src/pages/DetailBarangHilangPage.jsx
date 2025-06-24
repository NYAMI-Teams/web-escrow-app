import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { ArrowDownToLine, Eye } from "lucide-react";
import buktiPengirimanImg from "../assets/contoh-resi.png";
import Breadcrumb from "../components/BreadCrumb";

// Data komplain, mapping dari API
const detailKomplain = {
    trackingStatus: "menungguPersetujuanAdmin",
    komplain: {
        idKomplain: "12345678901",
        idTransaksi: "123456789",
        namaBarang: "iPhone 13 Pro Max",
        buyer: { email: "bayuseptyan925@gmail.com", userId: "RBK-0000010" },
        seller: { email: "irgi168@gmail.com", userId: "RBK-0000001" },
        noResi: "JX3474124013",
        ekspedisi: "J&T Express Indonesia",
        buktiPengiriman: buktiPengirimanImg
    }
};

// Mapping status dari tabel ke status VerticalStepComplain
const mapStatusToStep = (status) => {
    switch (status) {
        case "Dalam Investigasi":
            return "dalamInvestigasi";
        case "Komplain Ditolak":
            return "ditolak";
        case "Transaksi Selesai":
            return "selesai";
        case "Dibatalkan":
            return "dibatalkan";
        default:
            return "dalamInvestigasi";
    }
};

const DetailBarangHilangPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rowData = location.state?.data;
    // Fallback ke mock jika tidak ada data dari state
    const detail = rowData
        ? {
            trackingStatus: "menungguPersetujuanAdmin", // mapping status tracking sesuai kebutuhan
            komplain: {
                idKomplain: rowData.id,
                idTransaksi: "123456789", // bisa mapping dari rowData jika ada
                namaBarang: rowData.nama,
                buyer: { email: rowData.pembeli, userId: "RBK-0000010" },
                seller: { email: "irgi168@gmail.com", userId: "RBK-0000001" },
                noResi: rowData.noResi,
                ekspedisi: rowData.ekspedisi,
                buktiPengiriman: buktiPengirimanImg,
            },
        }
        : detailKomplain;
    const [currentStatus, setCurrentStatus] = useState(detail.trackingStatus);
    // State untuk status step vertical (default dari data tabel)
    const [stepStatus, setStepStatus] = useState(mapStatusToStep(rowData?.status));

    // Handler tombol aksi
    const handleSetuju = () => {
        if (stepStatus === 'dalamInvestigasi') setStepStatus('selesai');
    };
    const handleTolak = () => {
        if (stepStatus === 'dalamInvestigasi') setStepStatus('ditolak');
    };

    // Mock nominal dan biaya (ganti dengan data API jika ada)
    const nominalBarang = rowData?.nominalBarang || "Rp. 8.000.000,00";
    const biayaAsuransi = rowData?.biayaAsuransi || "Rp. 16.000,00";
    const biayaJasa = rowData?.biayaJasa || "Rp. 64.000,00";

    return (
        <div className="max-w-5xl mx-auto py-8 px-2">
            <Breadcrumb />
            <div className="flex flex-col md:flex-row gap-8">
                {/* Step Vertical di kiri */}
                <div className="md:w-1/3 w-full">
                    <VerticalStep
                        type="hilang"
                        status={stepStatus}
                        onTolak={handleTolak}
                        onSetuju={handleSetuju}
                    />
                </div>
                {/* Informasi di kanan */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Card utama: layout identik RekberInfoSection */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 font-sf-pro">Informasi Komplain</h2>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-base font-sf-pro transition"
                                onClick={() => navigate(`/rekber-detail/${detail.komplain.idTransaksi}`)}
                            >
                                Lihat Detail Rekber
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Kolom Kiri */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Komplain</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.idKomplain}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Transaksi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.idTransaksi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nama Barang</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.namaBarang}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Buyer</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.buyer.email}</span>
                                    <div className="text-xs text-gray-500 font-sf-pro">{detail.komplain.buyer.userId}</div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Seller</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.seller.email}</span>
                                    <div className="text-xs text-gray-500 font-sf-pro">{detail.komplain.seller.userId}</div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">No Resi Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro tracking-widest">{detail.komplain.noResi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detail.komplain.ekspedisi}</span>
                                </div>
                            </div>
                            {/* Kolom Kanan */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Tagihan Rekber</p>
                                    <div className="bg-gray-100 rounded px-4 py-2 text-lg font-bold text-gray-900 font-sf-pro">Rp. 8.080.000,00</div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nominal Barang</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{nominalBarang}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Asuransi Pengiriman BNI Life (0.2%)</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{biayaAsuransi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Biaya Jasa Aplikasi (0.8 %)</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{biayaJasa}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBarangHilangPage; 