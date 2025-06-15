import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import Input from './Input';
import { FaSearch } from 'react-icons/fa';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
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
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (bookId) => {
    // TODO: Implement edit functionality
    console.log('Edit book:', bookId);
  };

  const handleDelete = (bookId) => {
    // TODO: Implement delete functionality
    console.log('Delete book:', bookId);
  };

  const handleUpdateCopies = (bookId, newCopies) => {
    // TODO: Implement update copies functionality
    console.log('Update copies for book:', bookId, 'New copies:', newCopies);
  };

  return (
    <div className="p-6 bg-zinc-100 dark:bg-custom-dark-3 min-h-screen">
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

      {/* Books Grid */}
      <div className="flex flex-wrap gap-4">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => handleEdit(book.id)}
            onDelete={() => handleDelete(book.id)}
            onUpdateCopies={() => handleUpdateCopies(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
