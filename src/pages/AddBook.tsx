import { useAddBookMutation } from "@/api/baseapi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
}

const AddBook = () => {
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ ...formData, available: true }).unwrap();
     
      navigate("/books");
    } catch (error) {
      console.error("Add book failed", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-8 py-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
        📘 Add a New Book
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {["title", "author", "genre", "isbn"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block mb-2 text-sm font-semibold text-gray-700 capitalize">
              {field}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              value={formData[field as keyof FormData] as string}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}

        <div>
          <label htmlFor="copies" className="block mb-2 text-sm font-semibold text-gray-700">
            Number of Copies
          </label>
          <input
            id="copies"
            name="copies"
            type="number"
            min={1}
            value={formData.copies}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>

        {isError && (
          <p className="text-center text-red-600 font-semibold mt-2">🚫 Failed to add book. Try again.</p>
        )}
      </form>
    </div>
  );
};

export default AddBook;
