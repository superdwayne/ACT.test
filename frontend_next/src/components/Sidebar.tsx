import React from 'react';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h2>Acme Inc</h2>
        <button className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white">New Document</button>
      </div>
      <nav className="mt-10">
        <ul>
          <li>Dashboard</li>
          <li>Lifecycle</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Help Center</li>
          <li>Logout</li>
        </ul>
      </nav>
      <footer className="mt-auto">
        <ul>
          <li>Settings</li>
          <li>Get help</li>
        </ul>
      </footer>
    </div>
  );
};

export default Sidebar;
