import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { FaInstagram } from 'react-icons/fa';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate('/register');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOTP(email, otp);
      toast.success('Email verified successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      await authService.resendOTP(email);
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 border border-gray-300 rounded-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <FaInstagram className="mx-auto text-5xl mb-4" />
            <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'cursive' }}>
              Verify Your Email
            </h1>
            <p className="text-gray-500 text-sm">
              We've sent a 6-digit OTP to <strong>{email}</strong>
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              pattern="\d{6}"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm text-center text-2xl tracking-widest focus:outline-none focus:border-gray-400 bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-instagram-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center mt-4">
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="text-instagram-blue font-semibold text-sm hover:underline disabled:opacity-50"
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
