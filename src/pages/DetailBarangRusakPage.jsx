import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerticalStepRusak } from "../components/complain/VerticalStep";
import StatusStepSelector from "../components/complain/StatusStepSelector";
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
    console.log("DetailBarangRusakPage: Component rendering");

    const location = useLocation();
    const navigate = useNavigate();
    const komplainData = location.state?.data || fallbackMockData;
    const stepStatusFromTable = location.state?.stepStatus;

    console.log("DetailBarangRusakPage: komplainData", komplainData);
    console.log("DetailBarangRusakPage: stepStatusFromTable", stepStatusFromTable);

    // State untuk mengontrol status yang ditampilkan
    const [currentStep, setCurrentStep] = useState(stepStatusFromTable || 'menungguSeller'); // 'menungguSeller', 'sellerSetuju', 'sellerTolak', 'adminSetuju', 'adminTolak', 'dalamPengirimanBalik', 'buyerAjukanKonfirmasi', 'teruskanKonfirmasiBuyer', 'tolakKonfirmasiBuyer', 'transaksiSelesai'

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

    // Fungsi untuk mendapatkan mock data berdasarkan currentStep
    const getMockDataByStep = () => {
        console.log("DetailBarangRusakPage: getMockDataByStep called with currentStep", currentStep);

        try {
            switch (currentStep) {
                case 'menungguSeller':
                    return {
                        complainType: "Barang Rusak",
                        sellerSudahSetuju: false,
                        sellerSudahTolak: false,
                        adminSudahSetuju: false,
                        adminSudahTolak: false,
                        buyerSudahKirimResi: false,
                        buyerMelewatkanBatasWaktu: false,
                        dalamPengirimanBalik: false,
                        buyerSudahAjukanKonfirmasi: false,
                        teruskanKonfirmasiBuyer: false,
                        tolakKonfirmasiBuyer: false,
                        transaksiSelesai: false,
                        waktuKomplain: komplainData.waktuKomplain || "16 Juni 2025, 10:00 WIB",
                        isSellerSetuju: false,
                        isAdminSetuju: false,
                        currentStatus: 'menungguSeller'
                    };
                case 'sellerSetuju':
                    return {
                        ...mockDataSellerSetuju,
                        waktuKomplain: komplainData.waktuKomplain || mockDataSellerSetuju.waktuKomplain
                    };
                case 'sellerTolak':
                    return {
                        ...mockDataSellerTolak,
                        waktuKomplain: komplainData.waktuKomplain || mockDataSellerTolak.waktuKomplain
                    };
                case 'adminSetuju':
                    return {
                        ...mockDataAdminSetuju,
                        waktuKomplain: komplainData.waktuKomplain || mockDataAdminSetuju.waktuKomplain
                    };
                case 'adminTolak':
                    return {
                        ...mockDataAdminTolak,
                        waktuKomplain: komplainData.waktuKomplain || mockDataAdminTolak.waktuKomplain
                    };
                case 'menungguAdmin':
                    return {
                        ...mockDataMenungguAdmin,
                        waktuKomplain: komplainData.waktuKomplain || mockDataMenungguAdmin.waktuKomplain,
                        currentStatus: 'menungguAdmin'
                    };
                case 'transaksiSelesai':
                    return {
                        ...mockDataTransaksiSelesai,
                        waktuKomplain: komplainData.waktuKomplain || mockDataTransaksiSelesai.waktuKomplain
                    };
                case 'komplainDibatalkan':
                    return {
                        complainType: "Barang Rusak",
                        sellerSudahSetuju: false,
                        sellerSudahTolak: false,
                        adminSudahSetuju: false,
                        adminSudahTolak: false,
                        buyerSudahKirimResi: false,
                        buyerMelewatkanBatasWaktu: false,
                        dalamPengirimanBalik: false,
                        buyerSudahAjukanKonfirmasi: false,
                        teruskanKonfirmasiBuyer: false,
                        tolakKonfirmasiBuyer: false,
                        transaksiSelesai: false,
                        waktuKomplain: komplainData.waktuKomplain || "16 Juni 2025, 10:00 WIB",
                        waktuDibatalkan: komplainData.waktuDibatalkan || "17 Juni 2025, 14:00 WIB",
                        isSellerSetuju: false,
                        isAdminSetuju: false,
                        currentStatus: 'komplainDibatalkan'
                    };
                case 'dalamPengirimanBalik':
                    return {
                        ...mockDataDalamPengirimanBalik,
                        waktuKomplain: komplainData.waktuKomplain || mockDataDalamPengirimanBalik.waktuKomplain
                    };
                case 'buyerAjukanKonfirmasi':
                    return {
                        ...mockDataBuyerAjukanKonfirmasi,
                        waktuKomplain: komplainData.waktuKomplain || mockDataBuyerAjukanKonfirmasi.waktuKomplain,
                        currentStatus: 'buyerAjukanKonfirmasi'
                    };
                case 'teruskanKonfirmasiBuyer':
                    return {
                        ...mockDataTeruskanKonfirmasiBuyer,
                        waktuKomplain: komplainData.waktuKomplain || mockDataTeruskanKonfirmasiBuyer.waktuKomplain
                    };
                case 'tolakKonfirmasiBuyer':
                    return {
                        ...mockDataTolakKonfirmasiBuyer,
                        waktuKomplain: komplainData.waktuKomplain || mockDataTolakKonfirmasiBuyer.waktuKomplain
                    };
                default:
                    return {
                        ...mockDataSellerSetuju,
                        waktuKomplain: komplainData.waktuKomplain || mockDataSellerSetuju.waktuKomplain
                    };
            }
        } catch (error) {
            console.error("DetailBarangRusakPage: Error in getMockDataByStep", error);
            return {
                ...mockDataSellerSetuju,
                waktuKomplain: komplainData.waktuKomplain || mockDataSellerSetuju.waktuKomplain
            };
        }
    };

    // Safe mapping function with error handling
    const getStepProps = () => {
        try {
            console.log("DetailBarangRusakPage: getStepProps called");
            const mockData = getMockDataByStep();
            console.log("DetailBarangRusakPage: mockData", mockData);
            const props = mapDataToStepProps(mockData);
            console.log("DetailBarangRusakPage: mapped props", props);
            return props;
        } catch (error) {
            console.error("DetailBarangRusakPage: Error in getStepProps", error);
            // Return safe fallback props
            return {
                complainType: "Barang Rusak",
                sellerSudahSetuju: false,
                sellerSudahTolak: false,
                adminSudahSetuju: false,
                adminSudahTolak: false,
                buyerSudahKirimResi: false,
                buyerMelewatkanBatasWaktu: false,
                dalamPengirimanBalik: false,
                buyerSudahAjukanKonfirmasi: false,
                teruskanKonfirmasiBuyer: false,
                tolakKonfirmasiBuyer: false,
                transaksiSelesai: false,
                waktuKomplain: "16 Juni 2025, 10:00 WIB",
                isSellerSetuju: false,
                isAdminSetuju: false,
            };
        }
    };

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
    const handleAdminSetuju = () => setCurrentStep('adminSetuju');
    const handleAdminTolak = () => setCurrentStep('adminTolak');
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
    const handleBuyerAjukanKonfirmasiSetuju = () => setCurrentStep('teruskanKonfirmasiBuyer');
    const handleBuyerAjukanKonfirmasiTolak = () => setCurrentStep('tolakKonfirmasiBuyer');

    const handleNavigateToRekberDetail = () => {
        const idTransaksi = detailKomplain.komplain.idTransaksi || komplainData.idTransaksi;
        navigate(`/transactions/${idTransaksi}`);
    };

    // Mock nominal dan biaya (ganti dengan data API jika ada)
    const nominalBarang = komplainData?.nominalBarang || "Rp. 8.000.000,00";
    const biayaAsuransi = komplainData?.biayaAsuransi || "Rp. 16.000,00";
    const biayaJasa = komplainData?.biayaJasa || "Rp. 64.000,00";

    // Handler untuk perubahan step
    const handleStepChange = (newStep) => {
        console.log("DetailBarangRusakPage: Changing step from", currentStep, "to", newStep);
        setCurrentStep(newStep);
    };

    try {
        console.log("DetailBarangRusakPage: About to render");

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
                            <div>
                                <VerticalStepRusak
                                    complainType="Barang Rusak"
                                    {...getStepProps()}
                                    onTolak={
                                        currentStep === 'menungguAdmin'
                                            ? handleAdminTolak
                                            : currentStep === 'buyerAjukanKonfirmasi'
                                                ? handleBuyerAjukanKonfirmasiTolak
                                                : undefined
                                    }
                                    onSetuju={
                                        currentStep === 'menungguAdmin'
                                            ? handleAdminSetuju
                                            : currentStep === 'buyerAjukanKonfirmasi'
                                                ? handleBuyerAjukanKonfirmasiSetuju
                                                : undefined
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col gap-8">
                        <ComplainInfoSection
                            data={{
                                id: komplainData.id,
                                idTransaksi: detailKomplain.komplain.idTransaksi,
                                nama: komplainData.nama,
                                pembeli: komplainData.pembeli,
                                seller: detailKomplain.komplain.seller.email,
                                noResi: komplainData.noResi,
                                ekspedisi: komplainData.ekspedisi,
                                tagihanRekber: komplainData.tagihanRekber,
                                nominalBarang: nominalBarang,
                                biayaAsuransi: biayaAsuransi,
                                biayaJasa: biayaJasa,
                            }}
                            onDetailRekberClick={handleNavigateToRekberDetail}
                        />
                    </div>
                </div>
                {!komplainData && <div>Data komplain tidak ditemukan.</div>}
            </div>
        );
    } catch (error) {
        console.error("DetailBarangRusakPage: Error during render", error);
        return (
            <div className="max-w-5xl mx-auto py-8 px-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Page</h2>
                    <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat halaman detail barang rusak.</p>
                    <details className="text-sm text-red-700">
                        <summary className="cursor-pointer font-medium">Error Details</summary>
                        <pre className="mt-2 bg-red-100 p-2 rounded text-xs overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }
};

export default DetailBarangRusakPage;
