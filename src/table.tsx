import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import qs from 'qs';

interface DataType {
  activity: string;
  product: string;
  geography: string;
  amount: number;
  unit: string;
  IPCC: number;
  ReCiPe: string;
  index:number
}

interface TableParams {
  pagination?: TablePaginationConfig;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Activity Name',
    dataIndex: 'activity',
    width: '25%',
  },
  {
    title: 'Reference product',
    dataIndex: 'product',
    width: '25%',
  },
  {
    title: 'Geography',
    dataIndex: 'geography',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
  },
  {
    title: 'IPCC',
    dataIndex: 'IPCC',
  },
  {
    title: 'ReCiPe Midpoint',
    dataIndex: 'ReCiPe',
  }
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current
});

const Tables: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/table/?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 30,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
  ) => {
    setTableParams({
      pagination,
    });
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.index}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default Tables;