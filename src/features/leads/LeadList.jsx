import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, updateLeadStatus, deleteLead } from './leadSlice';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { FaTrash, FaSearch, FaEnvelope, FaPhone } from 'react-icons/fa';

const LeadList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { items, loading } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateLeadStatus({ id, status: newStatus }));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Customer Details',
      render: (row) => (
        <div className="space-y-1">
          <p className="font-black text-gray-900 leading-tight">{row.name}</p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
             <span className="flex items-center gap-1"><FaEnvelope className="text-[8px]"/> {row.email}</span>
             <span className="flex items-center gap-1"><FaPhone className="text-[8px]"/> {row.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Interest',
      accessor: 'park',
      render: (row) => (
         <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">{row.park}</p>
            <p className="text-[10px] text-gray-400 line-clamp-1 italic">"{row.message}"</p>
         </div>
      )
    },
    {
      header: 'Date',
      render: (row) => <span className="text-xs font-medium text-gray-600">{new Date(row.date).toLocaleDateString()}</span>
    },
    {
      header: 'Status',
      render: (row) => (
        <select 
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`
            px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider outline-none border transition-all cursor-pointer
            ${row.status === 'Converted' ? 'bg-green-50 text-green-700 border-green-200' : 
              row.status === 'Contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
              'bg-gray-100 text-gray-600 border-gray-200'}
          `}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      tdClassName: 'text-right',
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => {
          if(window.confirm('Delete this inquiry?')) dispatch(deleteLead(row.id));
        }}>
          <FaTrash className="text-gray-300 hover:text-red-500" />
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Inquiries & Leads" 
        subtitle="Manage customer interest and follow-up activities."
      />

      <div className="flex justify-between items-center mb-6">
        <div className="w-full max-w-md">
          <Input 
             placeholder="Search by name or email..." 
             icon={FaSearch}
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredItems} 
        loading={loading}
      />
    </div>
  );
};

export default LeadList;
