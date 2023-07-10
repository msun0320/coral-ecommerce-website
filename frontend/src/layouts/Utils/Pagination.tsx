export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pageNumbers = [];

  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }

    pageNumbers.push(props.currentPage);

    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
    <nav aria-label="...">
      <ul className="pagination mt-3 d-flex justify-content-center">
        <li className="page-item" onClick={() => props.paginate(1)}>
          <button className="page-link text-black shadow-none rounded-0">
            First Page
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={
              "page-item " + (props.currentPage === number ? "active" : "")
            }
          >
            <button className="page-link text-black shadow-none">
              {number}
            </button>
          </li>
        ))}
        <li
          className="page-item"
          onClick={() => props.paginate(props.totalPages)}
        >
          <button className="page-link text-black shadow-none rounded-0">
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
};
