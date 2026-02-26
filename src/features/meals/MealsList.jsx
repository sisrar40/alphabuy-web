import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMeals } from './mealSlice';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const MealsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const columns = [
    {
      header: 'Meal Name',
      accessor: 'mealName',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.mealName}</p>
          <p className="text-xs text-blue-600 font-bold uppercase tracking-tighter">{row.parkName}</p>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (row) => <span className="font-bold">₹{row.price}</span>
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
        title="Meal Management" 
        subtitle="Manage the dining plans associated with your theme parks."
        action={
          <Button onClick={() => navigate('/admin/meals/add')}>
            <FaPlus className="mr-2" />
            Add Meal
          </Button>
        }
      />

      <Table 
        columns={columns} 
        data={items} 
        loading={loading}
      />
    </div>
  );
};

export default MealsList;
