import { useState } from 'react';
import Button from './Button';
import Input from './Input';

const BookCopies = ({ book, onUpdateCopies }) => {
    const [copies, setCopies] = useState(book.availableCopies || 0);
    const [isEditing, setIsEditing] = useState(false);
    const [newCopies, setNewCopies] = useState(copies);

    const handleAddCopy = () => {
        const updatedCopies = copies + 1;
        setCopies(updatedCopies);
        onUpdateCopies(book.id, updatedCopies);
    };

    const handleRemoveCopy = () => {
        if (copies > 0) {
            const updatedCopies = copies - 1;
            setCopies(updatedCopies);
            onUpdateCopies(book.id, updatedCopies);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (newCopies >= 0) {
            setCopies(newCopies);
            onUpdateCopies(book.id, newCopies);
            setIsEditing(false);
        }
    };

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Available Copies</h4>
                <Button
                    variant="text"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="mt-2">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            min="0"
                            value={newCopies}
                            onChange={(e) => setNewCopies(parseInt(e.target.value) || 0)}
                            className="w-24"
                        />
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{copies}</span>
                    <div className="flex gap-1">
                        <Button
                            variant="secondary"
                            onClick={handleAddCopy}
                            className="px-2 py-1"
                        >
                            +
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleRemoveCopy}
                            disabled={copies === 0}
                            className="px-2 py-1"
                        >
                            -
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCopies; 