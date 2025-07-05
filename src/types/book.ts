export interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}


export interface IBorrow {

  book: string; // MongoDB ObjectId represented as string
  quantity: number;
  dueDate: string; // ISO date string (e.g., "2025-07-05T00:00:00.000Z")
}
   
