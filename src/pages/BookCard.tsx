import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
} from "@/api/baseapi";
import { Link } from "react-router-dom";
import type { IBook } from "@/types/book";
import { useState } from "react";

const BookCard = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const [actionId, setActionId] = useState<string | null>(null);

  const books = data?.data;

  if (isLoading) return <p className="text-center">Loading books...</p>;
  if (isError || !books) return <p className="text-red-500">Failed to load books</p>;

  const handleDelete = async (id: string) => {
    setActionId(id);
    try {
      await deleteBook(id).unwrap();
    } catch (error) {
      console.error("Failed to delete book:", error);
    } finally {
      setActionId(null);
    }
  };

  const handleBorrow = async (id: string) => {
    setActionId(id);
    try {
      await borrowBook(id).unwrap();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book: IBook) => (
        <div
          key={book._id}
          className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
          <p className="text-sm">Author: {book.author}</p>
          <p className="text-sm">Genre: {book.genre}</p>
          <p className="text-sm">ISBN: {book.isbn}</p>
          <p className="text-sm">Copies: {book.copies}</p>
          <p className="text-sm mb-2">
            Available: {book.available ? "✅" : "❌"}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Link
              to={`/edit-book/${book._id}`}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => handleBorrow(book._id)}
              disabled={isBorrowing && actionId === book._id}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
            >
              {isBorrowing && actionId === book._id ? "Borrowing..." : "Borrow"}
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              disabled={isDeleting && actionId === book._id}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
            >
              {isDeleting && actionId === book._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
