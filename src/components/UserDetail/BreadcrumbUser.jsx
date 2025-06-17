import React from "react";
import { ChevronRightIcon } from "lucide-react";

export const BreadcrumbUser = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <span className="text-gray-600">Manajemen Pengguna</span>
      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
      <span className="text-gray-600">Pengguna</span>
      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
      <span className="text-blue-600 font-medium">Detail Pengguna</span>
    </nav>
  );
};