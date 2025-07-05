import type { IBook, IBorrow } from "@/types/book";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://librarymanagementapplication.vercel.app/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    // ✅ Get all books
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // ✅ Get a single book by ID
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
    }),

    // ✅ Add new book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),


   


    // ✅ Update existing book
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // ✅ Delete a book
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // ✅ Borrow a book
    borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),

    // ✅ Borrow summary (aggregated data)
   getBorrowSummary: builder.query<IBorrow[], void>({
  query: () => "/borrow",
  providesTags: ["Borrows"],
}),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
 
} = bookApi;
