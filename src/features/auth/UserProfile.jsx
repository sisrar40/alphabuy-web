import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaShieldAlt, FaCalendarCheck, FaMapMarkerAlt, FaWallet } from "react-icons/fa";

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { wallet } = useSelector((state) => state.wallet);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-black">
                        {user.name?.charAt(0) || "U"}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center md:justify-start gap-2 mt-1">
                            <FaShieldAlt className="text-blue-500" />
                            {user.role} Member
                        </p>
                    </div>
                    <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 text-center">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Wallet Balance</p>
                        <p className="text-xl font-black text-blue-600">₹{wallet?.balance?.toFixed(2) || "0.00"}</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="font-black text-gray-900 uppercase tracking-widest text-xs">Account Details</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        <div className="p-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <FaUser />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                                <p className="font-bold text-gray-900">{user.name}</p>
                            </div>
                        </div>
                        <div className="p-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                <p className="font-bold text-gray-900">{user.email}</p>
                            </div>
                        </div>
                        <div className="p-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <FaCalendarCheck />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Since</p>
                                <p className="font-bold text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2 tracking-tight">Need help with your account?</h3>
                        <p className="text-white/80 text-sm font-medium mb-6 max-w-sm">Contact our premium support team for any queries regarding your bookings or wallet.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">Support Center</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
