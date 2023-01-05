import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import qs from 'qs';

interface DataType {
  activity: string;
  amount: number;
  IPCC: number;
  ReCiPe: number;
  level: string;
  index: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Activity Name',
    dataIndex: 'activity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'IPCC(kg CO2-Eq)',
    dataIndex: 'IPCC',
  },
  {
    title: 'ReCiPe Midpoint(kg CO2-Eq)',
    dataIndex: 'ReCiPe',
  },
  {
    title: 'Level',
    dataIndex: 'level',
  }
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current
});

const LCATable: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/lca_table/?${qs.stringify(getRandomuserParams(tableParams))}`)
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

export default LCATable;