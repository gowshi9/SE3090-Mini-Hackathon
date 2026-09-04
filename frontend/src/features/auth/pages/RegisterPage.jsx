import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building, Phone, MapPin, ArrowRight, Leaf, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { GoogleAuthModal } from '../components/GoogleAuthModal';

const SRI_LANKA_DISTRICTS = [
  'Colombo (Western Province)',
  'Gampaha (Western Province)',
  'Kalutara (Western Province)',
  'Kandy (Central Province)',
  'Matale (Central Province)',
  'Nuwara Eliya (Central Province)',
  'Galle (Southern Province)',
  'Matara (Southern Province)',
  'Hambantota (Southern Province)',
  'Jaffna (Northern Province)',
  'Kurunegala (North Western)',
  'Anuradhapura (North Central)',
  'Badulla (Uva Province)',
  'Ratnapura (Sabaragamuwa)',
];

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, isLoading } = useAuth();

  const [role, setRole] = useState('NGO_RECIPIENT');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Colombo (Western Province)');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFeedbackMessage('Passwords do not match. Please check.');
      return;
    }
    if (!agreeTerms) {
      setFeedbackMessage('Please agree to the Food Safety Protocol to continue.');
      return;
    }

    try {
      await register({
        name,
        organizationName,
        email,
        phone,
        district,
        role,
        roleLabel: role === 'DONOR' ? 'Food Provider / Donor' : role === 'NGO_RECIPIENT' ? 'NGO / Recipient Org' : 'Volunteer Driver',
      });
      setFeedbackMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      setFeedbackMessage('Registration failed. Please try again.');
    }
  };

  const handleGoogleSelect = async (account) => {
    try {
      setIsGoogleModalOpen(false);
      await loginWithGoogle(account);
      setFeedbackMessage(`Signed up with Google as ${account.name}! Redirecting...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setFeedbackMessage('Google registration failed.');
    }
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

      {/* Main Register Card */}
      <div className="w-full max-w-[540px] my-6">
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
              Create an Account
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-sm leading-relaxed">
              Register your organization, food business, or volunteer profile to reduce food waste in Sri Lanka.
            </p>
          </div>

          {/* Feedback Toast */}
          {feedbackMessage && (
            <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-center flex items-center justify-center gap-1.5 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Google Quick Sign-Up */}
          <div className="mt-6">
            <GoogleAuthButton
              onClick={() => setIsGoogleModalOpen(true)}
              text="Sign up with Google"
              isLoading={isLoading}
            />

            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider">
                OR REGISTER WITH EMAIL
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Account Type Selection */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1.5">
                Select Your Role / Purpose
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'DONOR', label: 'Food Donor', desc: 'Restaurants & Supermarkets' },
                  { id: 'NGO_RECIPIENT', label: 'Recipient Org', desc: 'NGOs & Community' },
                  { id: 'VOLUNTEER', label: 'Volunteer', desc: 'Logistics & Transport' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === item.id
                        ? 'border-[#056526] bg-emerald-50/70 text-[#056526] ring-1 ring-[#056526]'
                        : 'border-slate-200 hover:border-slate-300 bg-[#f0f4f9]/50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Full Name / Contact Person
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kavindi Perera"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Organization / Entity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. Colombo Care Foundation"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-900">
                  Email Address
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  Verified Org ID
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@organization.lk"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Phone & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Location / District
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  >
                    {SRI_LANKA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-900">
                    Password
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    Protected Key
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-9 pr-9 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Protocol Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#056526] bg-slate-100 border-slate-300 rounded-sm focus:ring-[#056526] focus:ring-2 cursor-pointer accent-[#056526]"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to the <strong className="text-slate-900">Food Safety & Hygiene Protocol</strong> and certify that shared food complies with Sri Lanka Food Act standards.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#056526] hover:bg-[#04521e] active:scale-[0.99] text-white font-bold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-xs sm:text-sm font-medium text-slate-600 pt-2">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Log In
              </Link>
            </div>

            {/* Carbon Metric */}
            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-600 flex items-center justify-center gap-1.5 font-medium">
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
