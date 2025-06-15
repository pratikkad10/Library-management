import BookCopies from './BookCopies';
import Button from './Button';

const BookCard = ({ book, onEdit, onDelete, onUpdateCopies }) => {
  return (
    <div className="bg-white h-52 w-120 dark:bg-custom-dark-4  shadow-md overflow-hidden flex  rounded-lg relative">
      <div className="relative w-48 flex-shrink-0">
        <img
          src={book.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Mormon-book.jpg'}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Mormon-book.jpg';
          }}
        />
      </div>

      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-custom-dark-0 dark:text-zinc-100 mb-1">
          {book.title}
        </h3>
        <p className="text-gray-600 dark:text-zinc-100 mb-1">
          By {book.author}
        </p>
        <p className="text-sm text-gray-500 dark:text-zinc-100 mb-2">
          Published: {book.publishedYear}
        </p>

        <div className="flex gap-1 absolute bottom-2">

          <Button
            variant="primary"
            className='dark:bg-custom-dark-5 text-sm  dark:hover:bg-custom-dark-6 text-custom-dark-6 bg-zinc-100 dark:text-zinc-100 '
            onClick={() => { }}
          >
            Submit
          </Button>
          <Button
            className='dark:bg-custom-dark-5 text-sm  dark:hover:bg-custom-dark-6 text-custom-dark-6 bg-zinc-100 dark:text-zinc-100 '

            variant="primary"
            onClick={() => { }}
          >
            Renew
          </Button>
          <Button
            variant="primary"
            className='dark:bg-custom-dark-5 text-sm  dark:hover:bg-custom-dark-6 text-custom-dark-6 bg-zinc-100 dark:text-zinc-100 '

            onClick={() => { }}
          >
            pdf
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
