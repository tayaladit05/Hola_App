import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 border border-gray-300 rounded-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <FaInstagram className="mx-auto text-5xl mb-4" />
            <h1 className="text-3xl font-semibold" style={{ fontFamily: 'cursive' }}>
              Hola
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <GoogleOAuthProvider clientId="407408718192.apps.googleusercontent.com">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google login failed')}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>
          </GoogleOAuthProvider>
        </div>

        {/* Sign Up Link */}
        <div className="bg-white p-4 border border-gray-300 rounded-sm text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-instagram-blue font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
