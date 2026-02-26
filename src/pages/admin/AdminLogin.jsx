import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { attemptAdminLogin } from "../../api/adminAuthApi";
import { loginSuccess } from "../../store/adminAuthSlice";
import { FaLock, FaEnvelope, FaSpinner } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@alphabuy.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await attemptAdminLogin(email, password);
      dispatch(loginSuccess({ token: response.token }));
      // Navigation is handled by useEffect on isAuthenticated change
    } catch (err) {
      setError(err.message || "Failed to authenticate");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <FaLock className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Access</h2>
          <p className="text-gray-500 mt-2 font-medium">Please sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                  placeholder="admin@alphabuy.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin text-xl" /> : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500 font-medium">Use <span className="text-gray-900 font-bold">admin@alphabuy.com</span> / <span className="text-gray-900 font-bold">admin123</span> for demo</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
