import React from "react";
import { Check, Info, XCircle, Ban } from "lucide-react";

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
const VerticalStepRusak = ({ complainType, currentStatus, steps = [], onTolak, onSetuju, adminActionTimestamp, isRejectedByAdmin, statusPengajuan, resiPengembalian, buyerReturnTimestamp }) => {
    // Pengembalian Barang - CASE 1: Seller menyetujui komplain
    if (currentStatus === 'Pengembalian Barang' && (statusPengajuan === 'Tanpa pengajuan' || statusPengajuan === 'Ditinjau')) {
        const stepsCase1 = [
            { name: 'Waktu buat komplain', description: '16 Juni 2025, 10 : 00 WIB', status: 'completed' },
            { name: 'Seller menyetujui komplain', description: '16 Juni 2025, 12 : 00 WIB', status: 'completed' },
        ];
        if (resiPengembalian && buyerReturnTimestamp) {
            stepsCase1.push({ name: 'Buyer kirim resi pengembalian', description: buyerReturnTimestamp, status: 'completed' });
            stepsCase1.push({ name: 'Dalam Pengiriman Balik', description: '', status: 'current', isCurrentBlue: true });
        } else {
            stepsCase1.push({ name: 'Menunggu buyer pengembalian', description: '1 x 24 jam', status: 'current' });
        }
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center p-3 mb-4 rounded-lg bg-[#FEF3C7] text-[#92400E]">
                    <Info className="w-5 h-5 mr-3" />
                    <span className="text-base font-semibold">Menunggu Pengembalian</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                    <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                    <ol>
                        {stepsCase1.map((step, index) => (
                            <StepItem
                                key={index}
                                status={step.status}
                                label={step.name}
                                timestamp={step.description}
                                isLast={index === stepsCase1.length - 1}
                                isCurrentBlue={!!step.isCurrentBlue}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
    // Pengembalian Barang - CASE 2: Seller menolak, admin menyetujui
    if (currentStatus === 'Pengembalian Barang' && (statusPengajuan === 'Menunggu Seller' || statusPengajuan === 'Ditolak')) {
        const stepsCase2 = [
            { name: 'Waktu buat komplain', description: '16 Juni 2025, 10 : 00 WIB', status: 'completed' },
            { name: 'Seller menolak komplain', description: '16 Juni 2025, 12 : 00 WIB', status: 'rejected' },
            { name: 'Admin menyetujui komplain', description: adminActionTimestamp || '16 Juni 2025, 14 : 00 WIB', status: 'completed' },
        ];
        if (resiPengembalian && buyerReturnTimestamp) {
            stepsCase2.push({ name: 'Buyer kirim resi pengembalian', description: buyerReturnTimestamp, status: 'completed' });
            stepsCase2.push({ name: 'Dalam Pengiriman Balik', description: '', status: 'current', isCurrentBlue: true });
        } else {
            stepsCase2.push({ name: 'Menunggu buyer pengembalian', description: '1 x 24 jam', status: 'current' });
        }
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center p-3 mb-4 rounded-lg bg-[#FEF3C7] text-[#92400E]">
                    <Info className="w-5 h-5 mr-3" />
                    <span className="text-base font-semibold">Menunggu Pengembalian</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                    <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                    <ol>
                        {stepsCase2.map((step, index) => (
                            <StepItem
                                key={index}
                                status={step.status}
                                label={step.name}
                                timestamp={step.description}
                                isLast={index === stepsCase2.length - 1}
                                isCurrentBlue={!!step.isCurrentBlue}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

    // Tampilan untuk "Transaksi Selesai" (Setelah Admin Tolak)
    if (currentStatus === 'Transaksi Selesai' && isRejectedByAdmin) {
        const rejectedSteps = [
            { name: 'Waktu buat komplain', description: '16 Juni 2025, 10 : 00 WIB', status: 'completed' },
            { name: 'Seller menolak komplain', description: '16 Juni 2025, 12 : 00 WIB', status: 'rejected' },
            { name: 'Admin menolak komplain', description: adminActionTimestamp, status: 'rejected' },
        ];
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="inline-flex items-center px-4 py-2 mb-4 rounded-lg bg-[#E6F4EA] text-[#1E4620] gap-2 font-semibold text-base">
                    <Check className="w-5 h-5" />
                    Transaksi Selesai
                </span>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                    <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                    <ol>
                        {rejectedSteps.map((step, index) => (
                            <StepItem
                                key={index}
                                status={step.status}
                                label={step.name}
                                timestamp={step.description}
                                isLast={index === rejectedSteps.length - 1}
                                isCurrentBlue={false}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

    // Tampilan untuk "Persetujuan Admin"
    if (currentStatus === 'Persetujuan Admin') {
        const adminApprovalSteps = [
            { name: 'Waktu buat komplain', description: '16 Juni 2025, 10 : 00 WIB', status: 'completed' },
            { name: 'Seller menolak komplain', description: '16 Juni 2025, 12 : 00 WIB', status: 'rejected' },
            { name: 'Menunggu persetujuan admin', description: '', status: 'current' },
        ];
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 flex justify-start">
                    <span className="inline-flex items-center p-3 mb-4 border border-gray-200 rounded-lg bg-gray-50 text-base font-medium text-gray-700">
                        <Info className="w-5 h-5 text-gray-500 mr-3" />
                        Menunggu Persetujuan Admin
                    </span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                    <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                    <ol>
                        {adminApprovalSteps.map((step, index) => (
                            <StepItem
                                key={index}
                                status={step.status}
                                label={step.name}
                                timestamp={step.description}
                                isLast={index === adminApprovalSteps.length - 1}
                                isCurrentBlue={false}
                            />
                        ))}
                    </ol>
                </div>
                <div className="flex gap-4 mt-8">
                    <button onClick={onTolak} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#FDE8EF] text-[#C30052] hover:bg-[#F9D6E2]">Tolak</button>
                    <button onClick={onSetuju} className="flex-1 px-0 py-3 rounded-2xl text-lg font-medium bg-[#0066FF] text-white hover:bg-[#005FCC]">Setujui</button>
                </div>
            </div>
        );
    }

    // Tampilan untuk "Dibatalkan"
    if (currentStatus === 'Dibatalkan') {
        const cancelledSteps = [
            { name: 'Waktu buat komplain', description: '16 Juni 2025, 10 : 00 WIB', status: 'completed' },
            { name: 'Buyer membatalkan komplain', description: '16 Juni 2025, 11 : 00 WIB', status: 'rejected' },
        ];
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 flex justify-start">
                    <span className="inline-flex items-center px-4 py-2 rounded-lg text-base font-semibold bg-gray-200 text-gray-800">
                        Komplain Dibatalkan
                    </span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                    <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                    <ol>
                        {cancelledSteps.map((step, index) => (
                            <StepItem
                                key={index}
                                status={step.status}
                                label={step.name}
                                timestamp={step.description}
                                isLast={index === cancelledSteps.length - 1}
                                isCurrentBlue={false}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

    // Tampilan default untuk status lainnya
    const filteredSteps = (steps || []).filter(step => step && step.status && step.status !== 'upcoming');
    // Fallback jika tidak ada step valid, render satu step default agar circle selalu tampak
    const safeSteps = filteredSteps.length > 0 ? filteredSteps : [
        { name: 'Menunggu Proses', description: '', status: 'current' }
    ];
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center p-3 mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <Info className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-base font-medium text-gray-700">Menunggu {currentStatus}</span>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Tracking Komplain</h2>
                <p className="text-lg text-gray-600 mb-6">{complainType}</p>
                <ol>
                    {safeSteps.map((step, index) => (
                        <StepItem
                            key={index}
                            status={step.status === 'complete' ? 'completed' : step.status}
                            label={step.name}
                            timestamp={step.description}
                            isLast={index === safeSteps.length - 1}
                            isCurrentBlue={false}
                        />
                    ))}
                </ol>
            </div>
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

export default VerticalStep; 