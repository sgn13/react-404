import Button from "components/Button/Button";
import { useMemo } from "react";
import styled from "theme/styled";

export const PaginationButton = styled(Button)`
  font-family: "Poppins";
  font-weight: 300;
  border-radius: 2px;
  background-color: ${({ disabled }) => (disabled ? "#3f3e3e6c" : "white")};
  text-shadow: none;
  outline: 1px solid gray;
  padding: 2px 10px;
`;

export const DOTS = "...";

export const PaginationContainer = styled.div<{ textColor?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  .page-number {
    border-radius: 2px;
    cursor: pointer;
    background-color: white;
    padding: 5px 10px;
    outline: 1px solid gray;
  }

  .page-number-selected {
    background-color: #cd171f;
    color: white;
    outline-color: #cd171f;
  }
`;

export const PageNumber = styled.div<{ currentPage }>`
  font-weight: ${({ currentPage }) => (currentPage ? "bold" : "normal")};
  cursor: pointer;
`;

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type UsePaginationProps = {
  currentPage: number;
  totalCount: number;
  perPage: number;
  siblingCount?: number;
};

export const usePagination = ({
  totalCount,
  perPage,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / perPage);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, perPage, siblingCount, currentPage]);

  return paginationRange;
};

type PaginationProps = {
  onPageChange: (page: number | string) => void;
} & UsePaginationProps;

const Pagination = (props: PaginationProps) => {
  const { currentPage, perPage, onPageChange, totalCount, siblingCount = 1 } = props;

  const paginationRange =
    usePagination({
      currentPage,
      perPage,
      totalCount,
      siblingCount,
    }) || [];

  // show no pagination if page is 1 or less
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PaginationContainer textColor="white">
      <PaginationButton
        size="sm"
        noTextShadow
        onClick={onPrevious}
        disabled={currentPage === 1}
        backgroundColor="white"
        color={currentPage === 1 ? "white" : "black"}
      >
        Previous
      </PaginationButton>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div>{DOTS}</div>;
        }

        return (
          <div
            className={`page-number ${pageNumber === currentPage ? "page-number-selected" : null}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}

      <PaginationButton
        size="sm"
        noTextShadow
        onClick={onNext}
        disabled={currentPage === lastPage}
        backgroundColor="white"
        color={currentPage === lastPage ? "white" : "black"}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
