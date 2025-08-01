// ✅ BorrowBookModal.tsx (Updated with Form)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBorrowBookMutation } from "@/api/baseapi";
import type { IBook } from "@/types/book";
import { useState } from "react";
import { Hand } from "lucide-react";


const BorrowBookModal = ({ book, refetch }: { book: IBook; refetch: () => void }) => {
  const [borrowBook, { isLoading }] = useBorrowBookMutation() ;
  const [formData, setFormData] = useState<any>({
    book:  book._id,
    quantity: 1,
    dueDate: new Date().toISOString().split("T")[0],
  }) ;

  const handleBorrow = async () => {
    await borrowBook(formData);
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
  
  className="flex items-center gap-1 bg-slate-500 hover:bg-indigo-500 text-white px-3 py-1 rounded-md"
>
  <Hand size={16} />
  Borrow
</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <Button onClick={handleBorrow} disabled={isLoading}>
            {isLoading ? "Borrowing..." : `Borrow ${book.title}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
