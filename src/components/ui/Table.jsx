import React from 'react';
import Loader from './Loader';

const Table = ({ 
  columns, 
  data, 
  loading = false, 
  pagination = null, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-[32px] shadow-soft border border-gray-50 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-50">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={`px-8 py-6 ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-20 text-center">
                  <Loader className="mx-auto h-12 w-12 text-aqua-500" />
                  <p className="mt-6 text-xs font-black text-gray-400 uppercase tracking-widest">Synchronizing Data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-20 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  No records stored.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="group hover:bg-gray-50/50 transition-standard">
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`px-8 py-6 text-sm font-semibold text-gray-700 ${column.tdClassName || ''}`}
                    >
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="bg-gray-50/20 px-8 py-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Showing <span className="text-gray-900">1</span> to <span className="text-gray-900">10</span> of <span className="text-gray-900">20</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-aqua-600 transition-standard shadow-soft">
                &larr;
              </button>
              <button className="px-4 py-2 rounded-xl bg-white border border-aqua-200 text-aqua-600 font-bold text-xs shadow-soft">
                1
              </button>
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-aqua-600 transition-standard shadow-soft">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
