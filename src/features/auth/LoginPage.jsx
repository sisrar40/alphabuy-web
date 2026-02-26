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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-blue-500/5 border border-gray-100 p-10 space-y-10 relative overflow-hidden">
        {/* Subtle Decorative Element */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50"></div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <FaLock className="text-3xl" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Admin Console</h2>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Secure Enterprise Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input 
              label="Authorized Email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@alphabuy.com"
              icon={FaEnvelope}
              required
            />
            <Input 
              label="Access Password" 
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={FaLock}
              required
            />
          </div>

          <Button type="submit" loading={loading} className="w-full py-4 text-base shadow-lg shadow-blue-500/25">
            Authenticate Session
          </Button>
        </form>

        <div className="text-center relative z-10">
          <p className="text-gray-400 text-xs font-medium">
            Protected by enterprise encryption & Multi-factor authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
