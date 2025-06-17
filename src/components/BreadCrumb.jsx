import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isUUID = (str) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  // Mapping segment ke nama item
  const routeNameMap = {
    transactions: "Daftar Transaksi",
    user: "Daftar User",
    complain: "Daftar Komplain",
  };

  // Mapping segment ke menu group
  const parentMenuMap = {
    transactions: "Manajemen Rekber",
    user: "Manajemen Pengguna",
    complain: "Manajemen Komplain",
  };

  // Cari parent menu dari segment pertama
  const firstSegment = pathnames[0];
  const parentMenu = parentMenuMap[firstSegment];

  return (
    <div className="w-full flex flex-row items-center gap-2 text-left text-base text-dimgray font-sf-pro mb-4">
      {parentMenu && (
        <div className="flex items-center gap-2">
          <span className="leading-6 text-[#5c5c5c]">{parentMenu}</span>
        </div>
      )}

      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const displayName = isUUID(name)
          ? firstSegment === "transactions"
            ? "Detail Transaksi"
            : firstSegment === "complain"
            ? "Detail Komplain"
            : "Detail"
          : routeNameMap[name] ||
            name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-[#5c5c5c]" />
            {isLast ? (
              <span className="leading-6 font-semibold text-[#0250d9]">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="leading-6 text-[#5c5c5c] hover:underline"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
