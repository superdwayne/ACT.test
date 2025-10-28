import React from 'react';

export const MainContent = () => {
  return (
    <div className="flex-1">
      <div className="p-4">
        <h1>Documents</h1>
        <button>GitHub</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h3>Total Revenue</h3>
          <p className="text-xl">$10,000</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3>New Customers</h3>
          <p className="text-xl">150</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3>Active Accounts</h3>
          <p className="text-xl">500</p>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainContent;
