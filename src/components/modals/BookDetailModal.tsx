import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery } from "@/api/baseapi";
import { Eye } from "lucide-react";
import { useState } from "react";

const BookDetailModal = ({ bookId }: { bookId: string }) => {
  const { data } = useGetBookByIdQuery(bookId) as any;
  const book = data?.data;

  const [open, setOpen] = useState(false);

  // Unique ids for accessibility
  const dialogTitleId = `dialog-title-${bookId}`;
  const dialogDescriptionId = `dialog-desc-${bookId}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex bg-sky-500 items-center gap-1"
          aria-haspopup="dialog"
          aria-controls={bookId}
          aria-expanded={open}
        >
          <Eye size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        id={bookId}
      >
        <DialogHeader>
          <DialogTitle className="text-center" id={dialogTitleId}>📘 Book Details</DialogTitle>
        </DialogHeader>

        <div id={dialogDescriptionId} className="space-y-2 text-sm">
          <p><strong>Title:</strong> {book?.title}</p>
          <p><strong>Author:</strong> {book?.author}</p>
          <p><strong>Genre:</strong> {book?.genre}</p>
          <p><strong>ISBN:</strong> {book?.isbn}</p>
          <p><strong>Copies:</strong> {book?.copies}</p>
          <p><strong>Available:</strong> {book?.available ? "Yes" : "No"}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
