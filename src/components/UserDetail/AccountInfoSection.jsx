import React from "react";

export const AccountInfoSection = () => {
  const accountData = [
    {
      label: "Email Pengguna",
      value: "irgiskakmat@gmail.com",
      rightLabel: "Tanggal Pendaftaran",
      rightValue: "11 Juni 2025 12 : 00 WIB"
    },
    {
      label: "Status KYC",
      value: "Terverifikasi",
      isStatus: true,
      rightLabel: "Tanggal Submit KYC",
      rightValue: "11 Juni 2025 14 : 00 WIB"
    },
    {
      label: "ID Pengguna",
      value: "RBK-0000001",
      rightLabel: "Tanggal Diterima",
      rightValue: "11 Juni 2025 16 : 00 WIB"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun</h2>
      
      <div className="space-y-4">
        {accountData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <div className="flex items-center">
                {item.isStatus ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                    {item.value}
                  </span>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.rightLabel}</p>
              <p className="text-sm font-medium text-gray-900">{item.rightValue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};