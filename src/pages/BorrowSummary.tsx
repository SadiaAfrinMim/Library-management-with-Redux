import { useGetBorrowSummaryQuery } from "@/api/baseapi";
import type { IBorrow } from "@/types/book";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();
  console.log(data)
 
 

  if (isLoading) return <p className="text-center">Loading summary...</p>;
  if (isError) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-5">
      <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item:IBorrow) => (
            <tr key={item.book?.isbn} className="text-center">
              <td className="p-2 border">{item?.book?.title}</td>
              <td className="p-2 border">{item?.book?.isbn}</td>
              <td className="p-2 border">{item?.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;