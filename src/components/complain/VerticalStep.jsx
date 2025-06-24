import React from "react";
import { Check, Info, XCircle, Ban } from "lucide-react";
import StepBuatKomplain from './steps/StepBuatKomplain';
import StepMenungguSeller, { StepMenungguSellerWaiting } from './steps/StepMenungguSeller';
import StepSellerSetuju from './steps/StepSellerSetuju';
import StepSellerTolak from './steps/StepSellerTolak';
import StepAdminSetuju from './steps/StepAdminSetuju';
import StepAdminTolak from './steps/StepAdminTolak';
import StepBuyerMelewatkanBatasWaktu from './steps/StepBuyerMelewatkanBatasWaktu';
import StepDalamPengirimanBalik from './steps/StepDalamPengirimanBalik';
import StepBuyerAjukanKonfirmasi from './steps/StepBuyerAjukanKonfirmasiNew';
import StepTeruskanKonfirmasiBuyer from './steps/StepTeruskanKonfirmasiBuyer';
import StepTolakKonfirmasiBuyer from './steps/StepTolakKonfirmasiBuyer';
import StepTransaksiSelesai from './steps/StepTransaksiSelesai';
import StepKomplainDibatalkan from './steps/StepKomplainDibatalkan';
import StepMenungguAdmin from './steps/StepMenungguAdmin';

// Sub-komponen untuk setiap langkah (step) individual
const StepItem = ({ status, label, timestamp, isLast = false, isCurrentBlue = false }) => {
    const getStatusStyles = () => {
        if (isCurrentBlue) {
            return {
                circle: "border-2 border-[#066afe] bg-white",
                text: "text-[#066afe] font-bold",
                connector: "bg-[#066afe]",
                icon: null
            };
        }
        switch (status) {
            case "completed":
            case "success":
                return {
                    circle: "bg-[#066afe] border-[#066afe]",
                    text: "text-[#1c1c1c]",
                    connector: "bg-[#066afe]",
                    icon: <Check className="w-4 h-4 text-white" />
                };
            case "current":
                return {
                    circle: "bg-white border-4 border-blue-600",
                    text: "text-[#066afe] font-semibold",
                    connector: "bg-[#c9c9c9]",
                    icon: null
                };
            case "rejected":
                return {
                    circle: "border-transparent bg-transparent",
                    text: "text-[#C30052] font-semibold",
                    connector: "bg-[#066afe]",
                    icon: <Ban className="w-7 h-7 text-[#C30052]" />
                };
            default:
                return {
                    circle: "bg-white border-2 border-[#c9c9c9]",
                    text: "text-[#c9c9c9]",
                    connector: "bg-[#c9c9c9]",
                    icon: null
                };
        }
    };
    const styles = getStatusStyles();
    const descriptionClasses = `text-base font-bold ${status === 'rejected' ? 'text-[#C30052]' : 'text-gray-800'}`;
    const circleContainerClasses = `w-7 h-7 flex items-center justify-center ${status === 'current' || isCurrentBlue ? '-ml-[2px]' : ''}`;
    const lineClasses = `w-0.5 h-12 ${styles.connector} ${status === 'current' || isCurrentBlue ? 'ml-[1px]' : 'ml-[0px]'}`;
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={circleContainerClasses}>
                    <div className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${styles.circle}`}>
                        {styles.icon}
                    </div>
                </div>
                {!isLast && <div className={lineClasses} />}
            </div>
            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                <span className={`text-base font-medium ${styles.text}`}>{label}</span>
                {timestamp && !isCurrentBlue && <span className={descriptionClasses}>{timestamp}</span>}
            </div>
        </div>
    );
};


// Data dan Logika untuk Komplain 'Barang Hilang'
const HILANG_STATUS_MAP = {
    dalamInvestigasi: {
        badge: { text: "Dalam Investigasi", color: "#8E8E93", bg: "#F4F4F5", border: "#D1D1D6", icon: Info },
        steps: [
            { label: "Dalam Investigasi", timestamp: "16 Juni 2025, 10:00 WIB", status: "completed" },
            { label: "Menunggu keputusan admin", timestamp: null, status: "current" }
        ]
    },
    selesai: {
        badge: { text: "Transaksi Selesai", color: "#1E4620", bg: "#E6F4EA", border: "#E6F4EA", icon: Check },
        steps: [
            { label: "Dalam Investigasi", timestamp: "16 Juni 2025, 10:00 WIB", status: "completed" },
            { label: <span>Tim Rekber by BNI menyetujui dan dana sudah dikembalikan</span>, timestamp: "16 Juni 2025, 12:00 WIB", status: "success" }
        ]
    },
    ditolak: {
        badge: { text: "Komplain Ditolak", color: "#C30052", bg: "#FDE8EF", border: "#FDE8EF", icon: Info },
        steps: [
            { label: "Dalam Investigasi", timestamp: "16 Juni 2025, 10:00 WIB", status: "completed" },
            { label: "Tim Rekber by BNI menolak", timestamp: "16 Juni 2025, 12:00 WIB", status: "rejected" }
        ]
    },
    dibatalkan: {
        badge: { text: "Komplain Dibatalkan", color: "#8E8E93", bg: "#F4F4F5", border: "#D1D1D6", icon: Info },
        steps: [
            { label: "Dalam Investigasi", timestamp: "16 Juni 2025, 10:00 WIB", status: "completed" },
            { label: <span className="text-[#C30052]">Buyer membatalkan komplain</span>, timestamp: null, status: "rejected" }
        ]
    }
};

const VerticalStepHilang = ({ status, onTolak, onSetuju }) => {
    const data = HILANG_STATUS_MAP[status] || HILANG_STATUS_MAP["dalamInvestigasi"];
    const BadgeIcon = data.badge.icon;
    const showActionButtons = status === 'dalamInvestigasi' && onTolak && onSetuju;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 flex justify-start">
                <span className="inline-flex items-center px-4 py-2 rounded-lg text-base font-semibold gap-2" style={{ backgroundColor: data.badge.bg, color: data.badge.color }}>
                    {BadgeIcon && <BadgeIcon className="w-5 h-5" />}
                    {data.badge.text}
                </span>
            </div>
            <div className="mb-6 text-left">
                <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                <p className="text-lg text-gray-600">Barang Hilang</p>
            </div>
            <div className="flex flex-col gap-0">
                {data.steps.map((step, idx) => <StepItem key={idx} {...step} isLast={idx === data.steps.length - 1} />)}
            </div>
            {showActionButtons && (
                <div className="flex gap-4 mt-8">
                    <button onClick={onTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                    <button onClick={onSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Setujui</button>
                </div>
            )}
        </div>
    );
};


// Komponen untuk Komplain 'Barang Rusak' atau 'Tidak Sesuai'
const VerticalStepRusak = ({ complainType, currentStatus, steps = [], onTolak, onSetuju, adminActionTimestamp, isRejectedByAdmin, statusPengajuan, resiPengembalian, buyerReturnTimestamp, buyerConfirmationTimestamp, waktuKomplain, waktuSellerSetuju, waktuSellerTolak, waktuAdminSetuju, waktuAdminTolak, waktuBuyerKirimResi, waktuBuyerAjukanKonfirmasi, waktuTeruskanKonfirmasiBuyer, waktuTolakKonfirmasiBuyer, waktuTransaksiSelesai, waktuDibatalkan, sellerSudahSetuju, sellerSudahTolak, adminSudahSetuju, adminSudahTolak, buyerSudahKirimResi, buyerMelewatkanBatasWaktu, dalamPengirimanBalik, buyerSudahAjukanKonfirmasi, teruskanKonfirmasiBuyer, tolakKonfirmasiBuyer, transaksiSelesai, isSellerSetuju, isAdminSetuju }) => {

    // Fungsi untuk mendapatkan status badge berdasarkan kondisi
    const getStatusBadge = () => {
        // Handle new states first
        if (currentStatus === 'menungguSeller') {
            return {
                text: "Menunggu Persetujuan Seller",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }
        if (currentStatus === 'komplainDibatalkan') {
            return {
                text: "Komplain Dibatalkan",
                bg: "#FDE8EF",
                color: "#C30052",
                icon: XCircle
            };
        }
        if (currentStatus === 'buyerAjukanKonfirmasi') {
            return {
                text: "Menunggu Konfirmasi",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }
        if (currentStatus === 'menungguAdmin') {
            return {
                text: "Menunggu Persetujuan Admin",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }

        if (transaksiSelesai) {
            return {
                text: "Transaksi Selesai",
                bg: "#D1FAE5",
                color: "#065F46",
                icon: Check
            };
        }
        if (buyerMelewatkanBatasWaktu) {
            return {
                text: "Buyer Melewatkan Batas Waktu",
                bg: "#FDE8EF",
                color: "#C30052",
                icon: Info
            };
        }
        if (tolakKonfirmasiBuyer) {
            return {
                text: "Pengajuan Ditolak",
                bg: "#FDE8EF",
                color: "#C30052",
                icon: Info
            };
        }
        if (buyerSudahAjukanKonfirmasi || teruskanKonfirmasiBuyer) {
            return {
                text: teruskanKonfirmasiBuyer ? "Menunggu Konfirmasi Seller Barang Diterima" : "Menunggu Konfirmasi",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }
        if (dalamPengirimanBalik) {
            return {
                text: "Dalam Pengiriman Balik",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }
        if (adminSudahTolak) {
            return {
                text: "Komplain Ditolak Admin",
                bg: "#FDE8EF",
                color: "#C30052",
                icon: Info
            };
        }
        if (adminSudahSetuju) {
            return {
                text: "Menunggu Pengembalian Buyer",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }
        if (sellerSudahSetuju) {
            return {
                text: "Menunggu Pengembalian Buyer",
                bg: "#FEF3C7",
                color: "#92400E",
                icon: Info
            };
        }

        // Default status
        return {
            text: "Menunggu Persetujuan Seller",
            bg: "#FEF3C7",
            color: "#92400E",
            icon: Info
        };
    };

    // Fungsi untuk mendapatkan steps berdasarkan kondisi
    const getSteps = () => {
        // Handle new states first
        if (currentStatus === 'menungguSeller') {
            return <StepBuatKomplain waktuKomplain={waktuKomplain} />;
        }
        if (currentStatus === 'komplainDibatalkan') {
            return <StepKomplainDibatalkan
                waktuKomplain={waktuKomplain}
                waktuDibatalkan={waktuDibatalkan || "17 Juni 2025, 14:00 WIB"}
            />;
        }
        if (currentStatus === 'buyerAjukanKonfirmasi') {
            return <StepBuyerAjukanKonfirmasi
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                waktuBuyerAjukanKonfirmasi={waktuBuyerAjukanKonfirmasi}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (currentStatus === 'menungguAdmin') {
            return <StepMenungguAdmin
                waktuKomplain={waktuKomplain}
                waktuSellerTolak={waktuSellerTolak}
            />;
        }

        // Jika menggunakan komponen modular
        if (transaksiSelesai) {
            return <StepTransaksiSelesai
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                waktuBuyerAjukanKonfirmasi={waktuBuyerAjukanKonfirmasi}
                waktuTeruskanKonfirmasiBuyer={waktuTeruskanKonfirmasiBuyer}
                waktuTolakKonfirmasiBuyer={waktuTolakKonfirmasiBuyer}
                waktuTransaksiSelesai={waktuTransaksiSelesai}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (buyerMelewatkanBatasWaktu) {
            return <StepBuyerMelewatkanBatasWaktu
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuSellerTolak={waktuSellerTolak}
                waktuAdminSetuju={waktuAdminSetuju}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (tolakKonfirmasiBuyer) {
            return <StepTolakKonfirmasiBuyer
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                waktuBuyerAjukanKonfirmasi={waktuBuyerAjukanKonfirmasi}
                waktuTolakKonfirmasiBuyer={waktuTolakKonfirmasiBuyer}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (teruskanKonfirmasiBuyer) {
            return <StepTeruskanKonfirmasiBuyer
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                waktuBuyerAjukanKonfirmasi={waktuBuyerAjukanKonfirmasi}
                waktuTeruskanKonfirmasiBuyer={waktuTeruskanKonfirmasiBuyer}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (buyerSudahAjukanKonfirmasi) {
            return <StepBuyerAjukanKonfirmasi
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                waktuBuyerAjukanKonfirmasi={waktuBuyerAjukanKonfirmasi}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (dalamPengirimanBalik) {
            return <StepDalamPengirimanBalik
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
                waktuAdminSetuju={waktuAdminSetuju}
                waktuBuyerKirimResi={waktuBuyerKirimResi}
                isSellerSetuju={isSellerSetuju}
                isAdminSetuju={isAdminSetuju}
            />;
        }
        if (adminSudahTolak) {
            return <StepAdminTolak
                waktuKomplain={waktuKomplain}
                waktuSellerTolak={waktuSellerTolak}
                waktuAdminTolak={waktuAdminTolak}
            />;
        }
        if (adminSudahSetuju) {
            return <StepAdminSetuju
                waktuKomplain={waktuKomplain}
                waktuSellerTolak={waktuSellerTolak}
                waktuAdminSetuju={waktuAdminSetuju}
            />;
        }
        if (sellerSudahTolak) {
            return <StepSellerTolak
                waktuKomplain={waktuKomplain}
                waktuSellerTolak={waktuSellerTolak}
            />;
        }
        if (sellerSudahSetuju) {
            return <StepSellerSetuju
                waktuKomplain={waktuKomplain}
                waktuSellerSetuju={waktuSellerSetuju}
            />;
        }

        // Fallback: menggunakan StepBuatKomplain
        return <StepBuatKomplain waktuKomplain={waktuKomplain} />;
    };

    // Fungsi untuk mendapatkan action buttons
    const getActionButtons = () => {
        if (currentStatus === 'menungguAdmin' && onTolak && onSetuju) {
            return (
                <div className="flex gap-4 mt-8">
                    <button onClick={onTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                    <button onClick={onSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Setujui</button>
                </div>
            );
        }
        if (currentStatus === 'buyerAjukanKonfirmasi' && onTolak && onSetuju) {
            return (
                <div className="flex gap-4 mt-8">
                    <button onClick={onTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                    <button onClick={onSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Teruskan</button>
                </div>
            );
        }
        return null;
    };

    const statusBadge = getStatusBadge();
    const BadgeIcon = statusBadge.icon;
    const stepContent = getSteps();
    const actionButtons = getActionButtons();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center p-3 mb-4 rounded-lg" style={{ backgroundColor: statusBadge.bg, color: statusBadge.color }}>
                <BadgeIcon className="w-5 h-5 mr-3" />
                <span className="text-base font-semibold">{statusBadge.text}</span>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                <ol>
                    {stepContent}
                </ol>
            </div>
            {actionButtons}
        </div>
    );
};


// Komponen Utama yang Menggabungkan Keduanya
const VerticalStep = ({ type = 'rusak', ...props }) => {
    if (type === 'hilang') {
        return <VerticalStepHilang {...props} />;
    }
    return <VerticalStepRusak {...props} />;
};

const VerticalStepMenungguSeller = ({ waktuKomplain }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 flex justify-start">
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-base font-semibold bg-[#FEF3C7] text-[#92400E]">
                Menunggu Persetujuan Seller
            </span>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
            <p className="text-lg text-gray-600 mb-6">Barang Rusak</p>
            <ol>
                {/* Ini akan render dua step sekaligus */}
                <StepBuatKomplain timestamp={waktuKomplain} />
            </ol>
        </div>
    </div>
);

export default VerticalStep;
export { VerticalStepRusak, StepItem }; 