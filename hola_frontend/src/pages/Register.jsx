import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(formData);
      toast.success('Registration successful! Please verify your email.');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
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
              Hola
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              Sign up to see photos and videos from your friends.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-instagram-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
        </div>

        {/* Login Link */}
        <div className="bg-white p-4 border border-gray-300 rounded-sm text-center">
          <p className="text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-instagram-blue font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
