import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { FaTicketAlt, FaCalendarAlt, FaChevronRight, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/user/bookings");
                setBookings(response.data || []);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchBookings();
        }
    }, [token]);

    const getStatusBadge = (status) => {
        const lowerStatus = (status || "").toLowerCase();
        if (lowerStatus === "completed" || lowerStatus === "paid" || lowerStatus === "active") {
            return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><FaCheckCircle className="text-xs" /> {status}</span>;
        }
        return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><FaClock className="text-xs" /> {status}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <FaTicketAlt className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order History</h1>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Track your premium reservations</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FaTicketAlt className="text-4xl" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">You haven't made any reservations yet. Explore our parks to get started!</p>
                        <button
                            onClick={() => navigate("/booking")}
                            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                        >
                            Book Now
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row items-center gap-6"
                            >
                                <div className="hidden md:flex w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <FaCalendarAlt className="text-2xl" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{booking.id}</span>
                                        {getStatusBadge(booking.status || booking.payment_status)}
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 mb-1">
                                        {new Date(booking.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-400">Total Paid: <span className="text-gray-900 font-black">₹{parseFloat(booking.total).toFixed(2)}</span></p>
                                </div>
                                <button
                                    onClick={() => navigate(`/booking-details`, { state: { bookingId: booking.id } })}
                                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                                >
                                    View Details
                                    <FaChevronRight className="text-[10px]" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
