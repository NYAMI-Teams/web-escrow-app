import React from "react";
import { AlertCircle } from "lucide-react";
import VerticalStep from "./VerticalStep";
import { trackingData } from "./trackingData";

const statusLabels = {
    menungguPembayaran: "Status: Menunggu Pembayaran",
    menungguResi: "Status: Menunggu Resi",
    dalamPengiriman: "Status: Dalam Pengiriman",
    menungguPersetujuanAdmin: "Status: Menunggu Persetujuan Admin",
    pengajuanKonfirmasi: "Status: Menunggu Konfirmasi Buyer",
    pengajuanDitolak: "Status: Pengajuan Ditolak",
    barangDiterima: "Status: Barang Diterima",
    rekberBatal: "Status: Rekber Dibatalkan"
};

const TrackingDemo = ({ currentStatus, setCurrentStatus }) => {
    const currentData = trackingData[currentStatus];

    const handleNextStatus = () => {
        const statusFlow = [
            'menungguPembayaran',
            'menungguResi',
            'dalamPengiriman',
            'menungguPersetujuanAdmin',
            'pengajuanKonfirmasi',
            'barangDiterima'
        ];
        const currentIndex = statusFlow.indexOf(currentStatus);
        if (currentIndex < statusFlow.length - 1) {
            setCurrentStatus(statusFlow[currentIndex + 1]);
        }
    };

    const handleCancel = () => {
        setCurrentStatus('rekberBatal');
    };

    const handleReject = () => {
        setCurrentStatus('pengajuanDitolak');
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Status Selector */}
            {/* <div className="flex flex-wrap gap-2">
                {Object.keys(trackingData).map((status) => (
                    <button
                        key={status}
                        onClick={() => setCurrentStatus(status)}
                        className={`px-3 py-1.5 rounded text-sm font-medium ${currentStatus === status
                            ? "bg-[#066afe] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {statusLabels[status]}
                    </button>
                ))}
            </div> */}

            {/* Warning Badge */}
            <div className="mb-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium`}
                    style={{ backgroundColor: currentData.badge.bgColor, color: currentData.badge.textColor }}>
                    {currentData.badge.icon && <currentData.badge.icon className="w-3 h-3 mr-2" />}
                    {currentData.badge.text}
                </span>
            </div>

            {/* Tracking Steps */}
            <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-[#1c1c1c]">Tracking Rekber</h3>

                <div className="flex flex-col gap-0">
                    {currentData.steps.map((step, index) => (
                        <VerticalStep
                            key={index}
                            status={step.status}
                            label={step.label}
                            timestamp={step.timestamp}
                            isLast={index === currentData.steps.length - 1}
                            showConnector={index < currentData.steps.length - 1}
                            isSuccess={step.isSuccess}
                        />
                    ))}
                </div>
            </div>

            {/* <div className="mt-6 space-x-2">
                <button
                    onClick={handleNextStatus}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${currentStatus === 'rekberBatal' || currentStatus === 'barangDiterima'
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    disabled={currentStatus === 'rekberBatal' || currentStatus === 'barangDiterima'}
                >
                    Next Status
                </button>
                {currentStatus === 'menungguPembayaran' && (
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                        Batalkan Rekber
                    </button>
                )}
                {currentStatus === 'menungguPersetujuanAdmin' && (
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                        Tolak Pengajuan
                    </button>
                )}
            </div> */}
        </div>
    );
};

export default TrackingDemo; 