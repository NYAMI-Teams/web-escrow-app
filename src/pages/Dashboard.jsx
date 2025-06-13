import Breadcrumb from "../components/BreadCrumb";
import ButtonDropdown from "../components/ButtonDropdown";
import ButtonFilter from "../components/ButtonFilter";
import InputSearch from "../components/InputSearch";
import { Search, CalendarDays } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full">

      <Breadcrumb />

      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">

        <div className="max-w-[300px] w-full md:w-auto">
          <InputSearch Icon={Search} placeholder="Cari ID, nama dan email" />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto">
          <ButtonFilter />
          <div className="w-[200px]">
            <ButtonDropdown placeholder="Status Pengguna" />
          </div>
          <div className="w-[200px]">
            <InputSearch Icon={CalendarDays} placeholder="Tanggal Registrasi" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
