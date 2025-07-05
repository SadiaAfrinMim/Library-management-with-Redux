import { useState } from "react";
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

const AllBooks = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery();
  const books = data?.data;

  if (isLoading) return <p className="text-center">Loading books...</p>;
  if (isError || !books) return <p className="text-red-500">Failed to load books</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📚 All Books</h2>
        {/* AddBookModal button */}
        <AddBookModal refetch={refetch} />
      </div>

      <Table>
        <TableHeader>
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
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? "✅" : "❌"}</TableCell>
              <TableCell className="flex gap-2">
                <BookDetailModal bookId={book._id} />
                <EditBookModal book={book} refetch={refetch} />
                <BorrowBookModal book={book} refetch={refetch} />
                <DeleteBookModal book={book} refetch={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllBooks;
