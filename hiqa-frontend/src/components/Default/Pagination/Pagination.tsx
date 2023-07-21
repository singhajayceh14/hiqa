import { getPaginationItems } from './lib/Pagination';
import PageLink from './PageLink';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({ currentPage, lastPage, maxLength, setCurrentPage }: Props) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <div className="pagination-wrap mt-20 text-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <PageLink disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <i className="fas fa-angle-double-left" />
            </PageLink>
          </li>
          {pageNums.map((pageNum, idx) => (
            <PageLink
              key={idx}
              active={currentPage === pageNum}
              disabled={isNaN(pageNum)}
              onClick={() => setCurrentPage(pageNum)}
            >
              {!isNaN(pageNum) ? pageNum : '...'}
            </PageLink>
          ))}
          <li className="page-item">
            <PageLink disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)}>
              <i className="fas fa-angle-double-right" />
            </PageLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
