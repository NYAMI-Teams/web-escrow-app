import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700 text-white" : "text-gray-300"
    }`;

  return (
    <div className='w-64 h-screen bg-gray-800 p-4'>
      <h2 className='text-white text-xl font-bold mb-6'>Admin Panel</h2>
      <nav className='flex flex-col gap-2'>
        <Link to='/' className={linkStyle("/")}>
          Dashboard
        </Link>
        <Link to='/users' className={linkStyle("/users")}>
          Users
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
