import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { Check, Info } from "lucide-react";
import InformasiTanggapan from "../components/complain/InformasiTanggapan";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/bukti-pengajuan.png";
import Breadcrumb from "../components/BreadCrumb";
import { STATUS, STEP_FLOW } from "../constants/complainStatusMap";

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

const fallbackMockData = {
    id: "R2345678901",
    waktu: "16 Juni 2025",
    nama: "Monitor Gaming",
    pembeli: "user1@example.com",
    noResi: "JX3474124013",
    ekspedisi: "J&T Express Indonesia",
    status: "Persetujuan Seller",
    asuransi: true,
    statusPengajuan: "Tanpa pengajuan",
};

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
    const komplainData = location.state?.data || fallbackMockData;

    // State dan handler identik dengan Barang Ga Sesuai
    const [status, setStatus] = useState(komplainData.status || "Persetujuan Seller");
    const [statusPengajuan, setStatusPengajuan] = useState(komplainData.statusPengajuan || "Tanpa pengajuan");
    const [adminActionTimestamp, setAdminActionTimestamp] = useState(null);
    const [isRejectedByAdmin, setIsRejectedByAdmin] = useState(false);
    const [resiPengembalian, setResiPengembalian] = useState(null);
    const [buyerReturnTimestamp, setBuyerReturnTimestamp] = useState(null);
    const [buyerTimeout, setBuyerTimeout] = useState(false);
    const [buyerConfirmTimestamp, setBuyerConfirmTimestamp] = useState(null);
    const [showNewSlicing, setShowNewSlicing] = useState(false);
    const [adminActionType, setAdminActionType] = useState(null);
    const [sellerConfirmTimestamp, setSellerConfirmTimestamp] = useState(null);

    const waktuBuatKomplain = "16 Juni 2025, 10:00 WIB";
    const waktuSellerSetuju = "16 Juni 2025, 12:00 WIB";
    const waktuSellerTolak = "16 Juni 2025, 12:00 WIB";
    const waktuAdminSetuju = adminActionTimestamp || "16 Juni 2025, 14:00 WIB";
    const waktuBuyerInputResi = buyerReturnTimestamp || "17 Juni 2025, 09:00 WIB";

    // LOGIC PEMBUATAN STEPS IDENTIK DENGAN BARANG GA SESUAI
    const steps = STEP_FLOW[status] || [];

    const handleSellerSetuju = () => {
        setStatus("Pengembalian Barang");
        setStatusPengajuan("Tanpa pengajuan");
        setIsRejectedByAdmin(false);
        setResiPengembalian(null);
        setBuyerReturnTimestamp(null);
        setBuyerTimeout(false);
    };
    const handleSellerTolak = () => {
        setStatus("Persetujuan Admin");
        setStatusPengajuan("Ditinjau");
        setIsRejectedByAdmin(false);
        setResiPengembalian(null);
        setBuyerReturnTimestamp(null);
        setBuyerTimeout(false);
    };
    const handleAdminSetuju = () => {
        if (!showNewSlicing) {
            setStatus("Pengembalian Barang");
            setStatusPengajuan("Ditinjau");
            setAdminActionTimestamp(formatDate(new Date()));
            setIsRejectedByAdmin(false);
            setResiPengembalian(null);
            setBuyerReturnTimestamp(null);
            setBuyerTimeout(false);
        } else {
            setAdminActionType('teruskan');
            setAdminActionTimestamp(formatDate(new Date()));
        }
    };
    const handleAdminTolak = () => {
        if (!showNewSlicing) {
            setStatus("Transaksi Selesai");
            setStatusPengajuan("Ditolak");
            setAdminActionTimestamp(formatDate(new Date()));
            setIsRejectedByAdmin(true);
            setResiPengembalian(null);
            setBuyerReturnTimestamp(null);
            setBuyerTimeout(false);
        } else {
            setAdminActionType('tolak');
            setAdminActionTimestamp(formatDate(new Date()));
        }
    };
    const handleBuyerInputResi = () => {
        setResiPengembalian("RETURRUSAK123456");
        setBuyerReturnTimestamp(formatDate(new Date()));
        setBuyerTimeout(false);
        setBuyerConfirmTimestamp(null);
        setShowNewSlicing(false);
    };
    const handleBuyerConfirm = () => {
        setBuyerConfirmTimestamp(formatDate(new Date()));
        setShowNewSlicing(true);
    };
    const handleBuyerNoConfirm = () => {
        setBuyerConfirmTimestamp(null);
        setShowNewSlicing(false);
        setAdminActionType(null);
        setAdminActionTimestamp(null);
        setSellerConfirmTimestamp(null);
    };
    const handleSellerConfirmReceived = () => {
        setSellerConfirmTimestamp(formatDate(new Date()));
    };
    const handleBuyerTimeout = () => {
        setStatus("Transaksi Selesai");
        setBuyerTimeout(true);
    };

    const handleNavigateToRekberDetail = () => {
        navigate(`/rekber-detail/${detailKomplain.komplain.idTransaksi}`);
    };

    // Mock nominal dan biaya (ganti dengan data API jika ada)
    const nominalBarang = komplainData?.nominalBarang || "Rp. 8.000.000,00";
    const biayaAsuransi = komplainData?.biayaAsuransi || "Rp. 16.000,00";
    const biayaJasa = komplainData?.biayaJasa || "Rp. 64.000,00";

    return (
        <div className="max-w-5xl mx-auto py-8 px-2">
            <Breadcrumb />
            <div className="flex flex-col md:flex-row gap-8">
                {/* Step Vertical di kiri */}
                <div className="md:w-1/3 w-full">
                    {showNewSlicing ? (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className={`flex items-center p-3 mb-4 rounded-lg ${sellerConfirmTimestamp
                                ? 'bg-[#E6F4EA] text-[#1E4620]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                                }`}>
                                {sellerConfirmTimestamp ? (
                                    <Check className="w-5 h-5 mr-3" />
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className="mr-3">
                                        <circle cx="10" cy="10" r="9" fill="none" stroke="#92400E" strokeWidth="2" />
                                        <path d="M10 6V10" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="10" cy="14" r="1" fill="#92400E" />
                                    </svg>
                                )}
                                <span className="text-base font-semibold">
                                    {sellerConfirmTimestamp ? 'Transaksi selesai' : 'Menunggu Pengembalian'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                                <p className="text-lg text-gray-600 mb-6">Barang Rusak</p>
                                <ol>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Waktu buat komplain</span>
                                            <span className="text-base font-bold text-gray-800">{waktuBuatKomplain}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Seller menyetujui komplain</span>
                                            <span className="text-base font-bold text-gray-800">{waktuSellerSetuju}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Buyer kirim resi pengembalian</span>
                                            <span className="text-base font-bold text-gray-800">{waktuBuyerInputResi}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className="text-base font-medium text-[#1c1c1c]">Dalam Pengiriman Balik</span>
                                            <span className="text-base font-bold text-gray-800">Barang sedang dalam perjalanan</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                                                <div className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${adminActionType ? 'bg-[#066afe] border-[#066afe]' : 'border-2 border-[#066afe] bg-white'
                                                    }`}>
                                                    {adminActionType && (
                                                        <svg width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            {adminActionType && <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />}
                                        </div>
                                        <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                            <span className={`text-base font-medium ${adminActionType ? 'text-[#1c1c1c]' : 'text-[#066afe] font-semibold'
                                                }`}>Buyer pengajuan konfirmasi</span>
                                            <span className="text-base font-bold text-gray-800">{buyerConfirmTimestamp}</span>
                                        </div>
                                    </div>
                                    {adminActionType && (
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-7 h-7 flex items-center justify-center`}>
                                                    <div className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${sellerConfirmTimestamp
                                                        ? 'bg-[#066afe] border-[#066afe]'
                                                        : adminActionType === 'teruskan'
                                                            ? 'bg-white border-4 border-blue-600'
                                                            : 'border-2 border-[#C30052] bg-white'
                                                        }`}>
                                                        {sellerConfirmTimestamp ? (
                                                            <svg width="16" height="16" viewBox="0 0 16 16">
                                                                <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                            </svg>
                                                        ) : adminActionType === 'teruskan' ? (
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                        ) : (
                                                            <div className="w-2 h-2 bg-[#C30052] rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                                {sellerConfirmTimestamp && <div className="w-0.5 h-12 bg-[#066afe] ml-[0px]" />}
                                            </div>
                                            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                                <span className={`text-base font-medium ${sellerConfirmTimestamp
                                                    ? 'text-[#1c1c1c]'
                                                    : adminActionType === 'teruskan'
                                                        ? 'text-[#066afe] font-semibold'
                                                        : 'text-[#C30052] font-semibold'
                                                    }`}>
                                                    {adminActionType === 'teruskan' ? 'Admin meneruskan pengajuan' : 'Admin menolak pengajuan'}
                                                </span>
                                                <span className="text-base font-bold text-gray-800">{adminActionTimestamp}</span>
                                            </div>
                                        </div>
                                    )}
                                    {sellerConfirmTimestamp && (
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-7 h-7 flex items-center justify-center">
                                                    <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                                                        <svg width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" fill="none" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                                                <span className="text-base font-medium text-[#1c1c1c]">Konfirmasi seller dan dana refunded</span>
                                                <span className="text-base font-bold text-gray-800">{sellerConfirmTimestamp}</span>
                                            </div>
                                        </div>
                                    )}
                                </ol>
                            </div>
                            {!adminActionType && (
                                <div className="flex gap-4 mt-8">
                                    <button onClick={handleAdminTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                                    <button onClick={handleAdminSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Teruskan</button>
                                </div>
                            )}
                            {adminActionType && !sellerConfirmTimestamp && (
                                <div className="flex gap-4 mt-8">
                                    <button onClick={handleSellerConfirmReceived} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#E6F4EA] text-[#1E4620] hover:bg-[#D4EDDA]">Simulate Seller Konfirmasi Diterima</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <VerticalStep
                            type="rusak"
                            complainType="Barang Rusak"
                            currentStatus={status}
                            steps={steps}
                            onTolak={handleAdminTolak}
                            onSetuju={handleAdminSetuju}
                            adminActionTimestamp={waktuAdminSetuju}
                            isRejectedByAdmin={isRejectedByAdmin}
                            statusPengajuan={statusPengajuan}
                            resiPengembalian={resiPengembalian}
                            buyerReturnTimestamp={waktuBuyerInputResi}
                        />
                    )}
                    <div className="mt-6 flex flex-col gap-2">
                        {status === "Persetujuan Seller" && (
                            <>
                                <button onClick={handleSellerSetuju} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Simulate Seller Setuju</button>
                                <button onClick={handleSellerTolak} className="bg-red-500 text-white px-4 py-2 rounded">Simulate Seller Tolak</button>
                            </>
                        )}
                        {status === "Persetujuan Admin" && (
                            <>
                                <button onClick={handleAdminSetuju} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Simulate Admin Setuju</button>
                                <button onClick={handleAdminTolak} className="bg-red-500 text-white px-4 py-2 rounded">Simulate Admin Tolak</button>
                            </>
                        )}
                        {status === "Pengembalian Barang" && !resiPengembalian && !buyerTimeout && (
                            <>
                                <button onClick={handleBuyerInputResi} className="bg-green-600 text-white px-4 py-2 rounded mb-2">Simulate Buyer Input Resi</button>
                                <button onClick={handleBuyerTimeout} className="bg-gray-500 text-white px-4 py-2 rounded">Simulate Buyer Melewati Batas Waktu</button>
                            </>
                        )}
                        {status === "Pengembalian Barang" && resiPengembalian && !buyerTimeout && !buyerConfirmTimestamp && (
                            <>
                                <button onClick={handleBuyerConfirm} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Simulate Buyer Ajukan Konfirmasi</button>
                                <button onClick={handleBuyerNoConfirm} className="bg-gray-500 text-white px-4 py-2 rounded">Simulate Tanpa Pengajuan Konfirmasi</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 font-sf-pro">Informasi Komplain</h2>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-base font-sf-pro transition"
                                onClick={handleNavigateToRekberDetail}
                            >
                                Lihat Detail Rekber
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Komplain</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{komplainData.id}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Transaksi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detailKomplain.komplain.idTransaksi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nama Barang</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{komplainData.nama}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Buyer</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{komplainData.pembeli}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Seller</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{detailKomplain.komplain.seller.email}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">No Resi Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro tracking-widest">{komplainData.noResi}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-sf-pro">Ekspedisi</p>
                                    <span className="text-sm font-medium text-gray-900 font-sf-pro">{komplainData.ekspedisi}</span>
                                </div>
                            </div>
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
            {!komplainData && <div>Data komplain tidak ditemukan.</div>}
        </div>
    );
};

export default DetailBarangRusakPage;