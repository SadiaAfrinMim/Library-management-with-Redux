import { useGetBooksQuery } from "@/api/baseapi";
import type { IBook } from "@/types/book";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BookDetailModal from "@/components/modals/BookDetailModal";
import EditBookModal from "@/components/modals/EditBookModal";
import BorrowBookModal from "@/components/modals/BorrowBookModal";
import DeleteBookModal from "@/components/modals/DeleteBookModal";
import AddBookModal from "@/components/modals/AddBookModal"; // import AddBookModal
import { Loader2 } from "lucide-react";

const AllBooks = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery() as any;
  const books = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading books...</span>
      </div>
    );

  if (isError || !books)
    return <p className="text-red-500 text-center">🚫 Failed to load books</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">📚 All Books</h2>
        {/* AddBookModal button */}
        <AddBookModal refetch={refetch} />
      </div>

      <div className="overflow-x-auto rounded shadow-md">
        <Table>
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book: IBook) => (
              <TableRow key={book._id} className="hover:bg-gray-50">
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <BookDetailModal bookId={book._id} />
                    <EditBookModal book={book} refetch={refetch} />
                    <BorrowBookModal book={book} refetch={refetch} />
                    <DeleteBookModal book={book} refetch={refetch} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllBooks;
