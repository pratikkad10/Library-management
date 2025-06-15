import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';
import Input from './Input';
import Button from './Button';

const Users = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState({
    students: [],
    staff: []
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setUsers({
      students: [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Computer Science' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Mathematics' }
      ],
      staff: [
        { id: 1, name: 'Dr. Robert Brown', email: 'robert@example.com', department: 'Physics' },
        { id: 2, name: 'Prof. Sarah Wilson', email: 'sarah@example.com', department: 'Chemistry' }
      ]
    });
  }, []);

  const filteredUsers = users[activeTab].filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-custom-dark-0 dark:text-zinc-100">Users Management</h1>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 text-custom-dark-0 dark:text-zinc-100"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'students' ? 'primary' : 'secondary'}
          className={`flex items-center gap-2 ${
            activeTab === 'students' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-custom-dark-5 dark:text-zinc-100'
          }`}
          onClick={() => setActiveTab('students')}
        >
          <FaUserGraduate />
          Students
        </Button>
        <Button
          variant={activeTab === 'staff' ? 'primary' : 'secondary'}
          className={`flex items-center gap-2 ${
            activeTab === 'staff' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-custom-dark-5 dark:text-zinc-100'
          }`}
          onClick={() => setActiveTab('staff')}
        >
          <FaUserTie />
          Staff
        </Button>
      </div>

      <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-custom-dark-5">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-100 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-100 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-custom-dark-6">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-custom-dark-5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-zinc-100">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-100">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-100">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        className="text-sm bg-blue-500 text-zinc-100 hover:bg-blue-600"
                        onClick={() => {/* TODO: Implement edit */}}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="text-sm bg-red-600 text-custom-dark-6 dark:text-white hover:bg-red-700"
                        onClick={() => {/* TODO: Implement delete */}}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
