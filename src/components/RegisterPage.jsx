import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, 
  FaGithub, FaLinkedin, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';

function RegisterPage({ onRegister, onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Clear specific error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const checkPasswordStrength = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Calculate score (0-4)
    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase && hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;
    
    setPasswordStrength({
      score,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar
    });
  };
  
  const getPasswordStrengthLabel = (score) => {
    if (score === 0) return { label: 'Very Weak', color: 'bg-red-500' };
    if (score === 1) return { label: 'Weak', color: 'bg-orange-500' };
    if (score === 2) return { label: 'Fair', color: 'bg-yellow-500' };
    if (score === 3) return { label: 'Good', color: 'bg-blue-500' };
    if (score === 4) return { label: 'Strong', color: 'bg-green-500' };
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Please create a stronger password';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API delay
      
      // Simulate successful registration
      onRegister({ 
        fullName: formData.fullName,
        email: formData.email
      });
      
      // Navigate to feed page or verification page
      onNavigate('verification');
    } catch (err) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialSignup = (provider) => {
    // In a real app, this would trigger OAuth flow
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Logo and header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 112 0v3a1 1 0 11-2 0v-3zm0-3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
            <p className="text-gray-500 mt-1">Join TaskHub and start collaborating</p>
          </div>
          
          {/* Error message */}
          {errors.submit && (
            <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}
          
          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      Password strength: {getPasswordStrengthLabel(passwordStrength.score).label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthLabel(passwordStrength.score).color} transition-all duration-300`} 
                      style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex items-center text-xs">
                      <span className={passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-400'}>
                        {passwordStrength.hasMinLength ? <FaCheckCircle className="mr-1" /> : '•'}
                      </span>
                      <span className={passwordStrength.hasMinLength ? 'text-green-700' : 'text-gray-600'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={passwordStrength.hasUppercase && passwordStrength.hasLowercase ? 'text-green-500' : 'text-gray-400'}>
                        {passwordStrength.hasUppercase && passwordStrength.hasLowercase ? <FaCheckCircle className="mr-1" /> : '•'}
                      </span>
                      <span className={passwordStrength.hasUppercase && passwordStrength.hasLowercase ? 'text-green-700' : 'text-gray-600'}>
                        Upper & lowercase
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-400'}>
                        {passwordStrength.hasNumber ? <FaCheckCircle className="mr-1" /> : '•'}
                      </span>
                      <span className={passwordStrength.hasNumber ? 'text-green-700' : 'text-gray-600'}>
                        At least 1 number
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}>
                        {passwordStrength.hasSpecialChar ? <FaCheckCircle className="mr-1" /> : '•'}
                      </span>
                      <span className={passwordStrength.hasSpecialChar ? 'text-green-700' : 'text-gray-600'}>
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            
            {/* Terms and conditions */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${errors.terms ? 'border-red-500' : ''}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition duration-150 flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
          
          {/* Social signup options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignup('Google')}
                className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup('GitHub')}
                className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <FaGithub className="text-gray-800" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup('LinkedIn')}
                className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <FaLinkedin className="text-blue-700" />
              </button>
            </div>
          </div>
          
          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                className="font-medium text-blue-600 hover:text-blue-800 transition"
                onClick={() => onNavigate('login')}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;