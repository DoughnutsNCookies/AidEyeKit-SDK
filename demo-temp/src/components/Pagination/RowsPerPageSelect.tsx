"use client";

import { FormSelect } from "react-bootstrap";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  perPage: number;
  setPerPage?: (perPage: number) => void;
};

export default function RowPerPageSelect(props: Props) {
  const { perPage, setPerPage } = props;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <FormSelect
        defaultValue={perPage}
        className="d-inline-block w-auto"
        aria-label="Item per page"
        onChange={(event) => {
          if (setPerPage) {
            setPerPage(parseInt(event.target.value, 10));
          }
        }}
      >
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
      </FormSelect>
    </>
  );
}
