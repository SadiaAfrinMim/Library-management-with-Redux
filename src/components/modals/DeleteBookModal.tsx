// ✅ DeleteBookModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/api/baseapi";
import type { IBook } from "@/types/book";

const DeleteBookModal = ({ book, refetch }: { book: IBook; refetch: () => void }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    await deleteBook(book._id);
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete <strong>{book.title}</strong>?</p>
        <Button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
