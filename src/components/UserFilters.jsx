// components/UserFilters.jsx
import React from "react";
import { Search } from "lucide-react";
import InputSearch from "../components/InputSearch";
import ButtonDropdown from "../components/ButtonDropdown";
import DateRangeDropdown from "../components/DateRangeDropdown";

const UserFilters = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDateRange,
  onDateChange,
  onResetFilters,
}) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4 mb-4'>
      {/* Search */}
      <div className='max-w-[300px] w-full md:w-auto'>
        <InputSearch
          Icon={Search}
          placeholder='Cari ID, nama dan email'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className='flex items-center gap-3 flex-wrap'>
        {/* Dropdown Status */}
        <div className='w-[200px]'>
          <ButtonDropdown
            placeholder='Status Pengguna'
            options={[
              { label: "Terverifikasi", value: "verified" },
              { label: "Belum Terverifikasi", value: "unverified" },
            ]}
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>

        {/* Date Range Dropdown */}
        <div className='w-[240px]'>
          <DateRangeDropdown
            selectedRange={selectedDateRange}
            onChange={onDateChange}
          />
        </div>

        {/* Reset Button */}
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

export default UserFilters;
