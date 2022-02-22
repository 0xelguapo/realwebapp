import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import styles from "./GlobalFilter.module.css";
import Image from "next/image";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className={styles.inputSpan}>
      <div className={styles.searchImage}>
        <Image src="/search.svg" width={20} height={20} alt="search" />
      </div>
      <input
        className={styles.input}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

export default GlobalFilter;
