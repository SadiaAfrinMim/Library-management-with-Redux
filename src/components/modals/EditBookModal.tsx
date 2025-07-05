import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useUpdateBookMutation } from "@/api/baseapi";
import type { IBook } from "@/types/book";
import { Pencil } from "lucide-react";

const EditBookModal = ({ book, refetch }: { book: IBook; refetch: () => void }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    isbn: book.isbn,
    copies: book.copies,
    available: book.available,
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleUpdate = async () => {
    await updateBook({ id: book._id, data: formData });
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
         <Button variant="secondary" className="flex bg-yellow-400 items-center gap-1">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book Info</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <Input
            placeholder="Genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          />
          <Input
            placeholder="ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Copies"
            value={formData.copies}
            onChange={(e) => setFormData({ ...formData, copies: Number(e.target.value) })}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.available}
              onCheckedChange={(value) =>
                setFormData({ ...formData, available: value as boolean })
              }
            />
            <label>Available</label>
          </div>
          <Button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;