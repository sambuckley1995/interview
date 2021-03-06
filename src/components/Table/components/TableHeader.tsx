import React from "react";
import { ColumnDefinitionType } from "../Table";

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

export const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): React.ReactElement => {
  const headers = columns.map((column) => {
    const style = {
      width: column.width ?? 100,
    };
    return (
      <th key={`th-${column.header}`} style={style}>
        {column.header}
      </th>
    );
  });
  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};
