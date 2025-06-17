import React, { useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import ButtonDropdown from "../components/ButtonDropdown";
import ButtonFilter from "../components/ButtonFilter";
import InputSearch from "../components/InputSearch";
import { Search, CalendarDays } from "lucide-react";
import DataTableUser from "../components/table/DataTableUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full">
      <Breadcrumb />

      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="max-w-[300px] w-full md:w-auto">
          <InputSearch
            Icon={Search}
            placeholder="Cari ID, nama dan email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto">
          <ButtonFilter />

          <div className="w-[200px]">
            <ButtonDropdown
              placeholder="Status Pengguna"
              options={["Terverifikasi", "Belum"]}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
            />
          </div>

          <div className="w-[200px]">
            <div className="w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro">
              <div className="w-full h-8 flex items-center gap-2 bg-white border border-dimgray rounded-lg overflow-hidden px-2">
                <CalendarDays className="w-4 h-4 stroke-current" />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Tanggal Registrasi"
                  className="flex-1 h-full bg-transparent outline-none text-[13px] font-sf-pro placeholder-dimgray"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTableUser
        searchQuery={searchQuery}
        selectedStatus={selectedStatus}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default UserPage;
