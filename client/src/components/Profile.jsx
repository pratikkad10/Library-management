import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    joinDate: 'January 2024'
  });

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-custom-dark-3 p-8">
      <div className="bg-zinc-100  dark:bg-custom-dark-4 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-custom-dark-1 p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full">
              <FaUser className="w-16 h-16 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Contact Information</h2>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-700 dark:text-gray-200">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-gray-700 dark:text-gray-200">{user.phone}</p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Account Settings</h2>
              
              <div className="flex items-center space-x-3">
                <FaLock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
                  <button 
                    className="text-blue-500 hover:text-blue-600 font-medium"
                    onClick={() => {/* Add password change logic */}}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-200">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
