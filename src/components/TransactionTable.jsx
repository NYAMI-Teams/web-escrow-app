import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mapStatusToUI = (apiStatus) => {
  const map = {
    pending_payment: "Menunggu Pembayaran",
    waiting_shipment: "Menunggu Resi",
    shipped: "Dalam Pengiriman",
    completed: "Transaksi Selesai",
    refunded: "Pengembalian",
    canceled: "Dibatalkan",
  };
  return map[apiStatus] || "Status Tidak Dikenal";
};

const mapFundStatusToUI = (apiStatus) => {
  const map = {
    pending: "Menunggu Tinjauan",
    approved: "Disetujui",
    rejected: "Ditolak",
    none: "Tanpa Pengajuan",
    null: "Tanpa Pengajuan",
  };
  return map[apiStatus] || "Tanpa Pengajuan";
};

const formatDateID = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getStatusRekberClass = (status) => {
  const base =
    "inline-flex items-center justify-center px-2 py-[2px] rounded-full text-xs font-semibold whitespace-nowrap";

  switch (status) {
    case "pending_payment":
      return `${base} bg-gray-200 text-gray-700`;
    case "waiting_shipment":
      return `${base} bg-purple-200 text-purple-800`;
    case "shipped":
      return `${base} bg-yellow-200 text-yellow-800`;
    case "completed":
      return `${base} bg-green-200 text-green-800`;
    case "refunded":
      return `${base} bg-red-200 text-red-800`;
    case "canceled":
      return `${base} bg-red-300 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-600`;
  }
};

const getPengajuanClass = (status) => {
  const base = "text-xs font-semibold";
  switch (status) {
    case "pending":
      return `${base} text-yellow-600`;
    case "approved":
      return `${base} text-green-600`;
    case "rejected":
      return `${base} text-red-600`;
    case "none":
    case null:
      return `${base} text-gray-400`;
    default:
      return `${base} text-gray-400`;
  }
};

const TransactionTable = ({
  transactions,
  loading,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const navigate = useNavigate();

  return (
    <div className='flex w-full justify-center p-4'>
      <div className='w-full overflow-x-auto'>
        <div className='min-w-fit'>
          <div className='relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4'>
            <div className='relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl'>
              Jumlah informasi yang ditampilkan
            </div>
            <div className='rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]'>
              <b className='relative leading-[22px]'>{transactions.length}</b>
            </div>
          </div>

          {loading ? (
            <table className='border-collapse border border-[#c9c9c9] w-full animate-pulse'>
              <thead>
                <tr className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                  <th className='px-2 text-sm text-[#5c5c5c] min-w-[120px]'>
                    <div className='bg-gray-200 h-4 min-w-[120px] rounded'></div>
                  </th>
                  <th className='px-2 text-sm text-[#5c5c5c] min-w-[200px]'>
                    <div className='bg-gray-200 h-4 min-w-[200px] rounded'></div>
                  </th>
                  <th className='px-2 text-sm text-[#5c5c5c] min-w-[180px]'>
                    <div className='bg-gray-200 h-4 min-w-[180px] rounded'></div>
                  </th>
                  <th className='px-2 text-sm text-[#5c5c5c] min-w-[120px]'>
                    <div className='bg-gray-200 h-4 min-w-[120px] rounded'></div>
                  </th>
                  <th className='w-[52px]'>
                    <div className='bg-gray-200 h-4 w-[52px] rounded'></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className='h-[38px] border-b border-[#c9c9c9] bg-white'>
                    <td className='px-2 text-sm text-[#5c5c5c]'>
                      <div className='bg-gray-200 h-4 w-full rounded'></div>
                    </td>
                    <td className='px-2 text-sm text-[#5c5c5c]'>
                      <div className='bg-gray-200 h-4 w-full rounded'></div>
                    </td>
                    <td className='px-2 text-sm text-[#5c5c5c]'>
                      <div className='bg-gray-200 h-4 w-full rounded'></div>
                    </td>
                    <td className='px-2 text-sm text-[#5c5c5c]'>
                      <div className='bg-gray-200 h-4 w-full rounded'></div>
                    </td>
                    <td className='text-center'>
                      <div className='bg-gray-200 h-4 rounded'></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Table className='border-collapse border border-[#c9c9c9] w-full'>
              <TableHeader>
                <TableRow className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    ID Transaksi
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Tanggal Buat
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Barang
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Email Buyer
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Email Seller
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Nominal
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Status Rekber
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                    Status Pengajuan
                  </TableHead>
                  <TableHead className='w-[52px] h-[38px] p-0 min-w-[52px]' />
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn, index) => (
                  <TableRow
                    key={txn.id}
                    className={`h-[38px] border-b border-[#c9c9c9] ${index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                      } hover:bg-[#e6f7ff]`}
                  >
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {txn.transactionCode}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {formatDateID(txn.createdAt)}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {txn.itemName}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {txn.buyerEmail}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {txn.sellerEmail}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      Rp.{" "}
                      {txn.totalAmount.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm'>
                      <span className={getStatusRekberClass(txn.status)}>
                        {mapStatusToUI(txn.status)}
                      </span>
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm'>
                      <span
                        className={getPengajuanClass(txn.fundReleaseStatus)}
                      >
                        {mapFundStatusToUI(txn.fundReleaseStatus)}
                      </span>
                    </TableCell>

                    <TableCell className='text-center'>
                      <ArrowRightIcon
                        className='w-4 h-4 text-[#5c5c5c] hover:text-blue-600 cursor-pointer'
                        onClick={() => navigate(`/transactions/${txn.id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        <div className='flex justify-end items-center mt-4 space-x-2'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50'
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
