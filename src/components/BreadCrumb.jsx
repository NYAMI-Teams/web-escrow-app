import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();

  // Pisahkan pathname jadi array
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="w-full flex flex-row items-center gap-2 text-left text-base text-dimgray font-sf-pro mb-4">

      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-[#5c5c5c]" />
            <span
              className={`leading-6 ${
                isLast ? "font-semibold text-[#0250d9]" : "text-[#5c5c5c]"
              }`}
            >
              {displayName.replace(/-/g, " ")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
