import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from './authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: 'admin@alphabuy.com',
    password: 'admin123',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-aqua-100/30 rounded-full blur-[120px] -ml-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-64 -mb-64 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full glass-effect !bg-white/70 border-white/40 rounded-[48px] shadow-2xl p-12 space-y-12 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-premium-gradient text-white shadow-2xl shadow-aqua-500/30 mb-8 border border-white/20 transform rotate-3 hover:rotate-0 transition-all duration-700">
            <FaLock className="text-4xl" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight font-display">System Access</h2>
          <p className="text-gray-500 mt-3 font-bold uppercase tracking-widest text-[9px]">Secure Enterprise Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Credential identity</span>
              <Input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@alphabuy.com"
                icon={FaEnvelope}
                className="!py-5 !px-6 !rounded-[24px] !bg-white/50 border-gray-100 focus:border-aqua-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Access Cipher</span>
              <Input 
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={FaLock}
                className="!py-5 !px-6 !rounded-[24px] !bg-white/50 border-gray-100 focus:border-aqua-500 transition-all font-medium"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-6 rounded-[28px] font-bold text-[10px] uppercase tracking-widest transition-all duration-500 shadow-xl ${
              loading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-premium-gradient text-white shadow-aqua-500/30 hover:shadow-aqua-500/50 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {loading ? 'Authenticating...' : 'Authorize Session'}
          </button>
        </form>

        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
             <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">AES-256 Bit Encryption</p>
          </div>
          <p className="text-gray-500 text-[10px] font-bold">
            Protected by multi-factor authentication protocol
          </p>
        </div>
      </div>
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-10 right-10 flex gap-2">
         <div className="w-2 h-2 rounded-full bg-aqua-200"></div>
         <div className="w-2 h-2 rounded-full bg-blue-200"></div>
         <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
      </div>
    </div>
  );
};

export default LoginPage;
