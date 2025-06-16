import { AlertCircle, XCircle, CheckCircle } from "lucide-react";

export const trackingData = {
    menungguPembayaran: {
        badge: {
            text: "Menunggu Pembayaran",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Menunggu pembayaran buyer dalam 3 jam",
                timestamp: null,
                status: "current"
            }
        ]
    },
    menungguResi: {
        badge: {
            text: "Menunggu Resi",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed"
            },
            {
                label: "Menunggu resi seller dalam 2 x 24 jam",
                timestamp: null,
                status: "current"
            }
        ]
    },
    dalamPengiriman: {
        badge: {
            text: "Dalam Pengiriman",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed"
            },
            {
                label: "Waktu seller memberikan resi",
                timestamp: "9 Juni 2025, 17:00 WIB",
                status: "completed"
            },
            {
                label: "Dalam pengiriman",
                timestamp: null,
                status: "current"
            }
        ]
    },
    menungguPersetujuanAdmin: {
        badge: {
            text: "Dalam Pengiriman",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed"
            },
            {
                label: "Waktu seller memberikan resi",
                timestamp: "9 Juni 2025, 17:00 WIB",
                status: "completed"
            },
            {
                label: "Seller pengajuan konfirmasi",
                timestamp: "10 Juni 2025, 10:00 WIB",
                status: "completed"
            },
            {
                label: "Menunggu persetujuan admin",
                timestamp: null,
                status: "current"
            }
        ]
    },
    pengajuanKonfirmasi: {
        badge: {
            text: "Dalam Pengiriman",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed"
            },
            {
                label: "Waktu seller memberikan resi",
                timestamp: "9 Juni 2025, 17:00 WIB",
                status: "completed"
            },
            {
                label: "Seller pengajuan konfirmasi",
                timestamp: "10 Juni 2025, 10:00 WIB",
                status: "completed"
            },
            {
                label: "Admin meneruskan pengajuan",
                timestamp: "10 Juni 2025, 11:00 WIB",
                status: "completed"
            },
            {
                label: "Buyer cek dan konfirmasi sebelum 1 x 24 jam",
                timestamp: null,
                status: "current"
            }
        ]
    },
    pengajuanDitolak: {
        badge: {
            text: "Dalam Pengiriman",
            bgColor: "#f9e3b6",
            textColor: "#000000",
            icon: AlertCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed"
            },
            {
                label: "Waktu seller memberikan resi",
                timestamp: "9 Juni 2025, 17:00 WIB",
                status: "completed"
            },
            {
                label: "Seller pengajuan konfirmasi",
                timestamp: "10 Juni 2025, 10:00 WIB",
                status: "completed"
            },
            {
                label: "Admin menolak pengajuan",
                timestamp: "10 Juni 2025, 11:00 WIB",
                status: "current"
            }
        ]
    },
    barangDiterima: {
        badge: {
            text: "Barang Diterima Buyer",
            bgColor: "#e6f4ea",
            textColor: "#1e4620",
            icon: CheckCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed",
                isSuccess: true
            },
            {
                label: "Waktu buyer bayar",
                timestamp: "9 Juni 2025, 15:30 WIB",
                status: "completed",
                isSuccess: true
            },
            {
                label: "Waktu seller memberikan resi",
                timestamp: "9 Juni 2025, 17:00 WIB",
                status: "completed",
                isSuccess: true
            },
            {
                label: "Seller pengajuan konfirmasi",
                timestamp: "10 Juni 2025, 10:00 WIB",
                status: "completed",
                isSuccess: true
            },
            {
                label: "Admin meneruskan pengajuan",
                timestamp: "10 Juni 2025, 11:00 WIB",
                status: "completed",
                isSuccess: true
            },
            {
                label: "Waktu buyer konfirmasi diterima",
                timestamp: "10 Juni 2025, 14:00 WIB",
                status: "current",
                isSuccess: true
            }
        ]
    },
    rekberBatal: {
        badge: {
            text: "Rekber Dibatalkan",
            bgColor: "#fde8e8",
            textColor: "#b91c1c",
            icon: XCircle
        },
        steps: [
            {
                label: "Waktu bikin rekber",
                timestamp: "9 Juni 2025, 14:00 WIB",
                status: "completed"
            },
            {
                label: "Rekber dibatalkan oleh seller",
                timestamp: "9 Juni 2025, 15:00 WIB",
                status: "current"
            }
        ]
    }
}; 