import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/api";
import { FaWallet, FaUser, FaPlus, FaMinus, FaHistory, FaSearch, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useAlert } from "../../context/AlertContext";
import Table from "../../components/ui/Table";

const AdminWalletManager = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { token } = useSelector((state) => state.auth);
    const { showAlert } = useAlert();

    const fetchWallets = async () => {
        try {
            const response = await api.get("/admin/wallets");
            setWallets(response.data || []);
        } catch (error) {
            console.error("Failed to fetch wallets:", error);
            showAlert("Failed to fetch wallets", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchWallets();
    }, [token]);

    const [historyWallet, setHistoryWallet] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const fetchHistory = async (walletId) => {
        setHistoryLoading(true);
        try {
            const response = await api.get(`/admin/wallets/${walletId}/transactions`);
            setHistory(response.data || []);
        } catch (error) {
            console.error("Failed to fetch history:", error);
            showAlert("Failed to fetch transaction history", "error");
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleUpdateBalance = async (walletId, amount, type) => {
        try {
            await api.post(`/admin/wallets/${walletId}/funds`, {
                amount,
                type: type === 'add' ? 'credit' : 'debit'
            });
            showAlert(`Successfully ${type === 'add' ? 'added' : 'deducted'} ₹${amount.toFixed(2)}`, "success");
            fetchWallets();
            if (historyWallet && historyWallet.id === walletId) fetchHistory(walletId);
        } catch (error) {
            console.error(`Failed to ${type} funds:`, error);
            showAlert(`Failed to ${type === 'add' ? 'add' : 'deduct'} funds`, "error");
        }
    };

    const filteredWallets = wallets.filter(w =>
        String(w.user_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(w.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            header: "User",
            accessor: "user_name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-sm font-bold">
                        {row.user_name ? row.user_name.charAt(0).toUpperCase() : <FaUser />}
                    </div>
                    <div>
                        <p className="font-black text-gray-900 leading-none">{row.user_name || "Unknown User"}</p>
                        <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">ID: {row.user_id}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Balance",
            accessor: "balance",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-black text-gray-900 text-lg">₹{parseFloat(row.balance).toFixed(2)}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Available Credit</span>
                </div>
            )
        },
        {
            header: "Actions",
            className: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-2 text-xs">
                    <button
                        onClick={() => {
                            setHistoryWallet(row);
                            fetchHistory(row.id);
                        }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1"
                    >
                        <FaHistory /> History
                    </button>
                    <button
                        onClick={() => {
                            const amt = prompt("Enter amount to add:");
                            if (amt) handleUpdateBalance(row.id, parseFloat(amt), 'add');
                        }}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-bold hover:bg-green-600 hover:text-white transition-all flex items-center gap-1"
                    >
                        <FaPlus /> Add
                    </button>
                    <button
                        onClick={() => {
                            const amt = prompt("Enter amount to deduct:");
                            if (amt) handleUpdateBalance(row.id, parseFloat(amt), 'deduct');
                        }}
                        className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-1"
                    >
                        <FaMinus /> Deduct
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Wallet Management</h1>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Monitor and manage all user balances</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name or User ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 text-sm font-bold"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <Table
                    columns={columns}
                    data={filteredWallets}
                    loading={loading}
                    emptyMessage="No wallets found"
                    pagination={{
                        total: filteredWallets.length,
                        current: 1,
                        pageSize: 10
                    }}
                />
            </div>

            {/* History Modal */}
            {historyWallet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Transaction History</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">User: {historyWallet.user_id}</p>
                            </div>
                            <button
                                onClick={() => setHistoryWallet(null)}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                                <FaPlus className="rotate-45" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            {historyLoading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FaSpinner className="text-3xl text-blue-600 animate-spin" />
                                    <p className="mt-4 text-sm font-bold text-gray-500">Loading history...</p>
                                </div>
                            ) : history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                    <FaHistory className="text-4xl mb-4" />
                                    <p className="text-sm font-bold">No transactions found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((tx) => (
                                        <div key={tx.id} className="p-4 rounded-2xl border border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {tx.type === 'credit' ? <FaPlus /> : <FaMinus />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900">{tx.description}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {new Date(tx.created_at).toLocaleString()} • Ref: {tx.reference_id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-black ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminWalletManager;
