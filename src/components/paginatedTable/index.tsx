import React, { useState } from "react";

interface PaginatedTableProps<T> {
  tableHeadData: string[]; // Column headers
  tableData: T[]; // Data for the table
  renderRow: (row: T, rowIndex: number) => React.ReactNode;
  title: string;
  perPage?: number; // Number of rows per page
}

const PaginatedTable = <T extends object>({
  tableHeadData,
  tableData,
  renderRow,
  title,
  perPage = 10,
}: PaginatedTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / perPage);

  // Paginate data
  const paginatedData = tableData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Handle pagination navigation
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          {/* Render table header */}
          <thead>
            <tr>
              {tableHeadData.map((head, index) => (
                <th
                  key={index}
                  className="p-4 border-b border-slate-200 bg-regularAccent/20"
                >
                  <p className="text-sm font-semibold leading-none text-slate-700">
                    {head}
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              paginatedData.map((row, rowIndex) => renderRow(row, rowIndex))
            ) : (
              <tr>
                <td
                  className="text-center text-sm p-2 font-semibold"
                  colSpan={tableHeadData.length}
                >{`No ${title} list found`}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        {tableData.length > 0 && (
          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
              Showing <b>{(currentPage - 1) * perPage + 1}</b> to{" "}
              <b>{Math.min(currentPage * perPage, tableData.length)}</b> of{" "}
              <b>{tableData.length}</b>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-regularAccent transition duration-200 ease ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
                    currentPage === index + 1
                      ? "text-white bg-regularAccent border-regularAccent"
                      : "text-slate-500 bg-white border border-slate-200"
                  } rounded hover:border-regularAccent transition duration-200 ease`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-regularAccent transition duration-200 ease ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginatedTable;
