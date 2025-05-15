const Pagination = ({ currPage, setPage, totalPages }) => {
    const handlePrevPage = () => {
      if (currPage > 1) {
        setPage(currPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currPage < totalPages) {
        setPage(currPage + 1);
      }
    };
  
    return (
      <div>
        <nav>
          <ul className="inline-flex -space-x-px  text-sm">
            <li>
              <button
                onClick={handlePrevPage}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
                  currPage === 1
                    ? 'text-gray-300 pointer-events-none'
                    : 'text-gray-500'
                } bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                disabled={currPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((index) => (
              <li key={index}>
                <button
                  onClick={() => setPage(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currPage === index + 1
                      ? 'text-white bg-blue-500'
                      : 'text-gray-500 bg-white'
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currPage === totalPages
                    ? 'text-gray-300 pointer-events-none'
                    : ''
                }`}
                disabled={currPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div className="text-sm mt-2 px-2 font-bold">
          Total Pages: {totalPages}
        </div>
      </div>
    );
  };
  
  export default Pagination;
  