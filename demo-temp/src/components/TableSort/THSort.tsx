"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  name: string;
  setSort?: (sort: string) => void;
  setOrder?: (order: string) => void;
} & PropsWithChildren;

export default function THSort(props: Props) {
  const { name, children, setSort, setOrder } = props;
  const [icon, setIcon] = useState(faSort);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (setOrder) {
    }

    if (setSort) {
      setSort(name);
    }
  };

  useEffect(() => {
    setIcon(faSort);
  }, [name]);

  return (
    <>
      <a
        className="text-decoration-none"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {children}
        <FontAwesomeIcon icon={icon} fixedWidth size="xs" />
      </a>
    </>
  );
}
