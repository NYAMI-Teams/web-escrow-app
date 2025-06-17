import React from "react";
import { Search } from "lucide-react";
import InputSearch from "../components/InputSearch";
import ButtonDropdown from "../components/ButtonDropdown";
import DateRangeDropdown from "../components/DateRangeDropdown";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const TransactionFilters = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedFundStatus,
  onFundStatusChange,
  selectedDateRange,
  onDateChange,
  onResetFilters,
}) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4 mb-4'>
      <div className='max-w-[300px] w-full md:w-auto'>
        <InputSearch
          Icon={Search}
          placeholder='Cari ID Transaksi, Nama Barang, Email'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-3 flex-wrap'>
        <div className='w-[200px]'>
          <MultiSelectDropdown
            placeholder='Status Rekber'
            options={[
              { label: "Menunggu Pembayaran", value: "pending_payment" },
              { label: "Menunggu Resi", value: "waiting_shipment" },
              { label: "Dalam Pengiriman", value: "shipped" },
              { label: "Barang Diterima", value: "completed" },
              { label: "Pengembalian", value: "refunded" },
              { label: "Dibatalkan", value: "canceled" },
            ]}
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>

        <div className='w-[200px]'>
          <ButtonDropdown
            placeholder='Status Pengajuan'
            options={[
              { label: "Menunggu Tinjauan", value: "pending" },
              { label: "Disetujui", value: "approved" },
              { label: "Ditolak", value: "rejected" },
              { label: "Tanpa Pengajuan", value: "none" },
            ]}
            value={selectedFundStatus}
            onChange={onFundStatusChange}
          />
        </div>

        <div className='w-[240px]'>
          <DateRangeDropdown
            selectedRange={selectedDateRange}
            onChange={onDateChange}
          />
        </div>

        <button
          onClick={onResetFilters}
          className='px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition'
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
