import Breadcrumb from "../components/BreadCrumb";
import ButtonDropdown from "../components/ButtonDropdown";
import ButtonFilter from "../components/ButtonFilter";
import InputSearch from "../components/InputSearch";
import { Search, CalendarDays } from "lucide-react";
import DataTableRekber from "../components/table/DataTableRekber";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonMultiDropdown from "../components/ButtonMultiDropdown";

const TransaksiPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatusRekber, setSelectedStatusRekber] = useState([]);
  return (
    <div>
  <Breadcrumb />
  
  {/* Filter Section */}
  <div className="mb-4">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="max-w-[300px] w-full md:w-auto">
        <InputSearch Icon={Search} placeholder="Cari ID, nama dan email" />
      </div>

      <div className="flex gap-3 overflow-x-auto flex-wrap">
        <ButtonFilter />
        <div className="w-[300px]">
          <ButtonMultiDropdown
            placeholder="Status Rekber"
            options={[
              "Menunggu Pembayaran",
              "Menunggu Resi",
              "Dalam Pengiriman",
              "Barang Diterima Buyer",
              "Pengembalian",
            ]}
            value={selectedStatusRekber}
            onChange={setSelectedStatusRekber}
          />
        </div>
        <div className="w-[300px]">
          <ButtonDropdown
            placeholder="Status Pengajuan"
            options={[
              "Ditinjau",
              "Tanpa Pengajuan",
              "Menunggu Buyer",
              "Ditolak",
            ]}
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
  </div>

  {/* Data Table Section */}
  <div>
    <DataTableRekber />
  </div>
</div>
  );
};

export default TransaksiPage;
