import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-hidden">{children}</main>
    </div>
  );
};


export default MainLayout;
