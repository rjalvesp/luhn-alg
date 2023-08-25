import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from 'styled-components';
import { Result } from '../types/common';
import { ColumnsType } from 'antd/es/table';

dayjs.extend(relativeTime);

const StyledTable = styled(Table)`
  min-width: 50%;
  min-height: 72vh;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const columns: ColumnsType<Result> = [
  {
    title: 'Timestamp',
    dataIndex: 'time',
    key: 'time',
    render: (time: string) => dayjs(time).fromNow(),
    sorter: (a, b) => (a.time < b.time ? 1 : -1),
  },
  {
    title: 'Credit Card #',
    dataIndex: 'value',
    key: 'value',
    sorter: (a, b) => (a.value < b.value ? 1 : -1),
    filters: [],
    filterSearch: true,
    onFilter: (value, record) => record.value.includes(`${value}`),
  },
  {
    title: 'Result',
    dataIndex: 'valid',
    key: 'valid',
    render: (valid: boolean) => (
      <Center>{valid ? <CheckOutlined /> : <CloseOutlined />}</Center>
    ),
    sorter: (a, b) => (`${a.valid}` < `${b.valid}` ? 1 : -1),
  },
];

interface HistoryTableProps {
  rows: Result[];
}

const HistoryTable = ({ rows }: HistoryTableProps) => (
  <StyledTable columns={columns as any[]} dataSource={rows} bordered />
);

export default HistoryTable;
