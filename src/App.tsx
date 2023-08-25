import { Button, Form, Input, Space, message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { checkUsingLuhnAlg } from './helpers/luhn';
import { Result } from './types/common';
import HistoryTable from './components/table.component';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [messageApi] = message.useMessage();
  const [rows, setRows] = React.useState<Result[]>([]);
  const [form] = Form.useForm();

  const onFinish = ({ value }: { value: string }) => {
    const newRow = {
      value,
      time: dayjs().format(),
      valid: checkUsingLuhnAlg(value),
    };
    messageApi.open({
      type: newRow.valid ? 'success' : 'error',
      content: `${value} is not a valid Credit Card.`,
    });
    console.log(newRow);
    setRows([newRow, ...rows]);
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="value"
          rules={[
            { pattern: /\d{16}/g, message: 'Field should have 16 number.' },
          ]}
          shouldUpdate
        >
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="Credit card number" />
            <Form.Item style={{ margin: 0 }} shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Check
                </Button>
              )}
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
      <HistoryTable rows={rows} />
    </Container>
  );
};

export default App;
