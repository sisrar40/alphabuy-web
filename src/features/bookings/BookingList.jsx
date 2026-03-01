import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminBookings, updateBookingStatus } from './bookingSlice';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import { FaEye, FaFilter } from 'react-icons/fa';

const BookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.adminBookings);

  useEffect(() => {
    dispatch(fetchAdminBookings());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateBookingStatus({ id, status: newStatus }));
  };

  const columns = [
    {
      header: 'Booking ID',
      accessor: 'id',
      render: (row) => <span className="font-bold text-gray-900">{row.id}</span>
    },
    {
      header: 'Customer',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-700">{row.userName}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{row.parkName}</p>
        </div>
      )
    },
    {
      header: 'Date & Slots',
      render: (row) => (
        <span className="text-sm font-medium text-gray-600">
          {new Date(row.date).toLocaleDateString()} · <span className="font-bold">{row.slots} Slots</span>
        </span>
      )
    },
    {
      header: 'Amount',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">₹{row.amount}</p>
          <p className={`text-[10px] font-bold uppercase ${row.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-400'}`}>
            {row.paymentStatus}
          </p>
        </div>
      )
    },
    {
      header: 'Status',
      render: (row) => (
        <select 
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`
            px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider outline-none border transition-all cursor-pointer
            ${row.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
              row.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
              'bg-yellow-50 text-yellow-700 border-yellow-200'}
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      tdClassName: 'text-right',
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/bookings/${row.id}`)}>
          <FaEye className="text-gray-400 hover:text-blue-600" />
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Reservations" 
        subtitle="Track and manage guest ticket bookings and payment status."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <FaFilter className="mr-2" />
              Filters
            </Button>
          </div>
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

export default BookingList;
