import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { FaUser, FaEnvelope, FaShieldAlt, FaCalendarAlt, FaSearch, FaSpinner } from "react-icons/fa";
import { useAlert } from "../../context/AlertContext";
import Table from "../../components/ui/Table";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { token } = useSelector((state) => state.auth);
    const { showAlert } = useAlert();

    const fetchUsers = async () => {
        try {
            const response = await api.get("/admin/users");
            setUsers(response.data || []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            showAlert("Failed to fetch users", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
    }, [token]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            header: "User",
            accessor: "name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-sm">
                        <FaUser />
                    </div>
                    <div>
                        <p className="font-black text-gray-900 leading-none">{row.name}</p>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">ID: {row.id.substring(0, 8)}...</p>
                    </div>
                </div>
            )
        },
        {
            header: "Email",
            accessor: "email",
            render: (row) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-xs opacity-40" />
                    <span className="font-medium">{row.email}</span>
                </div>
            )
        },
        {
            header: "Role",
            accessor: "role",
            render: (row) => (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    <FaShieldAlt className="text-[10px]" />
                    {row.role}
                </div>
            )
        },
        {
            header: "Joined On",
            accessor: "created_at",
            render: (row) => (
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                    <FaCalendarAlt className="opacity-40" />
                    {new Date(row.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">View and manage all registered users</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 text-sm font-bold"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FaSpinner className="text-3xl text-blue-600 animate-spin" />
                        <p className="mt-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Loading users...</p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredUsers}
                        emptyMessage="No users found matching your search"
                        pagination={{
                            total: filteredUsers.length,
                            current: 1,
                            pageSize: 10
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default UserList;
