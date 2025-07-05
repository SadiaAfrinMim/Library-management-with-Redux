
""// ✅ AllBooks.tsx (Shadcn + RTK Query + Fixed Borrow & Update + Separate Modals)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery } from "@/api/baseapi";


const BookDetailModal = ({ bookId }: { bookId: string }) => {
  const { data } = useGetBookByIdQuery(bookId) as any;
const book = data?.data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>📘 Book Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
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