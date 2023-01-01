import React from 'react';
import { Form, Space, Row, Tooltip} from 'antd';
import { Location, Activity, InputNum, AXX, Sector, Refer } from './demo.tsx';
import { QuestionCircleFilled } from '@ant-design/icons';
import Draw from './draw';

const color = '#108ee9';

const Forms: React.FC = () => {

  return (

    <Form
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 15 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        <Row></Row>
        <Form.Item wrapperCol={{ offset:4, span: 16 }}>
          <Draw />
        </Form.Item>

        <Form.Item
          label="Sector"
          name="sector"
        >
          <Space>
            <Sector />
            <Tooltip title="Cover a range of industrial sectors, including agriculture and animal husbandry, building and construction, chemicals and plastics, energy, forestry and wood, metals, textiles, transport, touristic accommodation, waste treatments and recycling, and water supply, among other." color={color} placement="right">
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item
          label="Activity Name"
          name="activity"
          rules={[{ required: true }]}
        >
          <Space>
            <Activity />
            <Tooltip title="Name of the activity. The same activity name may appear in many different geographies and with different reference products. Activities can be ordinary transforming activity, market activity, import activity or market group." color={color} placement="right">
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item
          label="Reference product"
          name="reference_product"
          rules={[{ required: true }]}
        >
          <Space>
            <Refer />
            <Tooltip title="Name of the product produced.  These products comprise materials, goods and services that become available to other human activities, which use them as inputs and then transform them into yet other products, transfer them to another location, or dispose of them." color={color} placement="right">
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item
          label="Geography"
          name="geography"
          rules={[{ required: true }]}
        >
          <Space>
            <Location />
            <Tooltip title="Each activity present in the ecoinvent has a geographic location. Global or Rest-of-the-World can be used in the case a desired location is not present." color={color} placement="right">
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item
          label="Product amount"
          name="product amount"
          rules={[{ required: true }]}
          
        >
          <Space>
            <InputNum />
            <Tooltip title="Amount for which you want to calculate. As you enter the value, the unit of the product will be automatically returned to you in the gray area." color={color} placement="right">
              <QuestionCircleFilled />
            </Tooltip>
          </Space>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

          <AXX />
        </Form.Item>

      </Space>
    </Form>
  );
};

export default Forms;