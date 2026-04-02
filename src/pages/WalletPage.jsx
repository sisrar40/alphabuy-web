import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchWallet,
    fetchTransactions,
    addFundsToWallet,
} from "../features/wallet/walletSlice";
import { useRazorpay } from "react-razorpay";
import { useAlert } from "../context/AlertContext";
import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaPlus,
    FaHistory,
    FaRupeeSign,
    FaSpinner,
} from "react-icons/fa";

const topUpAmounts = [100, 250, 500, 1000, 2000, 5000];

const WalletPage = () => {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const { Razorpay } = useRazorpay();

    const { token } = useSelector((state) => state.auth);
    const { wallet, transactions, loading } = useSelector((state) => state.wallet);

    const [customAmount, setCustomAmount] = useState("");
    const [addingFunds, setAddingFunds] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(fetchWallet(token));
            dispatch(fetchTransactions(token));
        }
    }, [dispatch, token]);

    const handleTopUp = (amount) => {
        const finalAmount = amount || parseFloat(customAmount);
        if (!finalAmount || finalAmount <= 0) {
            showAlert("Please enter a valid amount", "error");
            return;
        }

        const options = {
            key: "rzp_test_SLwkA3iHaRKsMN",
            amount: Math.round(finalAmount * 100),
            currency: "INR",
            name: "AquaZen Wallet",
            description: "Wallet Top-up",
            handler: async (response) => {
                setAddingFunds(true);
                try {
                    await dispatch(addFundsToWallet({
                        token,
                        amount: finalAmount,
                        referenceId: response.razorpay_payment_id,
                        description: "Wallet top-up via Razorpay",
                    })).unwrap();
                    dispatch(fetchTransactions(token));
                    showAlert(`₹${finalAmount.toFixed(2)} added to your wallet!`, "success");
                } catch (err) {
                    showAlert(err || "Failed to add funds", "error");
                } finally {
                    setAddingFunds(false);
                    setCustomAmount("");
                }
            },
            prefill: { name: "", email: "", contact: "" },
            theme: { color: "#2563eb" },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    };

    const balance = wallet?.balance ?? 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Balance Card */}
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/5 rounded-full" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">Wallet Balance</p>
                            <div className="flex items-baseline gap-1">
                                <FaRupeeSign className="text-2xl" />
                                <span className="text-5xl font-black">{balance.toFixed(2)}</span>
                            </div>
                            <p className="text-white/60 text-xs mt-2">Use your balance to pay at checkout</p>
                        </div>
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaWallet className="text-4xl text-white" />
                        </div>
                    </div>
                </div>

                {/* Top-up Section */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FaPlus className="text-blue-600" /> Add Money
                    </h2>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {topUpAmounts.map((amt) => (
                            <button
                                key={amt}
                                onClick={() => handleTopUp(amt)}
                                className="py-3 rounded-2xl border-2 border-blue-100 bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                            >
                                ₹{amt}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            min="1"
                            placeholder="Custom amount (₹)"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        <button
                            onClick={() => handleTopUp(null)}
                            disabled={addingFunds || !customAmount}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            {addingFunds ? <FaSpinner className="animate-spin" /> : <FaArrowUp />}
                            Add
                        </button>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FaHistory className="text-blue-600" /> Transaction History
                    </h2>
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <FaHistory className="text-4xl mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No transactions yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                            {tx.type === "credit" ? <FaArrowDown /> : <FaArrowUp />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{tx.description || tx.type}</p>
                                            <p className="text-xs text-gray-400">
                                                {tx.reference_id && <span className="mr-1">Ref: {tx.reference_id}</span>}
                                                {new Date(tx.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-black ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                                        {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
