import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAddBookMutation } from '@/api/baseapi';

interface FormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
}

const AddBookModal = ({ refetch }: { refetch: () => void }) => {
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [open, setOpen] = useState(false);

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
      setFormData({ title: "", author: "", genre: "", isbn: "", copies: 1 });
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Add book failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">➕ Add Book</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {["title", "author", "genre", "isbn"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-1 text-sm font-semibold text-gray-700 capitalize"
              >
                {field}
              </label>
              <Input
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field as keyof FormData] as string}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="copies"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Number of Copies
            </label>
            <Input
              id="copies"
              name="copies"
              type="number"
              min={1}
              placeholder="Copies"
              value={formData.copies}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full"
          >
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
          {isError && (
            <p className="text-red-600 font-medium mt-2 text-center">
              Failed to add book. Try again.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
