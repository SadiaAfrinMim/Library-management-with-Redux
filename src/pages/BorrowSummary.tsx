import { useGetBorrowSummaryQuery } from "@/api/baseapi";
import { Loader2 } from "lucide-react";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery() as any;

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-700">Loading summary...</span>
      </div>
    );

  if (isError)
    return (
      <p className="text-red-500 text-center font-semibold mt-6">
        🚫 Error fetching borrow summary!
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📊 Borrow Summary
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-50 text-blue-800 text-left uppercase text-xs font-bold">
            <tr>
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">ISBN</th>
              <th className="px-4 py-3 border-b text-center">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="px-4 py-2">{item?.book?.title}</td>
                <td className="px-4 py-2">{item?.book?.isbn}</td>
                <td className="px-4 py-2 text-center font-semibold">
                  {item?.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
