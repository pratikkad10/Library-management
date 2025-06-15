import React, { useState, useEffect } from 'react'
import { FaBook, FaUsers, FaUserGraduate, FaUserTie, FaCheck, FaTimes } from 'react-icons/fa'
import BookCard from './BookCard'
import Button from './Button'
import Input from './Input'
import Users from './Users'

const Dashboard = () => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isAddingBook, setIsAddingBook] = useState(false)
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        publishedYear: '',
        imageUrl: '',
        availableCopies: 0
    })

    const [stats, setStats] = useState({
        totalBooks: 0,
        issuedBooks: 0,
        availableBooks: 0,
        totalUsers: 0,
        students: 0,
        staff: 0
    })

    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        // TODO: Fetch actual data from API
        setBooks([
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                publishedYear: '1925',
                imageUrl: 'https://via.placeholder.com/300x400',
                availableCopies: 5
            },
            {
                id: 2,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                publishedYear: '1960',
                imageUrl: 'https://via.placeholder.com/300x400',
                availableCopies: 3
            }
        ])

        setStats({
            totalBooks: 1500,
            issuedBooks: 320,
            availableBooks: 1180,
            totalUsers: 450,
            students: 380,
            staff: 70
        })

        setPendingRequests([
            { id: 1, user: 'John Doe', book: 'The Great Gatsby', type: 'borrow', date: '2024-03-20' },
            { id: 2, user: 'Jane Smith', book: 'To Kill a Mockingbird', type: 'return', date: '2024-03-21' },
        ])
    }, [])

    const handleAddBook = (e) => {
        e.preventDefault()
        const book = {
            id: Date.now(),
            ...newBook,
            availableCopies: parseInt(newBook.availableCopies) || 0
        }
        setBooks([...books, book])
        setNewBook({
            title: '',
            author: '',
            publishedYear: '',
            imageUrl: '',
            availableCopies: 0
        })
        setIsAddingBook(false)
    }

    const handleEditBook = (book) => {
        // Implement edit functionality
        console.log('Edit book:', book)
    }

    const handleDeleteBook = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId))
    }

    const handleUpdateCopies = (bookId, newCopies) => {
        setBooks(books.map(book =>
            book.id === bookId
                ? { ...book, availableCopies: newCopies }
                : book
        ))
    }

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRequest = (id, action) => {
        // TODO: Implement API call to handle request
        setPendingRequests(prev => prev.filter(request => request.id !== id))
    }

    return (
        <div className="container mx-auto px-4 py-8 dark:bg-custom-dark-2">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-custom-dark-0 dark:text-zinc-100">Book Management</h1>
                <Button
                    variant="primary"
                    onClick={() => setIsAddingBook(true)}
                >
                    Add New Book
                </Button>
            </div>

            <div className="mb-6 text-custom-dark-0 dark:text-zinc-100">
                <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md"
                />
            </div>

            {isAddingBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Book</h2>
                        <form onSubmit={handleAddBook} className="space-y-4">
                            <Input
                                label="Title"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                required
                            />
                            <Input
                                label="Author"
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                required
                            />
                            <Input
                                label="Published Year"
                                type="number"
                                value={newBook.publishedYear}
                                onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
                                required
                            />
                            <Input
                                label="Image URL"
                                value={newBook.imageUrl}
                                onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
                            />
                            <Input
                                label="Available Copies"
                                type="number"
                                min="0"
                                value={newBook.availableCopies}
                                onChange={(e) => setNewBook({ ...newBook, availableCopies: e.target.value })}
                                required
                            />
                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsAddingBook(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Add Book
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-4">
                {filteredBooks.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onEdit={handleEditBook}
                        onDelete={handleDeleteBook}
                        onUpdateCopies={handleUpdateCopies}
                    />
                ))}
            </div>

            <div className="mt-8">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaBook className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Total Books</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.totalBooks}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-custom-dark-4   p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaBook className="text-green-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Available Books</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.availableBooks}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaBook className="text-red-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Issued Books</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.issuedBooks}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaUsers className="text-purple-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Total Users</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaUserGraduate className="text-yellow-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Students</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.students}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaUserTie className="text-indigo-500 text-3xl mr-4" />
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400">Staff</h3>
                                <p className="text-2xl font-bold dark:text-white">{stats.staff}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Section */}
                <Users />
                {/* Pending Requests */}
                <div className="bg-white dark:bg-custom-dark-4 rounded-lg shadow-md p-6 m-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Pending Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b dark:border-gray-700">
                                    <th className="text-left py-3 px-4 dark:text-gray-300">User</th>
                                    <th className="text-left py-3 px-4 dark:text-gray-300">Book</th>
                                    <th className="text-left py-3 px-4 dark:text-gray-300">Type</th>
                                    <th className="text-left py-3 px-4 dark:text-gray-300">Date</th>
                                    <th className="text-left py-3 px-4 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map(request => (
                                    <tr key={request.id} className="border-b dark:border-gray-700">
                                        <td className="py-3 px-4 dark:text-gray-300">{request.user}</td>
                                        <td className="py-3 px-4 dark:text-gray-300">{request.book}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-sm ${request.type === 'borrow' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {request.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 dark:text-gray-300">{request.date}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleRequest(request.id, 'approve')}
                                                    className="p-1 cursor-pointer text-green-500 hover:text-green-700"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => handleRequest(request.id, 'reject')}
                                                    className="p-1 cursor-pointer text-red-500 hover:text-red-700"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
