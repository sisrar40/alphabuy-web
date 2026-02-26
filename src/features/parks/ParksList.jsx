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
    <div className="space-y-6">
      <PageHeader 
        title="Theme Parks" 
        subtitle="Manage your theme park locations and base pricing."
        action={
          <Button onClick={() => navigate('/admin/parks/add')}>
            <FaPlus className="mr-2" />
            Add Park
          </Button>
        }
      />

      <Table 
        columns={columns} 
        data={items} 
        loading={loading} 
        pagination={{ total: items.length, current: 1 }}
      />
    </div>
  );
};

export default ParksList;
