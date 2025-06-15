import React, { useState, useEffect } from 'react';
import { FaBook, FaHistory, FaBookmark, FaSearch, FaMoneyBillWave } from 'react-icons/fa';
import BookCard from './BookCard';
import Input from './Input';
import Button from './Button';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('available');
  const [userStats, setUserStats] = useState({
    booksBorrowed: 0,
    booksReturned: 0,
    currentBorrows: 0,
    pendingFines: 0
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setBooks([
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedYear: '1925',
        imageUrl: '',
        availableCopies: 5
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publishedYear: '1960',
        imageUrl: '',
        availableCopies: 3
      }
    ]);

    setUserStats({
      booksBorrowed: 12,
      booksReturned: 10,
      currentBorrows: 2,
      pendingFines: 25.50
    });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-zinc-100 dark:bg-custom-dark-3">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-dark-0 mb-6 dark:text-zinc-100">My Library Dashboard</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 dark:text-zinc-100"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaBook className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4 text-gray-500 dark:text-zinc-100">
                <p className="">Current Borrows</p>
                <p className="text-2xl font-semibold">{userStats.currentBorrows}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FaHistory className="text-green-600 text-xl" />
              </div>
              <div className="ml-4 text-gray-500 dark:text-zinc-100">
                <p className="">Books Returned</p>
                <p className="text-2xl font-semibold">{userStats.booksReturned}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaBookmark className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4 text-gray-500 dark:text-zinc-100">
                <p className="">Total Borrowed</p>
                <p className="text-2xl font-semibold">{userStats.booksBorrowed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <FaMoneyBillWave className="text-red-600 text-xl" />
              </div>
              <div className="ml-4 text-gray-500 dark:text-zinc-100">
                <p className="">Pending Fines</p>
                <p className="text-2xl font-semibold">${userStats.pendingFines.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant='tertiary'
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Books
          </Button>
          <Button
            variant="tertiary"
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'borrowed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('borrowed')}
          >
            My Borrowed Books
          </Button>
          <Button
            variant="tertiary"
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'fines'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('fines')}
          >
            Fines & Payments
          </Button>
        </div>

        {/* Books Grid */}
        <div className="flex flex-wrap gap-4">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => {}}
              onDelete={() => {}}
              onUpdateCopies={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
