// src/SignUpForm.js
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (showPasswordValidation) {
      validatePassword(password);
    }
  }, [password, showPasswordValidation]);

  const validateForm = () => {
    let formErrors = {};

    if (!username) formErrors.username = "Username is required";

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/^[\w._%+-]+@gmail\.com$/i.test(email)) {
      formErrors.email = "Email must be a valid @gmail.com address";
    }

    if (!password) formErrors.password = "Password is required";
    if (passwordErrors.length > 0) formErrors.password = "Password does not meet the requirements";

    if (!confirmPassword) formErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validatePassword = (password) => {
    const passwordRequirements = [
      { regex: /[A-Z]/, message: 'at least one uppercase letter' },
      { regex: /[a-z]/, message: 'at least one lowercase letter' },
      { regex: /[0-9]/, message: 'at least one number' },
      { regex: /[^A-Za-z0-9]/, message: 'at least one special character' },
      { regex: /.{6,}/, message: 'at least 6 characters long' }
    ];

    const unmetRequirements = passwordRequirements.filter(req => !req.regex.test(password));
    setPasswordErrors(unmetRequirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSuccessMessage('');

      const formData = { username, email, password };
      console.log(JSON.stringify(formData, null, 2));

      // Simulate a form submission to a server
      try {
        // Replace the following line with your form submission logic (e.g., API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // On success
        setSuccessMessage('Registration successful!');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        setPasswordErrors([]);
        setShowPasswordValidation(false);
      } catch (error) {
        // Handle submission error
        setErrors({ submit: 'An error occurred during submission. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onFocus={() => setShowPasswordValidation(true)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
          {showPasswordValidation && passwordErrors.length > 0 && (
            <ul className="text-sm mt-1 list-disc list-inside">
              {[
                { regex: /[A-Z]/, message: 'at least one uppercase letter' },
                { regex: /[a-z]/, message: 'at least one lowercase letter' },
                { regex: /[0-9]/, message: 'at least one number' },
                { regex: /[^A-Za-z0-9]/, message: 'at least one special character' },
                { regex: /.{6,}/, message: 'at least 6 characters long' }
              ].map((requirement, index) => (
                <li
                  key={index}
                  className={`flex items-center ${
                    requirement.regex.test(password) ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {requirement.regex.test(password) && <FaCheckCircle className="mr-2" />}
                  {requirement.message}
                </li>
              ))}
            </ul>
          )}
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
        {errors.submit && <p className="text-red-500 text-sm mt-4">{errors.submit}</p>}
        <p className="mt-4 text-sm text-gray-600">
          Have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
