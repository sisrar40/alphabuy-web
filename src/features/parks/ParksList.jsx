import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchParks } from './parkSlice';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const ParksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.parks);

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  const columns = [
    {
      header: 'Park Name',
      accessor: 'parkName',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.parkName}</p>
          <p className="text-xs text-gray-500">{row.location}</p>
        </div>
      )
    },
    {
      header: 'Base Price',
      accessor: 'price',
      render: (row) => <span className="font-bold">₹{row.price}</span>
    },
    {
      header: 'Status',
      render: () => <Badge variant="success">Active</Badge>
    },
    {
      header: 'Actions',
      className: 'text-right',
      tdClassName: 'text-right',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => console.log('Edit', row.id)}>
            <FaEdit className="text-blue-500" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => console.log('Delete', row.id)}>
            <FaTrash className="text-red-500" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <PageHeader 
        title="Asset Inventory" 
        subtitle="Comprehensive management of theme park ecosystems and base financial parameters."
        action={
          <button 
            onClick={() => navigate('/admin/parks/add')}
            className="bg-premium-gradient text-white px-8 py-4 rounded-[24px] font-bold text-[11px] uppercase tracking-wider shadow-xl shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
          >
            <FaPlus className="text-sm" />
            Initialize Asset
          </button>
        }
      />

      <div className="premium-card p-2 border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-100/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <Table 
          columns={columns} 
          data={items} 
          loading={loading} 
          pagination={{ total: items.length, current: 1 }}
        />
      </div>
    </div>
  );
};

export default ParksList;
