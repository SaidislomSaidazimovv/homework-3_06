import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
  },
  {
    title: "Name",
    dataIndex: "productName",
  },
  {
    title: "Price",
    dataIndex: "productPrice",
  },
  {
    title: "Type",
    dataIndex: "productType",
  },
  {
    title: "Date",
    dataIndex: "productDate",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableCustom = ({ products, isLoading }) => {
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={products}
      onChange={onChange}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};
export default TableCustom;
