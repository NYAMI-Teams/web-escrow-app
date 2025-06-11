import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='flex-1 bg-gray-100 p-6'>{children}</main>
    </div>
  );
};

export default MainLayout;
