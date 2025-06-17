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
import { ChevronDownIcon, ArrowRightIcon } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const DataTableUser = () => {
  // Helper to format Date object to your desired string format for display
  const formatDateTimeForDisplay = (dateObj) => {
    if (!dateObj) return "";
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  // Initial data generation (done only once on component mount)
  const [initialUserData] = useState(() => {
    // Renamed to initialUserData
    const generatedData = Array.from({ length: 30 }, (_, i) => {
      // Generate random time for "registrationDate"
      const now = new Date();
      const randomOffsetSeconds = Math.floor(
        Math.random() * (60 * 24 * 60 * 60)
      ); // Up to 60 days ago
      const randomDate = new Date(now.getTime() - randomOffsetSeconds * 1000);

      return {
        id: `RBK-000000${i + 1}`,
        name: `User Name ${i + 1}`,
        email: `user${i + 1}@example.com${
          i % 3 === 0
            ? "thisisavvvvvvvvvvvvvvvverylongemailaddressforvisualtestthatshouldbetruncateddynamically.com"
            : ""
        }`,
        registrationDate: randomDate, // Store Date object directly
        kycStatus: "Terverifikasi", // All users are "Terverifikasi"
      };
    });
    return generatedData;
  });

  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Default sortConfig: sort by registrationDate, descending (recent first)
  const [sortConfig, setSortConfig] = useState({
    key: "registrationDate",
    direction: "descending",
  });

  // Memoize filtered and sorted data for performance
  const processedData = useMemo(() => {
    let sortableItems = [...initialUserData]; // Use initial data as base

    // Apply sorting if configured
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === "registrationDate") {
          // Compare Date objects directly
          return sortConfig.direction === "ascending"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          // Fallback for other string columns if needed, though not explicitly requested to sort
          if (aValue.toLowerCase() < bValue.toLowerCase()) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue.toLowerCase() > bValue.toLowerCase()) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        // No specific sorting for other types as per current request, keep as is
        return 0;
      });
    }

    return sortableItems;
  }, [initialUserData, sortConfig]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentItems = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update selectAll state based on checkedItems of the current page
  useEffect(() => {
    const allChecked =
      currentItems.length > 0 &&
      currentItems.every((user) => checkedItems[user.id]);
    setSelectAll(allChecked);
  }, [checkedItems, currentItems]);

  const handleHeaderCheckboxChange = (checked) => {
    const newCheckedItems = {};
    currentItems.forEach((user) => {
      newCheckedItems[user.id] = checked;
    });
    setCheckedItems(newCheckedItems);
    setSelectAll(checked);
  };

  const handleCheckboxChange = (userId, checked) => {
    const newCheckedItems = { ...checkedItems, [userId]: checked };
    setCheckedItems(newCheckedItems);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sorting click
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else {
        // If already descending, and it's the current sort column,
        // revert to the default (descending) time sort.
        // For 'Tanggal Registrasi', clicking again (from descending) should make it ascending
        // then clicking again should make it descending, creating a cycle.
        // If it's a different column that used to be sortable, this logic would reset to default.
        if (key === "registrationDate") {
          // specific for the single sortable column
          direction = "ascending"; // If current is descending, next click makes it ascending
        } else {
          // This else block is for if we had multiple sortable columns.
          // For now, only Tanggal Registrasi is sortable, so this block won't be hit
          // unless we add other sortable columns.
        }
      }
    } else {
      // If a new sort key is clicked, default direction is ascending
      // Except for registrationDate, where default click should be descending (most recent)
      if (key === "registrationDate") {
        direction = "descending";
      }
    }

    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };

  // Helper to get arrow icon and rotation
  const getArrowIcon = (key) => {
    // Removed type parameter as only one type of interactive header now
    if (sortConfig && sortConfig.key === key) {
      return (
        <ChevronDownIcon
          className={`w-3 h-3 text-[#5c5c5c] transition-transform duration-200 ${
            sortConfig.direction === "ascending" ? "rotate-180" : ""
          }`}
        />
      );
    }
    return null; // Don't show icon if not the active sort column
  };

  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/user/${id}`);
  };

  const { setUserCount } = useUserStore();
  useEffect(() => {
    setUserCount(initialUserData.length);
  }, [initialUserData]);

  return (
    <div className="flex w-full justify-center p-4">
      <div className="w-full max-w-[1120px] overflow-x-auto">
        {" "}
        {/* Added overflow-x-auto */}
        {/* Component to display the total number of items */}
        <div className="relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4">
          <div className="relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl">
            Jumlah informasi yang ditampilkan
          </div>
          {/* Badge for the total count - increased padding */}
          <div className="rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]">
            <b className="relative leading-[22px]">{initialUserData.length}</b>
          </div>
        </div>
        {/* End of component to display the total number of items */}
        <Table className="border-collapse border border-[#c9c9c9] w-full">
          {" "}
          {/* Added w-full */}
          <TableHeader>
            <TableRow className="bg-[#f3f3f3] border-b border-[#c9c9c9]">
              {/* Checkbox Column */}
              <TableHead className="w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]">
                <div className="flex h-[38px] items-center justify-center">
                  <Checkbox
                    className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                    checked={selectAll}
                    onCheckedChange={handleHeaderCheckboxChange}
                  />
                </div>
              </TableHead>

              {/* ID User Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[120px]">
                <div className="flex items-center justify-between w-full">
                  <span>ID User</span>
                  {/* Icon removed */}
                </div>
              </TableHead>

              {/* Nama Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[150px]">
                <div className="flex items-center justify-between w-full">
                  <span>Nama</span>
                  {/* Icon removed */}
                </div>
              </TableHead>

              {/* Email Column Header */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[250px]">
                {" "}
                {/* Increased min-width for email */}
                <div className="flex items-center justify-between w-full">
                  <span>Email</span>
                </div>
              </TableHead>

              {/* Tanggal Registrasi Column - Clickable for Sorting */}
              <TableHead
                className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[180px]"
                onClick={() => handleSort("registrationDate")}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Tanggal Registrasi</span>
                  {getArrowIcon("registrationDate")}
                </div>
              </TableHead>

              {/* Status KYC Column */}
              <TableHead className="h-[38px] px-2 py-0 border-r border-[#c9c9c9] font-body-font-scale-base-semibold text-[#5c5c5c] text-sm group hover:bg-[#e6f7ff] transition-colors duration-200 cursor-pointer min-w-[140px]">
                <div className="flex items-center justify-between w-full">
                  <span>Status KYC</span>
                  {/* Icon removed */}
                </div>
              </TableHead>

              {/* Action Column */}
              <TableHead className="w-[52px] h-[38px] p-0 min-w-[52px]">
                <div className="flex h-[38px] items-center justify-center">
                  {/* Empty header for action column */}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((user, index) => (
              <TableRow
                key={user.id}
                className={`h-[38px] border-b border-[#c9c9c9] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                } hover:bg-[#e6f7ff]`}
              >
                {/* Checkbox Cell */}
                <TableCell className="w-[42px] p-0 border-r border-[#c9c9c9]">
                  <div className="flex h-[38px] items-center justify-center">
                    <Checkbox
                      className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                      checked={checkedItems[user.id] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(user.id, checked)
                      }
                    />
                  </div>
                </TableCell>

                {/* ID User Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  {user.id}
                </TableCell>

                {/* Nama Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  {user.name}
                </TableCell>

                {/* Email Cell - Re-added max-width for desired behavior */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  <div
                    className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px]" // Max-width
                    title={user.email} // Tooltip on hover
                  >
                    {user.email}
                  </div>
                </TableCell>

                {/* Tanggal Registrasi Cell - Display formatted date and time */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  {formatDateTimeForDisplay(user.registrationDate)}
                </TableCell>

                {/* Status KYC Cell */}
                <TableCell className="px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]">
                  {user.kycStatus}
                </TableCell>

                {/* Action Cell */}
                <TableCell className="w-[52px] p-0">
                  <div className="flex h-[38px] items-center justify-center">
                    <ArrowRightIcon
                      className="w-4 h-4 text-[#5c5c5c] cursor-pointer hover:text-blue-600 transition"
                      onClick={() => handleViewDetail("detail")}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
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
              className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"
              }`}
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

export default DataTableUser;
