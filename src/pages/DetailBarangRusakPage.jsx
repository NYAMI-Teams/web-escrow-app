//DetailBarangRusakPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/bukti-pengajuan.png";
import { formatDateTime } from "../components/lib/dateFormat";
import { getComplaintDetail, resolveComplaintStatus } from "../services/complaint.service";

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

const steps = [
  { name: 'Waktu buat komplain', description: '16 Juni 2025, 10:00 WIB', status: 'complete' },
  { name: 'Menunggu seller setuju', description: '', status: 'current' },
  { name: 'Kirim barang ke penjual', description: '', status: 'upcoming' },
  { name: 'Konfirmasi barang diterima', description: '', status: 'upcoming' },
  { name: 'Pengembalian dana', description: '', status: 'upcoming' },
];

//  WAITING_SELLER_APPROVAL, RETURN_REQUESTED, RETURN_IN_TRANSIT, AWAITING_SELLER_CONFIRMATION, COMPLETED, UNDER_INVESTIGATION, APPROVED_BY_SELLER, APPROVED_BY_ADMIN, REJECTED_BY_SELLER, REJECTED_BY_ADMIN, CANCELED_BY_BUYER AWAITING_ADMIN_APPROVAL, AWAITING_ADMIN_CONFIRMATION, APPROVED_BY_ADMIN, REJECTED_BY_ADMIN, CANCELED_BY_BUYER
const mapStatusComplaint = {
  "waiting_seller_approval": "Menunggu Persetujuan Seller",
  "return_in_transit": "Barang Sedang Dalam Pengiriman",
  "return_requested": "Pengembalian Barang",
  "approved_by_admin": "Persetujuan Admin",
  "awaiting_admin_approval": "Menunggu Persetujuan Admin",
  "awaiting_admin_confirmation": "Menunggu Persetujuan Admin",
  "completed": "Transaksi Selesai",
  "canceled_by_buyer": "Dibatalkan",
  "approved_by_seller": "Seller Setuju",
  "rejected_by_seller": "Seller Tolak",
  "rejected_by_admin": "Komplain Dibatalkan",
}

// const komplainData = location.state?.data || {
//   id: "12345678901",
//   nama: "iPhone 13 Pro Max",
//   pembeli: "bayuseptyan925@gmail.com",
// };

const DetailBarangRusakPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [adminActionTimestamp, setAdminActionTimestamp] = useState(null);
  const [isRejectedByAdmin, setIsRejectedByAdmin] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getComplaintDetail(params?.id);
      console.log("Detail Komplain:", res);
      /* 
   {
    "id": "1ccd22cb-ae86-4c0e-9642-e6c0a715483d",
    "transaction_id": "715a177f-8332-445a-8d81-b0b9f0434980",
    "buyer_id": "08377c03-a1bc-4b7d-9cb5-bec50c1d8b77",
    "type": "damaged",
    "status": "completed",
    "buyer_reason": "Gjmhgfr",
    "buyer_evidence_urls": [
        "https://rekbr.sgp1.digitaloceanspaces.com/IMG_3496.jpg"
    ],
    "seller_response_deadline": "2025-06-27T09:06:42.845Z",
    "seller_response_reason": "tolong mamah aku mau makan nasi goreng",
    "seller_evidence_urls": [],
    "seller_decision": "approved",
    "seller_responded_at": "2025-06-25T09:07:40.823Z",
    "buyer_requested_confirmation_at": "2025-06-25T09:35:35.056Z",
    "buyer_requested_confirmation_reason": "Saya lihat barang sudah sampai",
    "buyer_requested_confirmation_evidence_urls": [
        "https://rekbr.sgp1.digitaloceanspaces.com/16B92C2C-1331-4BBB-90BF-80F3FC634179.jpg"
    ],
    "request_confirmation_status": "approved",
    "request_confirmation_admin_id": "668ae603-f741-469f-a644-14c712026870",
    "admin_approved_confirmation_at": "2025-06-25T09:39:45.267Z",
    "admin_rejected_confirmation_at": null,
    "seller_confirm_deadline": "2025-06-25T09:41:45.262Z",
    "seller_confirmed_return_at": "2025-06-25T09:53:47.545Z",
    "buyer_deadline_input_shipment": "2025-06-27T09:07:40.823Z",
    "canceled_by_buyer_at": null,
    "admin_decision": null,
    "admin_responded_at": "2025-06-25T09:39:45.267Z",
    "resolved_at": "2025-06-25T09:53:47.545Z",
    "created_at": "2025-06-25T09:06:42.846Z",
    "updated_at": "2025-06-25T09:53:47.548Z",
    "transaction": {
        "id": "715a177f-8332-445a-8d81-b0b9f0434980",
        "transaction_code": "TRX-041924-1153",
        "seller_id": "f49a1215-6847-4c00-b73a-8dd438d1acd3",
        "buyer_id": "08377c03-a1bc-4b7d-9cb5-bec50c1d8b77",
        "item_name": "Dummy (Barang Rusak, Seller Approve)",
        "item_price": 2500000,
        "platform_fee": 25000,
        "insurance_fee": 0,
        "total_amount": 2525000,
        "status": "refunded",
        "virtual_account_number": "8883330319615",
        "paid_at": "2025-06-25T06:47:31.825Z",
        "payment_deadline": "2025-06-25T06:49:21.922Z",
        "shipment_deadline": "2025-06-25T06:49:31.825Z",
        "buyer_confirm_deadline": null,
        "confirmed_at": null,
        "withdrawal_bank_account_id": "15253586-0101-4eb4-acfa-83e021a85e64",
        "withdrawn_at": null,
        "withdrawn_amount": null,
        "cancelled_at": null,
        "cancelled_by_id": null,
        "cancel_reason": null,
        "refunded_at": "2025-06-25T09:53:47.559Z",
        "refund_amount": 2500000,
        "refund_reason": "Gjmhgfr",
        "created_at": "2025-06-25T06:47:21.926Z",
        "updated_at": "2025-06-25T09:53:47.560Z",
        "buyer": {
            "email": "mr.adrian40@gmail.com"
        },
        "seller": {
            "email": "bayuseptyan43@gmail.com"
        },
        "shipment": {
            "id": "0c2ffce4-7892-41cb-a0ab-e4d3be7b4106",
            "transaction_id": "715a177f-8332-445a-8d81-b0b9f0434980",
            "courier_id": "23be3cdf-0591-4eec-83a4-e88d860317c6",
            "tracking_number": "JNT890364",
            "shipment_date": "2025-06-25T06:47:51.631Z",
            "received_date": null,
            "photo_url": "https://rekbr.sgp1.digitaloceanspaces.com/44925F91-FB4C-43DE-A1B9-A430C6B7D73F.jpg",
            "created_at": "2025-06-25T06:47:51.632Z",
            "updated_at": "2025-06-25T06:47:51.632Z",
            "courier": {
                "id": "23be3cdf-0591-4eec-83a4-e88d860317c6",
                "name": "J&T Express Indonesia"
            }
        }
    },
    "return_shipment": {
        "id": "f362b45c-fa85-41e8-9bbc-c6f3ff64967d",
        "complaint_id": "1ccd22cb-ae86-4c0e-9642-e6c0a715483d",
        "courier_id": "c194d8e4-ff82-44b8-99a1-246e916b3f06",
        "tracking_number": "Ghkngds",
        "shipment_date": "2025-06-25T09:08:00.486Z",
        "received_date": "2025-06-25T09:53:47.562Z",
        "photo_url": "https://rekbr.sgp1.digitaloceanspaces.com/IMG_3496.jpg",
        "created_at": "2025-06-25T09:08:00.488Z",
        "updated_at": "2025-06-25T09:53:47.563Z",
        "courier": {
            "id": "c194d8e4-ff82-44b8-99a1-246e916b3f06",
            "name": "Tiki Express"
        }
    }
}
      */
      const formattedData = {
        ...res,
        statusMap: mapStatusComplaint[res?.status] || "Menunggu Seller",
      };
      setData(formattedData);
    } catch (error) {
      alert(error.message);
    }
  }

  const resolveComplaint = async (status) => {
    try {
      await resolveComplaintStatus(params?.id, status);
      alert(`Komplain berhasil ${status === 'approve' ? 'disetujui' : 'ditolak'}`);
      fetchData(); // Refresh data after resolving
    } catch (error) {
      alert(`Gagal mengubah status komplain: ${error.message}`);
    }
  };

  const handleNavigateToRekberDetail = () => navigate(`/transactions/${data?.transaction?.id}`);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BreadcrumbDetailComplain idKomplain={data?.transaction?.transaction_code} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Komplain */}
        <div className="lg:col-span-1">
          <VerticalStep
            type="rusak"
            data={data}
            onTolak={() => resolveComplaint('reject')}
            onSetuju={() => resolveComplaint('approve')}
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

            <div className="flex flex-col gap-6">
              {/* Chat bubble kiri: alasan komplain dari pembeli */}
              <div className="flex flex-col gap-1">
                <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none w-fit">
                  {data?.buyer_reason || "Barang rusak, mohon pengembalian."}
                </div>

                {data?.buyer_evidence_urls?.length > 0 && <div className="flex gap-4">
                  {data?.buyer_evidence_urls?.map((item, i) => (
                    <div key={i} className="flex flex-col items-center bg-gray-100 rounded-lg border border-[#C9C9C9]">
                      <div className="relative overflow-hidden rounded-t-lg">
                        {/* jika item image, tampilkan image, jika video tampilkan video dengan overlay */}
                        {item.endsWith('.mp4') ? (
                          <div className="relative max-h-80">
                            <video
                              src={item}
                              className="w-full h-full object-cover"
                              controls
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item}
                            alt={`Bukti ${i + 1}`}
                            className="max-h-80 object-cover"
                          />
                        )}
                      </div>
                      <div className="flex gap-2 my-2 mx-5">
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                          Download
                        </button>
                        <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>}

                <div className="text-xs text-gray-500">
                  {data?.transaction?.buyer?.email} · <strong>{formatDateTime(data?.created_at)}</strong>
                </div>
              </div>

              {/* Chat bubble kanan: status dari step saat ini */}
              {(data?.status === "waiting_seller_approval" || data?.status === "canceled_by_buyer") && (
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit">
                    Menunggu respon seller untuk komplain ini .....
                  </div>
                  <p className="text-xs text-red-600">
                    Menunggu respon sampai <strong>{formatDateTime(data?.seller_response_deadline)}</strong>
                  </p>
                </div>
              )}

              {data?.seller_decision === "approved" && (
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit">
                    Seller mau nerima barang kembaliin agar dapat ditukar, kirim bukti Refund
                  </div>
                  <div className="text-xs text-gray-500">
                    {data?.transaction?.seller?.email} · <strong>{formatDateTime(data?.seller_responded_at)}</strong>
                  </div>
                </div>
              )}

              {data?.seller_decision === "rejected" && (
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit">
                    {data?.seller_response_reason || "Menunggu persetujuan admin untuk komplain ini."}
                  </div>
                  {data?.seller_evidence_urls?.length > 0 && <div className="flex gap-4">
                    {data?.seller_evidence_urls?.map((item, i) => (
                      <div key={i} className="flex flex-col items-center bg-gray-100 rounded-lg border border-[#C9C9C9]">
                        <div className="relative overflow-hidden rounded-t-lg">
                          {/* jika item image, tampilkan image, jika video tampilkan video dengan overlay */}
                          {item.endsWith('.mp4') ? (
                            <div className="relative max-h-80">
                              <video
                                src={item}
                                className="w-full h-full object-cover"
                                controls
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={item}
                              alt={`Bukti ${i + 1}`}
                              className="max-h-80 object-cover"
                            />
                          )}
                        </div>
                        <div className="flex gap-2 my-2 mx-5">
                          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                            Download
                          </button>
                          <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>}
                  <div className="text-xs text-gray-500">
                    {data?.transaction?.seller?.email} · <strong>{formatDateTime(data?.seller_responded_at)}</strong>
                  </div>
                </div>
              )}

              {data?.status === "canceled_by_buyer" && <div className="flex flex-col gap-1">
                <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none w-fit">
                  Buyer telah membatalkan komplain ini.
                </div>

                <div className="text-xs text-gray-500">
                  {data?.transaction?.buyer?.email} · <strong>{formatDateTime(data?.resolved_at)}</strong>
                </div>
              </div>}


            </div>
          </ComplainInfoSection>

          {/* Informasi Komplain */}
          <ComplainInfoSection title="Informasi Komplain">
            <InfoRow label="ID Transaksi" value={data?.transaction?.transaction_code} />
            <InfoRow label="Nama Barang" value={data?.transaction?.item_name} />
            <InfoRow label="Status" value={data?.statusMap} />
            <InfoRow label="Pembeli" value={data?.transaction?.buyer?.email} />
            <InfoRow label="Penjual" value={data?.transaction?.seller?.email} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleNavigateToRekberDetail}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Lihat Detail Rekber
              </button>
            </div>
          </ComplainInfoSection>

          {/* Informasi Pengiriman */}
          {data?.return_shipment && <InformasiPengiriman data={data?.return_shipment} />}

          {/* Bukti Pengajuan */}
          {data?.buyer_requested_confirmation_at && <InformasiPengajuan data={data} />}
        </div>
      </div>
    </div>
  );
};

// Komponen Informasi Pengiriman
const InformasiPengiriman = ({ data }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Informasi Pengembalian Barang
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div>
        <p className="text-sm text-gray-500 mb-1">No Resi</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 tracking-widest select-all">
            {data?.tracking_number || "Tidak ada no resi"}
          </span>
          <button
            className="text-xs text-blue-600 hover:underline"
            onClick={() => navigator.clipboard.writeText(data?.tracking_number || "Tidak ada no resi")}
          >
            Salin
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Ekspedisi</p>
        <span className="text-sm font-medium text-gray-900">
          {data?.courier?.name || "Tidak ada informasi ekspedisi"}
        </span>
      </div>
    </div>
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm text-gray-500">Bukti Pengiriman</p>
        <span className="text-sm font-medium text-gray-900">
          {data?.photo_url?.split('/').pop() || "Tidak ada bukti pengiriman"}
        </span>
      </div>
      <img
        src={data?.photo_url}
        alt="Bukti Resi"
        className="rounded-lg max-h-80 border"
      />
      <div className="flex gap-3">
        <a
          href={data?.photo_url}
          download
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download
        </a>
        <a
          href={data?.photo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.4 15A7.97 7.97 0 0020 12c0-4.418-3.582-8-8-8S4 7.582 4 12c0 1.042.2 2.037.56 2.95"
            />
          </svg>
          Preview
        </a>
      </div>
    </div>
  </div>
);

const InformasiPengajuan = ({
  submissionInfo,
  onSetuju,
  onTolak,
  showKonfirmasi,
  setShowKonfirmasi,
  konfirmasiType,
  onKonfirmasi,
  currentStatus,
  data
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Informasi Pengajuan Penerimaan Pengembalian
    </h2>
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-1">Alasan Permintaan Konfirmasi</p>
      <span className="text-sm font-medium text-gray-900">
        {data?.buyer_requested_confirmation_reason || "Tidak ada alasan"}
      </span>
    </div>
    {/* {!(
      currentStatus === "pengajuanKonfirmasi" ||
      currentStatus === "pengajuanDitolak" ||
      currentStatus === "barangDiterima"
    ) && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={onTolak}
            className="bg-pink-100 text-pink-700 px-4 py-2 rounded font-medium"
          >
            Tolak
          </button>
          <button
            onClick={onSetuju}
            className="bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            Setujui
          </button>
        </div>
      )} */}
    {data?.buyer_requested_confirmation_evidence_urls?.length > 0 && (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">Bukti Permintaan Konfirmasi Seller</p>
        <div className="flex gap-2">
          {data?.buyer_requested_confirmation_evidence_urls?.map((url, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-gray-900 text-center">
                {url?.split('/').pop() || "Tidak ada bukti pengiriman"}
              </span>
              <img
                src={url}
                alt="Bukti Pengajuan"
                className="rounded-lg max-h-80 border mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    )}
    {/* Popup konfirmasi */}
    {showKonfirmasi && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
          <p className="mb-4 text-center text-base font-semibold">
            {konfirmasiType === "setuju"
              ? "Setujui permintaan konfirmasi ini?"
              : "Tolak permintaan konfirmasi ini?"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => onKonfirmasi(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded font-medium"
            >
              Ya
            </button>
            <button
              onClick={() => onKonfirmasi(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default DetailBarangRusakPage;
