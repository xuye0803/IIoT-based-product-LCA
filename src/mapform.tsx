import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button, message, Space, Input, Tooltip } from 'antd';
import axios from 'axios';
import { FieldNumberOutlined, NumberOutlined, DatabaseOutlined, InfoCircleOutlined, ContainerOutlined } from '@ant-design/icons';
const { Search } = Input;

let childnumber: string;
let fatername: string;
let faternum: number;
let childname: string;
let level: string;

const Fathername: React.FC = () => {
  const [text, setDisplayText] = useState('');

  const onSearch = (value: string) => {
    console.log(value);
    fatername = encodeURIComponent(value)
    setDisplayText("Enter successfully! √")
  }

  return (<><Space>
    <Search
      placeholder="Enter your custom name"
      onSearch={onSearch}
      allowClear
      enterButton="Confirm"
      style={{ width: 500 }}
      prefix={<ContainerOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Enter the name of the parent activity, which consists of several child activities.">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />{text}
  </Space>
  </>)
}

const Fathernum: React.FC = () => {
  const onChange = (value: number) => {
    console.log(value);
    faternum = value;
  };

  return (<InputNumber defaultValue={1} allowClear onChange={onChange}
    style={{ width: 150 }} prefix={<NumberOutlined className="site-form-item-icon" />}
    suffix={
      <Tooltip title="Enter the number of the parent activity, which is the number of times the activity conducted.">
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>} />)
}

const Childrenlist = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://127.0.0.1:8000/children_list/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    childname = encodeURIComponent(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Select
      mode="multiple"
      allowClear
      showSearch
      placeholder="Please select child activities"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      onMouseEnter={asyncFetch}
      style={{ width: 600 }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={(data || []).map((d) => ({
        value: d,
        label: d,
      }))}
    />)
};

const Childnum: React.FC = () => {
  const [text, setDisplayText] = useState('');

  const onSearch = (value: string) => {
    console.log(value);
    childnumber = encodeURIComponent(value)
    setDisplayText("Enter successfully! √")
  }

  return (<><Space>
    <Search
      placeholder='Please use "," to separate the number.'
      onSearch={onSearch}
      allowClear
      enterButton="Confirm"
      style={{ width: 500 }}
      prefix={<FieldNumberOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Please enter the order of magnitude of the sub-activity you selected in order. Please use a comma to separate the magnitude of the different sub-level activities. Note that the sub-activity already has a number. The final total number of products is the number you enter multiplied by the original number of the sub-activity.">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />{text}
  </Space>
  </>)
}

function Adb() {

  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    axios.get(`http://127.0.0.1:8000/append_map/?name=${fatername}&num=${faternum}&children=${childname}&childnum=${childnumber}&level=${level}`)
      .then(function (response) {
        window.location.href = 'http://localhost:3000/';
        messageApi.open({
          type: 'success',
          content: 'Insert successfully!',
        });
      })
      .catch(function (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });

  };

  return (
    <>
      {contextHolder}
      <Button type="primary"
        shape="round"
        onClick={handleClick}>
        <DatabaseOutlined />
        Create parent activity
      </Button>
    </>
  );

}

const Change = (value: string) => {
  console.log(`selected ${value}`);
  level = value;
};

const Searchs = (value: string) => {
  console.log('search:', value);
};

const Levels: React.FC = () => (
  <><Space>
    <Select
      showSearch
      placeholder="Select the level in LCA"
      optionFilterProp="children"
      onChange={Change}
      onSearch={Searchs}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: 'High',
          label: 'High',
        },
        {
          value: 'Low',
          label: 'Low',
        },
      ]}
      style={{ width: 200 }}
    />
    <Tooltip title='Select the level of the parent activity in the life cycle analysis. Here we only support the three-level LCA. If the parent activity is in the middle layer (the second layer), select "Low". If it is on the topmost level, the first level, select "High".'>
      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
    </Tooltip></Space>
  </>

);


export { Fathername, Fathernum, Childrenlist, Childnum, Adb, Levels };