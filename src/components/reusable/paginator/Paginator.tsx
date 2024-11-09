import React, { FC } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "./paginator.css";

const Paginator: FC<{
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}> = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
};

export default Paginator;
