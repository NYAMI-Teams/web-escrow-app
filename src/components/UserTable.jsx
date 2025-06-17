// components/UserTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ArrowRightIcon } from "lucide-react";

const formatDateID = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mapKYCStatusToUI = (status) => {
  const map = {
    verified: "Terverifikasi",
    unverified: "Belum Terverifikasi",
  };
  return map[status] || "Status Tidak Dikenal";
};

const UserTable = ({
  users,
  loading,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className='flex w-full justify-center p-4'>
      <div className='w-full overflow-x-auto'>
        <div className='min-w-fit'>
          <div className='relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4'>
            <div className='relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl'>
              Jumlah informasi yang ditampilkan
            </div>
            <div className='rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]'>
              <b className='relative leading-[22px]'>{users.length}</b>
            </div>
          </div>

          {loading ? (
            <table class='border-collapse border border-[#c9c9c9] w-full animate-pulse'>
              <thead>
                <tr class='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                  <th class='px-2 text-sm text-[#5c5c5c] min-w-[120px]'>
                    <div class='bg-gray-200 h-4 min-w-[120px] rounded'></div>
                  </th>
                  <th class='px-2 text-sm text-[#5c5c5c] min-w-[200px]'>
                    <div class='bg-gray-200 h-4 min-w-[200px] rounded'></div>
                  </th>
                  <th class='px-2 text-sm text-[#5c5c5c] min-w-[180px]'>
                    <div class='bg-gray-200 h-4 min-w-[180px] rounded'></div>
                  </th>
                  <th class='px-2 text-sm text-[#5c5c5c] min-w-[120px]'>
                    <div class='bg-gray-200 h-4 min-w-[120px] rounded'></div>
                  </th>
                  <th class='w-[52px]'>
                    <div class='bg-gray-200 h-4 w-[52px] rounded'></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class='h-[38px] border-b border-[#c9c9c9] bg-white'>
                  <td class='px-2 text-sm text-[#5c5c5c]'>
                    <div class='bg-gray-200 h-4 w-full rounded'></div>
                  </td>
                  <td class='px-2 text-sm text-[#5c5c5c]'>
                    <div class='bg-gray-200 h-4 w-full rounded'></div>
                  </td>
                  <td class='px-2 text-sm text-[#5c5c5c]'>
                    <div class='bg-gray-200 h-4 w-full rounded'></div>
                  </td>
                  <td class='px-2 text-sm text-[#5c5c5c]'>
                    <div class='bg-gray-200 h-4 w-full rounded'></div>
                  </td>
                  <td class='text-center'>
                    <div class='bg-gray-200 h-4 rounded'></div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <Table className='border-collapse border border-[#c9c9c9] w-full'>
              <TableHeader>
                <TableRow className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                    ID User
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                    Tanggal Registrasi
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                    Email
                  </TableHead>
                  <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                    Status KYC
                  </TableHead>
                  <TableHead className='w-[52px] h-[38px] p-0 min-w-[52px]' />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className={`h-[38px] border-b border-[#c9c9c9] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                    } hover:bg-[#e6f7ff]`}
                  >
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {user.id}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {formatDateID(user.createdAt)}
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      <div
                        className='overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px]'
                        title={user.email}
                      >
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                      {mapKYCStatusToUI(user.kycStatus)}
                    </TableCell>
                    <TableCell className='text-center'>
                      <ArrowRightIcon className='w-4 h-4 text-[#5c5c5c] hover:text-blue-600 cursor-pointer' />
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

export default UserTable;
