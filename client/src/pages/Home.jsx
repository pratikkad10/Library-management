import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-custom-dark-3">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 ">
          {/* Hero Section with Background Image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-12 ">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Library interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40  flex items-center justify-center">
              <div className="text-center text-white relative z-10">
                <h1 className="text-5xl font-bold max-w-3xl leading-tight mb-4">
                  Where books meet their readers, and stories find their voice
                </h1>
                <p className="text-xl max-w-2xl">
                  Discover a world of knowledge at your fingertips. Browse our extensive collection of books and start your reading journey today.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="primary" className="font-medium" onClick={() => navigate('/books')}>
              Explore Books
            </Button>
            <Button onClick={() => navigate('/about')} variant='primary' className="">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Easy Access" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-50 mb-2">Easy Access</h3>
              <p className="text-gray-600 dark:text-gray-300">Browse and borrow books with just a few clicks</p>
            </div>
            <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Vast Collection" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-50 mb-2">Vast Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">Access thousands of books across various genres</p>
            </div>
            <div className="bg-white dark:bg-custom-dark-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Smart Management" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-50 mb-2">Smart Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Track your borrowed books and manage returns easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home