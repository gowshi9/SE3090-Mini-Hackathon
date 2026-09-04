import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Info, ArrowRight, Shield, Leaf, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { GoogleAuthModal } from '../components/GoogleAuthModal';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading, demoUser } = useAuth();

  const [email, setEmail] = useState('kavindi.p@univ.ac.lk');
  const [password, setPassword] = useState('••••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, rememberMe);
      setFeedbackMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setFeedbackMessage('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSelect = async (account) => {
    try {
      setIsGoogleModalOpen(false);
      await loginWithGoogle(account);
      setFeedbackMessage(`Signed in as ${account.name}! Redirecting...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setFeedbackMessage('Google sign-in failed.');
    }
  };

  const handleAutofillDemo = () => {
    setEmail(demoUser.email);
    setPassword('DemoFoodPass@2026');
    setFeedbackMessage('Demo credentials filled! Click Log In.');
  };

  const handleAdminPortal = () => {
    setEmail('admin.foodsafety@gov.lk');
    setPassword('AdminSecure#LK2026');
    setFeedbackMessage('Admin credentials loaded. Click Log In.');
  };

  return (
    <div className="min-h-screen auth-bg-gradient flex flex-col justify-between items-center px-4 py-8 sm:px-6 relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Status Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between py-2 text-xs">
        <div className="inline-flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 text-slate-700 font-medium transition-all shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
          <span className="font-semibold tracking-wide">NATIONAL GRID ACTIVE • LK-WEST</span>
        </div>
        <div className="text-slate-500 font-semibold tracking-wider text-[11px] uppercase">
          V2.4 HACKATHON BUILD
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[480px] my-6">
        <div className="bg-white rounded-3xl p-6 sm:p-9 auth-card-shadow border border-slate-100/90 relative">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-14 h-14 bg-emerald-50/80 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
              Welcome Back
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-xs leading-relaxed">
              Sign in to access your listings, manage reservations, and help reduce food waste.
            </p>
          </div>

          {/* Feedback Toast */}
          {feedbackMessage && (
            <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-center flex items-center justify-center gap-1.5 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  Email Address
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  Verified Org ID
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@organization.lk"
                  className="w-full pl-10 pr-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  Password
                </label>
                <span className="text-[11px] font-semibold text-emerald-700">
                  Protected Key
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Demo Credential Hint */}
            <div
              onClick={handleAutofillDemo}
              className="bg-[#f0f3fe] hover:bg-[#e4ecfe] border border-[#d9e2fc] rounded-xl p-3 flex items-start gap-2.5 transition-colors cursor-pointer group"
              title="Click to auto-fill demo credentials"
            >
              <Info className="w-4 h-4 text-[#9a5b13] flex-shrink-0 mt-0.5" />
              <div className="text-[12px] leading-snug">
                <span className="font-bold text-[#9a5b13] block">DEMO CREDENTIAL HINT</span>
                <span className="text-slate-700">
                  Use any registered email to test. Preloaded with Western Province NGO credentials.
                </span>
                <span className="text-emerald-700 font-semibold block mt-1 text-[11px] group-hover:underline">
                  ✨ Click here to auto-fill demo credentials
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#056526] bg-slate-100 border-slate-300 rounded-sm focus:ring-[#056526] focus:ring-2 cursor-pointer accent-[#056526]"
                />
                <span className="text-xs font-semibold text-slate-800">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to your registered email.')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#056526] hover:bg-[#04521e] active:scale-[0.99] text-white font-bold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Google Login Button */}
            <GoogleAuthButton
              onClick={() => setIsGoogleModalOpen(true)}
              text="Sign in with Google"
              isLoading={isLoading}
            />

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider">
                OR
              </span>
            </div>

            {/* Register Link */}
            <div className="text-center text-xs sm:text-sm font-medium text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Register
              </Link>
            </div>

            {/* Admin Portal Button */}
            <button
              type="button"
              onClick={handleAdminPortal}
              className="w-full py-2.5 px-3 bg-[#eef2ff] hover:bg-[#e0e7ff] text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-[#dbe4fe] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              <span>
                Are you an Administrator? <strong className="text-slate-900 font-bold">Admin Portal Login</strong>
              </span>
            </button>

            {/* Carbon Metric */}
            <div className="pt-2 text-center">
              <p className="text-[11px] sm:text-xs text-slate-600 flex items-center justify-center gap-1.5 font-medium">
                <span className="text-emerald-600 font-bold">🌱</span>
                <span>1,840 kg CO₂e avoided across Sri Lanka this week</span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 py-3 border-t border-slate-200/60 font-medium">
        <div>
          <span>FoodRescue LK • Civic Hackathon</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <a href="#privacy" className="hover:text-emerald-700 transition-colors">Privacy</a>
          <span>•</span>
          <a href="#food-safety" className="hover:text-emerald-700 transition-colors">Food Safety Protocol</a>
          <span>•</span>
          <a href="tel:1919" className="hover:text-emerald-700 transition-colors font-semibold">Support (1919)</a>
        </div>
      </footer>

      {/* Google Sign In Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectGoogleAccount={handleGoogleSelect}
      />
    </div>
  );
}
