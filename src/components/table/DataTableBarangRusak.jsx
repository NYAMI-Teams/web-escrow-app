import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ChevronDownIcon, ArrowRightIcon, CheckCircle2, XCircle } from "lucide-react";

const STATUS_COLORS = {
    "Persetujuan Seller": "text-blue-800",
    "Dibatalkan": "text-gray-400",
    "Pengembalian Barang": "text-yellow-500",
    "Persetujuan Admin": "text-blue-600",
    "Transaksi Selesai": "text-teal-500",
};

const PENGAJUAN_STATUS_COLORS = {
    "Ditolak": "text-red-500 font-semibold",
    "Menunggu buyer": "text-green-600 font-semibold",
    "Tanpa pengajuan": "text-gray-500",
};

const statusOrder = [
    "Persetujuan Seller",
    "Pengembalian Barang",
    "Persetujuan Admin",
    "Transaksi Selesai",
    "Dibatalkan",
];

const asuransiIcon = (val) =>
    val ? (
        <CheckCircle2 className="text-blue-500 w-5 h-5" />
    ) : (
        <XCircle className="text-gray-400 w-5 h-5" />
    );

const columns = [
    { key: "id", label: "ID Komplain", minWidth: "120px" },
    { key: "waktu", label: "Waktu Komplain", minWidth: "140px", sortable: true },
    { key: "nama", label: "Nama Barang", minWidth: "180px" },
    { key: "pembeli", label: "Pembeli", minWidth: "180px" },
    { key: "noResi", label: "No Resi", minWidth: "140px" },
    { key: "ekspedisi", label: "Ekspedisi", minWidth: "180px", sortable: true },
    { key: "status", label: "Status Komplain", minWidth: "160px", filterable: true },
    { key: "statusPengajuan", label: "Status Pengajuan", minWidth: "160px" },
    { key: "asuransi", label: "Asuransi", minWidth: "80px" },
];

const initialData = [
    {
        id: "R2345678901",
        waktu: "17 Juni 2025",
        nama: "Monitor Gaming",
        pembeli: "user1@example.com",
        noResi: "JX3474124013",
        ekspedisi: "J&T Express Indonesia",
        status: "Persetujuan Seller",
        asuransi: true,
        statusPengajuan: null,
    },
    {
        id: "R2345678902",
        waktu: "18 Juni 2025",
        nama: "Keyboard Mechanical",
        pembeli: "user2@example.com",
        noResi: "JX3474124014",
        ekspedisi: "JNE Indonesia",
        status: "Dibatalkan",
        asuransi: false,
        statusPengajuan: null,
    },
    {
        id: "R2345678903",
        waktu: "16 Juni 2025",
        nama: "Mouse Logitech",
        pembeli: "user3@example.com",
        noResi: "JX3474124015",
        ekspedisi: "SiCepat Express",
        status: "Pengembalian Barang",
        asuransi: false,
        statusPengajuan: "Menunggu buyer",
    },
    {
        id: "R2345678904",
        waktu: "20 Juni 2025",
        nama: "Webcam HD",
        pembeli: "user4@example.com",
        noResi: "JX3474124016",
        ekspedisi: "Pos Indonesia",
        status: "Persetujuan Admin",
        asuransi: false,
        statusPengajuan: null,
    },
    {
        id: "R2345678905",
        waktu: "21 Juni 2025",
        nama: "Headset Gaming",
        pembeli: "user5@example.com",
        noResi: "JX3474124017",
        ekspedisi: "J&T Express Indonesia",
        status: "Transaksi Selesai",
        asuransi: true,
        statusPengajuan: null,
    },
    {
        id: "R2345678906",
        waktu: "22 Juni 2025",
        nama: "Kabel HDMI",
        pembeli: "user6@example.com",
        noResi: "JX3474124018",
        ekspedisi: "JNE Indonesia",
        status: "Pengembalian Barang",
        asuransi: true,
        statusPengajuan: "Ditolak",
    },
    {
        id: "R2345678907",
        waktu: "23 Juni 2025",
        nama: "Meja Komputer",
        pembeli: "user7@example.com",
        noResi: "JX3474124019",
        ekspedisi: "SiCepat Express",
        status: "Pengembalian Barang",
        asuransi: false,
        statusPengajuan: "Tanpa pengajuan",
    },
    {
        id: "R2345678908",
        waktu: "24 Juni 2025",
        nama: "Kursi Gaming",
        pembeli: "user8@example.com",
        noResi: "JX3474124020",
        ekspedisi: "GoSend",
        status: "Persetujuan Seller",
        asuransi: true,
        statusPengajuan: null,
    },
    {
        id: "R2345678909",
        waktu: "25 Juni 2025",
        nama: "Mic Kondenser",
        pembeli: "user9@example.com",
        noResi: "JX3474124021",
        ekspedisi: "J&T Express Indonesia",
        status: "Persetujuan Admin",
        asuransi: true,
        statusPengajuan: null,
    },
    {
        id: "R2345678910",
        waktu: "26 Juni 2025",
        nama: "Lampu LED RGB",
        pembeli: "user10@example.com",
        noResi: "JX3474124022",
        ekspedisi: "Anteraja",
        status: "Pengembalian Barang",
        asuransi: false,
        statusPengajuan: "Menunggu buyer",
    },
];

const DataTableBarangRusak = ({ onRowDetail }) => {
    const [data, setData] = useState(initialData);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filterConfig, setFilterConfig] = useState(null);

    const processedData = useMemo(() => {
        let sortableItems = [...data];
        if (filterConfig) {
            if (filterConfig.key === "status") {
                sortableItems.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
            }
        }
        if (sortConfig && sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (sortConfig.key === "waktu") {
                    const parseDate = (str) => {
                        const [day, month, year] = str.split(" ");
                        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                        return new Date(parseInt(year), months.indexOf(month), parseInt(day));
                    };
                    const aDate = parseDate(aValue);
                    const bDate = parseDate(bValue);
                    return sortConfig.direction === "ascending" ? aDate - bDate : bDate - aDate;
                } else if (sortConfig.key === "status") {
                    if (sortConfig.direction === "ascending") {
                        return statusOrder.indexOf(aValue) - statusOrder.indexOf(bValue);
                    } else {
                        return statusOrder.indexOf(bValue) - statusOrder.indexOf(aValue);
                    }
                } else if (typeof aValue === "string" && typeof bValue === "string") {
                    if (aValue.toLowerCase() < bValue.toLowerCase()) {
                        return sortConfig.direction === "ascending" ? -1 : 1;
                    }
                    if (aValue.toLowerCase() > bValue.toLowerCase()) {
                        return sortConfig.direction === "ascending" ? 1 : -1;
                    }
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig, filterConfig]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const currentItems = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        const allChecked = currentItems.length > 0 && currentItems.every((item) => checkedItems[item.id]);
        setSelectAll(allChecked);
    }, [checkedItems, currentItems]);

    const handleHeaderCheckboxChange = (checked) => {
        const newCheckedItems = {};
        currentItems.forEach((item) => {
            newCheckedItems[item.id] = checked;
        });
        setCheckedItems(newCheckedItems);
        setSelectAll(checked);
    };

    const handleCheckboxChange = (id, checked) => {
        const newCheckedItems = { ...checkedItems, [id]: checked };
        setCheckedItems(newCheckedItems);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (key) => {
        if (sortConfig.key !== key) {
            setSortConfig({ key, direction: "ascending" });
        } else if (sortConfig.direction === "ascending") {
            setSortConfig({ key, direction: "descending" });
        } else if (sortConfig.direction === "descending") {
            setSortConfig({ key: null, direction: null });
        }
        setFilterConfig(null);
        setCurrentPage(1);
    };

    const handleStatusSort = () => {
        if (sortConfig.key !== "status") {
            setSortConfig({ key: "status", direction: "ascending" });
        } else if (sortConfig.direction === "ascending") {
            setSortConfig({ key: "status", direction: "descending" });
        } else if (sortConfig.direction === "descending") {
            setSortConfig({ key: null, direction: null });
        }
        setFilterConfig(null);
        setCurrentPage(1);
    };

    const handleCategoryFilter = (key) => {
        if (filterConfig && filterConfig.key === key) {
            setFilterConfig(null);
            setSortConfig({ key: null, direction: null });
        } else {
            setFilterConfig({ key });
            setSortConfig({ key: null, direction: null });
        }
        setCurrentPage(1);
    };

    const getStatusClass = (status) => STATUS_COLORS[status] || "text-gray-500";

    const getArrowIcon = (key, type = "sort") => {
        if (type === "sort" && sortConfig && sortConfig.key === key) {
            return (
                <ChevronDownIcon
                    className={`w-3 h-3 text-[#5c5c5c] transition-transform duration-200 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                />
            );
        }
        if (type === "filter" && filterConfig && filterConfig.key === key) {
            return <ChevronDownIcon className="w-3 h-3 text-blue-500 rotate-180" />;
        }
        return <ChevronDownIcon className="w-3 h-3 text-[#5c5c5c]" />;
    };

    return (
        <div className="flex w-full justify-center p-4">
            <div className="w-full max-w-[1200px] overflow-x-auto">
                <div className="relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4">
                    <div className="relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl">
                        Jumlah informasi yang ditampilkan
                    </div>
                    <div className="rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]">
                        <b className="relative leading-[22px]">{data.length}</b>
                    </div>
                </div>
                <Table className="border-collapse border border-[#c9c9c9] w-full">
                    <TableHeader>
                        <TableRow className="bg-[#f3f3f3] border-b border-[#c9c9c9]">
                            <TableHead className="w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]">
                                <div className="flex h-[38px] items-center justify-center">
                                    <Checkbox
                                        className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                                        checked={selectAll}
                                        onCheckedChange={handleHeaderCheckboxChange}
                                    />
                                </div>
                            </TableHead>
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key}
                                    className={`h-[38px] px-2 py-0 border-r border-[#c9c9c9] text-[#5c5c5c] text-sm min-w-[${col.minWidth}] ${col.key === 'status' || col.sortable ? "cursor-pointer" : ""}`}
                                    onClick={col.key === 'status' ? handleStatusSort : col.sortable ? () => handleSort(col.key) : undefined}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span>{col.label}</span>
                                        {col.key === 'status' ? getArrowIcon('status', 'sort') : col.sortable ? getArrowIcon(col.key, 'sort') : null}
                                        {col.filterable && col.key !== 'status' ? getArrowIcon(col.key, 'filter') : null}
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className="w-[52px] h-[38px] p-0 min-w-[52px]">
                                <div className="flex h-[38px] items-center justify-center"></div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((item, index) => (
                            <TableRow
                                key={item.id}
                                className={`h-[38px] border-b border-[#c9c9c9] ${index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"} hover:bg-[#e6f7ff]`}
                            >
                                <TableCell className="w-[42px] p-0 border-r border-[#c9c9c9]">
                                    <div className="flex h-[38px] items-center justify-center">
                                        <Checkbox
                                            className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                                            checked={checkedItems[item.id] || false}
                                            onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                                        />
                                    </div>
                                </TableCell>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.key}
                                        className={`px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c] ${col.key === "status" ? "text-sm" : ""} ${col.key === "asuransi" ? "text-center" : ""}`}
                                    >
                                        {col.key === "status" ? (
                                            <span className={`font-semibold ${getStatusClass(item.status)}`}>{item.status}</span>
                                        ) : col.key === "statusPengajuan" ? (
                                            (() => {
                                                const statusPengajuan = item.status === 'Pengembalian Barang' ? item.statusPengajuan : "Tanpa pengajuan";
                                                const statusClass = PENGAJUAN_STATUS_COLORS[statusPengajuan] || "text-gray-500";
                                                return <span className={statusClass}>{statusPengajuan}</span>;
                                            })()
                                        ) : col.key === "asuransi" ? (
                                            asuransiIcon(item.asuransi)
                                        ) : (
                                            <div
                                                className={
                                                    col.key === "nama" || col.key === "pembeli"
                                                        ? "overflow-hidden whitespace-nowrap text-ellipsis max-w-[160px]"
                                                        : undefined
                                                }
                                                title={item[col.key]}
                                            >
                                                {item[col.key]}
                                            </div>
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell className="w-[52px] p-0">
                                    <div className="flex h-[38px] items-center justify-center">
                                        <ArrowRightIcon className="w-4 h-4 text-[#5c5c5c] cursor-pointer" onClick={() => onRowDetail && onRowDetail(item)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-end items-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTableBarangRusak; 