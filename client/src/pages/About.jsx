import React from 'react';
import { FaBook, FaExchangeAlt, FaHistory, FaInfoCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen p-6 bg-zinc-100 dark:bg-custom-dark-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-dark-0 mb-8 dark:text-zinc-100">
          About Our Library Management System
        </h1>

        {/* Overview Section */}
        <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-blue-600 text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-custom-dark-0 dark:text-zinc-100">System Overview</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Our Library Management System provides a comprehensive solution for managing library resources,
            book circulation, and user interactions. The system is designed to streamline the process of
            borrowing and returning books while maintaining accurate records of all transactions.
          </p>
        </div>

        {/* Book Circulation Section */}
        <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaExchangeAlt className="text-green-600 text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-custom-dark-0 dark:text-zinc-100">Book Circulation Process</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
                <FaBook className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-custom-dark-0 dark:text-zinc-100">Borrowing Books</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Users can request to borrow books through their dashboard. The system automatically
                  checks book availability and user eligibility before approving the request.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-4">
                <FaHistory className="text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-medium text-custom-dark-0 dark:text-zinc-100">Returning Books</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Books can be returned through the system, which automatically updates inventory
                  and calculates any applicable fines for late returns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-custom-dark-0 mb-4 dark:text-zinc-100">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Real-time book availability tracking
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Automated fine calculation for late returns
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              User-friendly interface for both staff and patrons
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Comprehensive reporting and analytics
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Dark mode support for comfortable viewing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
