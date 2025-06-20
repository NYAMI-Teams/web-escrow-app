import React from "react";
import { useNavigate } from "react-router-dom";
import DataTableBarangRusak from "../components/table/DataTableBarangRusak";
import { ChevronRightIcon } from "lucide-react";

const BreadcrumbComplain = () => (
    <nav className="flex items-center space-x-2 text-sm mb-6">
        <span className="text-gray-600">Komplain Center</span>
        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        <span className="text-blue-600 font-medium">Komplain Barang Rusak</span>
    </nav>
);

const BarangRusakPage = () => {
    const navigate = useNavigate();

    const handleDetail = (row) => {
        navigate(`/barang-rusak/${row.id}`, { state: { data: row } });
    };

    return (
        <div className="p-6">
            <BreadcrumbComplain />
            <h1 className="text-2xl font-bold mb-6">Daftar Komplain Barang Rusak</h1>
            <DataTableBarangRusak onRowDetail={handleDetail} />
        </div>
    );
};

export default BarangRusakPage; 