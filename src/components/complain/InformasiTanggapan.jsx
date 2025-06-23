import React from "react";
import buktiPengirimanImg from "../../assets/bukti-pengajuan.png";

const InformasiTanggapan = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Tanggapan</h2>

      {/* Label solusi */}
      <div className="inline-block bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-md mb-6">
        Pengembalian barang dan dana
      </div>

      {/* Chat bubble kiri: komentar */}
      <div className="flex mb-4">
        <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none max-w-md">
          Layar barang pecah di bagian tengah dan ada goresan dalam di sisi kiri.
        </div>
      </div>

      {/* Chat bubble kiri: media */}
      <div className="flex gap-4 mb-2">
        {[1, 2].map((_, i) => (
          <div key={i} className="flex flex-col items-start gap-2 bg-gray-100 p-3 rounded-lg rounded-tl-none">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={buktiPengirimanImg}
                alt={`Bukti ${i + 1}`}
                className="w-56 h-auto object-cover rounded-md"
              />
              {i === 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                Download
              </button>
              <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat bubble kiri: info email dan waktu */}
      <div className="flex">
        <div className="text-xs text-gray-500 ml-2">
          zhirazzi@gmail.com · <strong>16 Juni 2025, 10:00 WIB</strong>
        </div>
      </div>

      {/* Chat bubble kanan: status dari step saat ini */}
      <div className="flex justify-end mt-6">
        <div className="bg-blue-900 text-white text-sm px-4 py-3 rounded-lg rounded-tr-none w-fit min-w-[320px] text-right">
          Menunggu seller setuju ataupun menolak komplain ini .....
        </div>
      </div>
      <div className="flex justify-end">
        <p className="text-xs text-red-600 mt-1 text-right">
          Menunggu respon sampai <strong>18 Juni 2025, 10.00 WIB</strong>
        </p>
      </div>
    </div>
  );
};

export default InformasiTanggapan;
