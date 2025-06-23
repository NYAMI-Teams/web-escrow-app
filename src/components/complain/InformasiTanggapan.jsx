import React, { useState } from "react";
import buktiPengirimanImg from "../../assets/bukti-pengajuan.png";

const InformasiTanggapan = ({ status: initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  const isDibatalkan = status === "Dibatalkan";
  const isPengembalian = status === "Pengembalian Barang";
  const isPersetujuanAdmin = status === "Persetujuan Admin";

  const showTanggapanAdmin = isPersetujuanAdmin || isPengembalian;
  const isDisabled = isPengembalian;

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `bukti_${index + 1}.jpg`;
    link.click();
  };

  const handlePreview = (url) => {
    window.open(url, "_blank");
  };

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
              <button
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => handleDownload(buktiPengirimanImg, i)}
              >
                Download
              </button>
              <button
                className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50"
                onClick={() => handlePreview(buktiPengirimanImg)}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat bubble kiri: info email dan waktu */}
      <div className="flex">
        <div className="text-xs text-gray-500 ml-2">
          bayuseptyan925@gmail.com · <strong>16 Juni 2025, 10:00 WIB</strong>
        </div>
      </div>

      {/* Tambahan bubble jika persetujuan admin */}
      {isPersetujuanAdmin && (
        <>
          <div className="mt-6 ml-auto w-fit text-right">
            <div className="bg-blue-900 text-white text-sm px-4 py-3 rounded-lg rounded-tr-none max-w-md">
              Penolakan dikarenakan bukti buyer belum cukup kuat dan tidak ada alasan menerima hal seperti itu
            </div>
          </div>

          <div className="flex gap-4 mt-4 justify-end">
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
                  <button
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleDownload(buktiPengirimanImg, i)}
                  >
                    Download
                  </button>
                  <button
                    className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50"
                    onClick={() => handlePreview(buktiPengirimanImg)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 mt-1 text-right">
            bayuseptyan925@gmail.com · <strong>16 Juni 2025, 10:00 WIB</strong>
          </div>
        </>
      )}

      {/* Tambahan bubble jika pengembalian barang */}
      {isPengembalian && (
        <>
          <div className="mt-6 ml-auto w-fit text-right">
            <div className="bg-blue-900 text-white text-sm px-4 py-3 rounded-lg rounded-tr-none max-w-md">
              Penolakan dikarenakan bukti buyer belum cukup kuat dan tidak ada alasan menerima hal seperti itu
            </div>
          </div>

          <div className="flex gap-4 mt-4 justify-end">
            {/* Gambar biasa */}
            <div className="flex flex-col items-start gap-2 bg-gray-100 p-3 rounded-lg rounded-tl-none">
              <img
                src={buktiPengirimanImg}
                alt="Bukti Refund"
                className="w-56 h-auto object-cover rounded-md"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleDownload(buktiPengirimanImg, 0)}
                >
                  Download
                </button>
                <button
                  className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50"
                  onClick={() => handlePreview(buktiPengirimanImg)}
                >
                  Preview
                </button>
              </div>
            </div>

            {/* Simulasi video */}
            <div className="flex flex-col items-start gap-2 bg-gray-100 p-3 rounded-lg rounded-tl-none">
              <div className="relative overflow-hidden rounded-md bg-black w-56 h-[140px] flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleDownload(buktiPengirimanImg, 1)}
                >
                  Download
                </button>
                <button
                  className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50"
                  onClick={() => handlePreview(buktiPengirimanImg)}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-1 text-right">
            bayuseptyan925@gmail.com · <strong>16 Juni 2025, 10:00 WIB</strong>
          </div>
        </>
      )}

      {/* Text field dan tombol tanggapan admin */}
      {showTanggapanAdmin && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Tanggapan Admin</h3>
          <textarea
            rows="3"
            className={`w-full border rounded-lg p-3 text-sm ${isDisabled ? "bg-gray-100 text-gray-500" : "text-gray-800"}`}
            placeholder="Tulis tanggapan admin di sini..."
            defaultValue="Setelah tinjau bukti yang kamu kirim, komplain dinyatakan valid. Refund akan diproses meski seller menolak, sesuai ketentuan yang berlaku."
            disabled={isDisabled}
          />
          {!isDisabled && (
            <div className="flex justify-end gap-3 mt-3">
              <button className="bg-pink-100 text-pink-700 text-sm px-5 py-2 rounded hover:bg-pink-200">
                Tolak
              </button>
              <button
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded hover:bg-blue-700"
                onClick={() => setStatus("Pengembalian Barang")}
              >
                Setujui
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chat bubble kanan: status dari step saat ini */}
      {!isPengembalian && !isDibatalkan && !isPersetujuanAdmin && (
        <>
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
        </>
      )}

      {/* Tambahan bubble jika dibatalkan */}
      {isDibatalkan && (
        <>
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
          <div className="mt-6">
            <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none w-fit max-w-md">
              Buyer telah membatalkan komplain ini.
            </div>
            <div className="text-xs text-gray-500 ml-2 mt-1">
              bayuseptyan925@gmail.com · <strong>16 Juni 2025, 11:00 WIB</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InformasiTanggapan;
